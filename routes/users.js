const express = require('express');
const { format } = require('express/lib/response');
const { updateMany } = require('../models/User');
const router = express.Router();

const User = require('../models/User');

// GET users
router.get('/', async (req, res) => {
    const users = await User.find();
    try {
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send('Server Error');
    }
});

// Create a user
router.post('/', async (req, res) => {
    const { email, firstName, lastName } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).send('User already exists');
        user = new User({
            firstName,
            lastName,
            email,
        });
        await user.save();
        return res.status(201).send('Succesfully Created');
    } catch (e) {
        res.status(500).send(e.message);
    }
});
//GET specific user
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let user = await User.findById(id);
        res.status(200).send(user);
    } catch (e) {
        res.status(404).send('User not found');
    }
});
//DELETE specific user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let user = await User.findByIdAndDelete(id);
        res.status(200).send('User Deleted');
    } catch (e) {
        res.status(404).send('User not found');
    }
});
//UPDATE user
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['firstName', 'lastName', 'credit', 'cash'];
    const isValid = updates.every((update) => allowedUpdates.includes(update));
    if (!isValid) return res.status(400).send('Cannot update specified fields');

    try {
        let user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send('User not found');
    }
});

//Transfer money
router.patch('/transfer', async (req, res) => {
    const { from, to, amount } = req.body;
    let fromUser = User.findById(from);
    let toUser = User.findById(to);
    if (fromUser.cash >= amount) {
        fromUser.cash = fromUser.cash - amount;
        toUser.cash = toUser.cash + amount;
        await fromUser.save();
        await toUser.save();
    }
});
module.exports = router;
