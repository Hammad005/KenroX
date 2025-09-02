import express from 'express';
import { googleAuth, loginHandler, logoutHandler, signupHandler, updateUserHandler } from '../controllers/authControllers.js';
import { protectRoute } from '../middleware/protectRoute.js';

const authRoutes = express.Router();

authRoutes.post('/google', googleAuth)
authRoutes.post('/signup', signupHandler);
authRoutes.post('/login', loginHandler);
authRoutes.post('/logout', logoutHandler);

authRoutes.put('/update', protectRoute, updateUserHandler);

authRoutes.get('/me', protectRoute, (req, res) => res.status(200).json(req.user));
export default authRoutes;