const mongoose = require('mongoose');
const validator = require('validator');

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
    password: {
        type: String,
        required: true,
        validate(value) {
            if (validator.isLength(value, { min: 6, max: 12 })) {
                throw Error('Password must be between 6-12 characters');
            }
        },
    },
    created: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = User = mongoose.model('user', UserSchema);
