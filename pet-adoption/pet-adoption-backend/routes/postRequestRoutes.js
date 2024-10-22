const express = require('express');
const router = express.Router();
const postRequestController = require('../controllers/postRequestController');

// Route to handle POST requests for creating adoption requests
router.post('/', postRequestController.createAdoptionRequest);

module.exports = router;
