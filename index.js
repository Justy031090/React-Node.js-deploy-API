const express = require('express');
const connectDB = require('./db/mongoose');
const users = require('./routes/users');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

//connecting to atlas
connectDB();

app.get('/', (req, res) => {
    res.send('API RUNNING');
});

app.use('/api/users', users);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
