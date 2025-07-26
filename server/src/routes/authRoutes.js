import express from 'express';
import { signupHandler } from '../controllers/authControllers.js';

const authRoutes = express.Router();

authRoutes.post('/signup', signupHandler);

export default authRoutes;