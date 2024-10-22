const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.get('/user', getUserById);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
