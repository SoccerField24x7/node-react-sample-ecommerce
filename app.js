const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// app
const app = express();

dotenv.config();

// database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Database connected!');
});

app.get('/', (req, res) => {
    res.send('Hello from Node.');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
