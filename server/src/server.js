import express from 'express';
import connectDB from './database/mongoDB.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import planRoutes from './routes/planRoutes.js';
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json({
    limit: '50mb'
}));
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());
app.use('/api/auth', authRoutes)
app.use('/api/plan', planRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
connectDB();