const User = require('../models/User');

const getUsers = async (req, res) => {
    const users = await User.find();
    try {
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send('Server Error');
    }
};

const createUser = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).send('User already exists');
        user = new User({
            firstName,
            lastName,
            email,
            password,
        });
        await user.save();
        return res.status(201).send('Succesfully Created');
    } catch (e) {
        res.status(500).send(e.message);
    }
};

const cashTransfer = async (req, res) => {
    const { from, to, amount } = req.body;
    try {
        let fromUser = await User.findById(from);
        let toUser = await User.findById(to);
        if (!fromUser) return res.status(404).send("Enter a valid Giver's ID");
        if (!toUser) return res.status(404).send("Enter a valid Gainer's ID");
        if (fromUser.cash <= amount)
            return res
                .status(400)
                .send("You can't transfer more than you got..");

        giverCash = fromUser.cash - Number(amount);
        gainerCash = toUser.cash + Number(amount);
        await fromUser.update({ cash: giverCash });
        await toUser.update({ cash: gainerCash });
        res.status(200).send('Succesfully transfered');
    } catch (e) {
        res.status(400).send("Check you entered a valid ID's");
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        let user = await User.findById(id);
        res.status(200).send(user);
    } catch (e) {
        res.status(404).send('User not found');
    }
};
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        let user = await User.findByIdAndDelete(id);
        res.status(200).send('User Deleted');
    } catch (e) {
        res.status(404).send('User not found');
    }
};
const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        'firstName',
        'lastName',
        'credit',
        'cash',
        'password',
    ];
    const isValid = updates.every((update) => allowedUpdates.includes(update));
    if (!isValid) return res.status(400).send('Cannot update specified fields');

    try {
        let user = await User.findById(id);
        updates.forEach((update) => (user[update] = req.body[update]));
        await user.save();
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send('User not found');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        res.send(user);
    } catch (e) {
        res.status(400).send();
    }
};

module.exports = {
    getUsers,
    createUser,
    cashTransfer,
    getUser,
    deleteUser,
    updateUser,
    login,
};
