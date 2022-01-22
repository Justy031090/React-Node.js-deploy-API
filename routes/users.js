const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUser,
    createUser,
    cashTransfer,
    deleteUser,
    updateUser,
} = require('../controllers/userControl');

router.get('/', getUsers);
router.post('/', createUser);
router.patch('/transfer', cashTransfer);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

module.exports = router;
