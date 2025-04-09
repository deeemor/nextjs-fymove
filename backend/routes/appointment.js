const express = require('express');
const router = express.Router();
const { sendAppointmentEmail } = require('../controllers/appointment.controller');

// POST /api/appointment
router.post('/', sendAppointmentEmail);

module.exports = router;