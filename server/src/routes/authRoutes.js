import express from 'express';
import { loginHandler, logoutHandler, sendToken, signupHandler, updateUserHandler } from '../controllers/authControllers.js';
import passport from 'passport';
import { protectRoute } from '../middleware/protectRoute.js';

const authRoutes = express.Router();

authRoutes.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account consent',
  })
);

authRoutes.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: process.env.CLIENT_URL }),
  (req, res) => {
    // Send JWT token after successful login
    sendToken(req.user, res);
  }
);

authRoutes.post('/signup', signupHandler);
authRoutes.post('/login', loginHandler);
authRoutes.post('/logout', logoutHandler);

authRoutes.put('/update', protectRoute, updateUserHandler);

authRoutes.get('/me', protectRoute, (req, res) => res.status(200).json(req.user));
export default authRoutes;