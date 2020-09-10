import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { router } from './routes/user';

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

app.use('/api', router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
