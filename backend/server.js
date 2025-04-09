const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Allow requests from the frontend
  credentials: true, // Allow cookies and credentials
}));
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies

// Routes
app.use('/api/auth', require('./routes/auth')); // Mount auth routes
app.use('/api/contact', require('./routes/contact')); // Mount contact routes
app.use('/api/appointment', require('./routes/appointment'));
app.use('/api/sub', require('./routes/sub'));



// Error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});