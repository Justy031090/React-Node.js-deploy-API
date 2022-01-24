const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUser,
    createUser,
    cashTransfer,
    deleteUser,
    updateUser,
    login,
} = require('../controllers/userControl');
const User = require('../models/User');

router.get('/', getUsers);
router.post('/login', login);
router.post('/', createUser);
router.patch('/transfer', cashTransfer);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

module.exports = router;
