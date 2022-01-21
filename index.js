const express = require('express');
const connectDB = require('./db/mongoose');
const users = require('./routes/users');
const path = require('path');

const app = express();
app.use(express.json());

//connecting to atlas
connectDB();
app.use('/api/users', users);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
