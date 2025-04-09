const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');

// Email transporter configuration
const createTransporter = () => {
  // Validate email configuration
  if (!process.env.EMAIL_SERVICE || !process.env.EMAIL || !process.env.EMAIL_PASS) {
    throw new Error('Email configuration is missing');
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendAppointmentEmail = asyncHandler(async (req, res) => {
  const { 
    name, 
    email, 
    phone, 
    datetime, 
    department, 
    doctor, 
    message, 
    symptoms = [], 
    preferredTime 
  } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !datetime || !department || !doctor) {
    return res.status(400).json({
      success: false,
      message: 'Please fill all required fields'
    });
  }

  try {
    const transporter = createTransporter();

    // Format the appointment date
    const appointmentDate = new Date(datetime).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Create email content for admin
    const adminMailOptions = {
      from: process.env.EMAIL,
      to:  process.env.EMAIL, // Fallback to sender email if admin email not set
      subject: `New Appointment Request - ${department}`,
      html: `
        <h2 style="color: #2563eb;">New Appointment Request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Patient Name</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Appointment Date</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${appointmentDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Department</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${department}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Doctor</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${doctor}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Symptoms</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${symptoms.join(', ') || 'None specified'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Preferred Time</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${preferredTime}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Additional Message</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${message || 'None'}</td>
          </tr>
        </table>
      `
    };

    // Create email content for patient
    const patientMailOptions = {
      from: `"Medical Appointments" <${process.env.EMAIL}>`,
      to: email,
      subject: 'Your Appointment Request Confirmation',
      html: `
        <h2 style="color: #2563eb;">Appointment Request Confirmation</h2>
        <p>Dear ${name},</p>
        <p>Thank you for requesting an appointment. Here are your appointment details:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Department</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${department}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Doctor</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${doctor}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Date & Time</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${appointmentDate}</td>
          </tr>
        </table>
        <p>Our team will review your request and contact you shortly to confirm your appointment.</p>
        <p>If you need to make any changes or have questions, please contact us.</p>
        <p style="color: #6b7280; font-size: 0.9em; margin-top: 20px;">
          This is an automated message, please do not reply to this email.
        </p>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(patientMailOptions)
    ]);

    res.status(200).json({
      success: true,
      message: 'Appointment request submitted successfully'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process appointment request. Please try again later.'
    });
  }
});

module.exports = { sendAppointmentEmail };