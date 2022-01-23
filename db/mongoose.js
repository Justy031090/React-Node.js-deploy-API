const mongoose = require('mongoose');
const config = require('config');
const mongoURI = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to Atlas');
    } catch (e) {
        console.error(e.message);
        process.exit();
    }
};
module.exports = connectDB;
