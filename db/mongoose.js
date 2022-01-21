const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('Connected to Atlas');
    } catch (e) {
        console.error(e.message);
        process.exit();
    }
};
module.exports = connectDB;
