const express = require('express');
const router = express.Router();
const { createRequest } = require('../controllers/postRequestController'); // Ensure the correct path and import

// Define the route to handle POST requests
router.post('/', createRequest); // This is where the error is pointing to

module.exports = router;
