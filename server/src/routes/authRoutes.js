import express from 'express';
import { sendToken, signupHandler } from '../controllers/authControllers.js';
import passport from 'passport';

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

export default authRoutes;