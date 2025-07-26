import express from 'express';
import connectDB from './database/mongoDB.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(cookieParser());

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});