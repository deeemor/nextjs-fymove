// controllers/sub.controller.js
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendSubEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    res.status(400);
    throw new Error('Email is required');
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Welcome to Our Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center;">Welcome to Our Newsletter!</h2>
          <p style="color: #666;">Dear Subscriber,</p>
          <p style="color: #666;">Thank you for subscribing to our newsletter. We're excited to have you join our community!</p>
          <p style="color: #666;">You'll receive regular updates about:</p>
          <ul style="color: #666;">
            <li>Latest news and updates</li>
            <li>Special offers and promotions</li>
            <li>Industry insights and tips</li>
          </ul>
          <p style="color: #666;">Best regards,<br>Your Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter' 
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500);
    throw new Error('Failed to send subscription confirmation');
  }
});

module.exports = { sendSubEmail };
