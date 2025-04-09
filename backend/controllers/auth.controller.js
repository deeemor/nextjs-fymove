const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');


// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Generate password reset token
const generateResetToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '10m',
  });
};

// Send welcome email
const sendWelcomeEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const roleSpecificMessage = user.role === 'doctor' 
    ? 'Thank you for joining our medical platform. You can now manage your patients and appointments efficiently.'
    : 'Thank you for choosing our healthcare platform. You can now easily schedule appointments with our qualified doctors.';

  const mailOptions = {
    from: `"Your App Name" <${process.env.EMAIL}>`,
    to: user.email,
    subject: `Welcome to Our Healthcare Platform, ${user.name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Our Healthcare Platform!</h2>
        <p>Dear ${user.name},</p>
        <p>${roleSpecificMessage}</p>
        <p>Here's what you can do next:</p>
        <ul>
          ${user.role === 'doctor' ? `
            <li>Complete your professional profile</li>
            <li>Set your availability schedule</li>
            <li>Start accepting patient appointments</li>
          ` : `
            <li>Complete your health profile</li>
            <li>Browse available doctors</li>
            <li>Schedule your first appointment</li>
          `}
        </ul>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Best regards,<br>Your Healthcare Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // Don't throw error here - we don't want to block signup if email fails
  }
};

// Signup function
const signup = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if all fields are provided
  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Validate role
  if (!['patient', 'doctor'].includes(role)) {
    res.status(400);
    throw new Error('Invalid role specified');
  }

  // Check if the name already exists
  const nameExists = await User.findOne({ name });
  if (nameExists) {
    res.status(400);
    throw new Error('Name already exists');
  }

  // Check if the email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create the user
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  // Send welcome email
  if (user) {
    // Send welcome email asynchronously
    sendWelcomeEmail(user);

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      message: 'Welcome! Account created successfully',
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user with password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 3. Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 4. Return response
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      message: "Login successful"
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Forgot Password - Send reset email
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if the email exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  // Generate a reset token
  const resetToken = generateResetToken(user.email);

  // Create the reset link
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  // Send the reset email
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Your App Name" <${process.env.EMAIL}>`,
    to: user.email,
    subject: 'Password Reset Request',
    html: `
      <h2>Password Reset</h2>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link will expire in 10 minutes.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send reset email' });
    } else {
      console.log('Reset email sent:', info.response);
      res.status(200).json({ message: 'Reset email sent successfully' });
    }
  });
});

// Reset Password - Update user's password
const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Update the password
    user.password = password;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(400);
    throw new Error('Invalid or expired token');
  }
});

// get patients for doctors
const getAllPatients = async (req, res) => {
  try {
    // ✅ Step 1: Ensure Authorization Header Exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized. Token missing." });
    }

    // ✅ Step 2: Extract and Verify Token
    const token = authHeader.split(" ")[1]; // Extract token after 'Bearer '
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret key

    // ✅ Step 3: Find the User and Check If They Are a Doctor
    const doctor = await User.findById(decoded.id);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(403).json({ error: "Access denied. Only doctors can view patients." });
    }

    // ✅ Step 4: Fetch Patients (Only for Doctors)
    const patients = await User.find({ role: "patient" });
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Error fetching patients" });
  }
};

const addPatient = async (req, res) => {
  try {
    // 1. Authorization
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    // 2. Verify doctor
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const doctor = await User.findById(decoded.id);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(403).json({ error: "Only doctors can add patients" });
    }

    // 3. Validate input
    const { name, email, password } = req.body;
    if (!name || !email || !password) { // Require password
      return res.status(400).json({ error: "Name, email and password are required" });
    }

    // 4. Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // 5. Hash password properly
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6. Create patient with all required fields
    const newPatient = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "patient",
      doctor: decoded.id,
      isEmailVerified: false, // Explicitly set
      status: "Active", // Add status field
      progress: 0 // Default progress
    });

    // 7. Return response (without password)
    const { password: _, ...patientData } = newPatient.toObject();
    res.status(201).json({
      message: "Patient created successfully",
      patient: patientData
    });

  } catch (error) {
    console.error("Error in addPatient:", error);
    
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    
    res.status(500).json({ error: "Server error" });
  }
};




const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json(user);
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update fields
  const {
    name,
    email,
    phone,
    specialization,
    experience,
    address,
    hospital,
    education
  } = req.body;

  // Check if email is being changed and is already taken
  if (email && email !== user.email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      res.status(400);
      throw new Error('Email already exists');
    }
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.phone = phone || user.phone;
  user.specialization = specialization || user.specialization;
  user.experience = experience || user.experience;
  user.address = address || user.address;
  user.hospital = hospital || user.hospital;
  user.education = education || user.education;

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    specialization: updatedUser.specialization,
    experience: updatedUser.experience,
    address: updatedUser.address,
    hospital: updatedUser.hospital,
    education: updatedUser.education,
    role: updatedUser.role
  });
});







module.exports = { signup, login, forgotPassword, resetPassword, getAllPatients,addPatient , getProfile ,updateProfile };