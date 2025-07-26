import express from 'express';
import connectDB from './database/mongoDB.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});