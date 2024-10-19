const express = require('express');
const { getAllUsers } = require('../controllers/authController');
const router = express.Router();

router.get('/admin/users', getAllUsers);

module.exports = router;
