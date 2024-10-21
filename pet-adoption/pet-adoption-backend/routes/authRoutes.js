const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, registerUser } = require('../controllers/authController');
const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/register', registerUser);

module.exports = router;
