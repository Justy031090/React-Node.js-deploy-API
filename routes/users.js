const express = require('express');
const router = express.Router();

const User = require('../models/User');

// GET api/users
router.get('/', (req, res) => {
    res.status(200).send('Users route');
});
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
        res.status(201).send('Succesfully Registered');
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
