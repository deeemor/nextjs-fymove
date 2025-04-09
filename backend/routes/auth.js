const express = require('express');
const router = express.Router();
const { 
  signup, 
  login, 
  forgotPassword, 
  resetPassword, 
  getAllPatients,
  addPatient,
  getProfile,
  updateProfile
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/authMiddleware'); // Updated path

// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get("/patients", getAllPatients);
router.post("/patients", addPatient); 

// Profile routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;