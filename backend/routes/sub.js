// routes/sub.js
const express = require('express');
const router = express.Router();
const { sendSubEmail } = require('../controllers/sub.controller');

router.post('/', sendSubEmail);

module.exports = router;
