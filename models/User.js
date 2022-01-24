const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error('Please enter a valid Email address');
            }
        },
    },
    credit: {
        type: Number,
        default: 0,
    },
    cash: {
        type: Number,
        default: 0,
    },
    created: {
        type: Date,
        default: Date.now(),
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
    },
});

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user) throw Error('Unable to log in');
    if (!isMatch) throw Error('Unable to log in');
    return user;
};

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

module.exports = User = mongoose.model('user', UserSchema);
