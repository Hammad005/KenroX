// config/passport.js
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOneAndUpdate(
          { googleId: profile.id },
          {
            googleId: profile.id,
            fullname: profile.displayName,
            email: profile.emails[0].value,
            profile: {
              imageId: null,
              imageUrl: profile.photos[0].value,
            },
          },
          { new: true, upsert: true }
        );

        if (existingUser) return done(null, existingUser);

        const newUser = await User.create({
          googleId: profile.id,
          fullname: profile.displayName,
          email: profile.emails[0].value,
          profile: {
            imageId: null,
            imageUrl: profile.photos[0].value,
          },
        });

        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);