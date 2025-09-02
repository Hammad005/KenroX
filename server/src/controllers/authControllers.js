import cloudinary from "../lib/cloudinary.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_CALLBACK_URL);
export const googleAuth = async (req, res) => {
  const { code } = req.body;
  const { tokens } = await client.getToken(code);
  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload(); // contains Google profile
  const { sub: googleId, name, email, picture } = payload;

  // 3. Check if user exists
  let user = await User.findOne({ googleId });

  if (user) {
    // Case 1: Profile pic is updated manually → don’t overwrite
    if (user.profile?.updated) {
      user.email = email;
    } else {
      // Case 2: Profile not updated, update everything including image
      user.email = email;
      user.profile = {
        imageId: null,
        imageUrl: picture,
        updated: false,
      };
    }

    await user.save();
  } else {
    // Case 3: No user exists → create new
    user = await User.create({
      googleId: googleId,
      fullname: name,
      email: email,
      profile: {
        imageId: null,
        imageUrl: picture,
        updated: false,
      },
    });
  };

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
  const userWithoutPasswrd = { ...user._doc };
  delete userWithoutPasswrd.password;

  return res
    .cookie("kenroXToken", token, {
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      secure: process.env.NODE_ENV === "production",
    })
    .status(201)
    .json({ user: userWithoutPasswrd });
};
export const signupHandler = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create new user
    const newUser = await User.create({
      fullname,
      email,
      password,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    const userWithoutPasswrd = { ...newUser._doc };
    delete userWithoutPasswrd.password;

    return res
      .cookie("kenroXToken", token, {
        maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .status(201)
      .json({ message: "User created successfully", user: userWithoutPasswrd });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    if (!user.googleId) {
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
    } else {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    return res
      .cookie("kenroXToken", token, {
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Login successful", user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const logoutHandler = (req, res) => {
  res
    .clearCookie("kenroXToken", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logout successful" });
};

export const updateUserHandler = async (req, res) => {
  const { fullname, profile } = req.body;

  try {

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let updatedUser;

    // If profile image is provided, update it in Cloudinary
    if (profile) {
      if (user?.profile?.imageId) {
        await cloudinary.uploader.destroy(user.profile.imageId);
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(profile, {
        folder: "KenroX/Profile",
      });

      if (!cloudinaryResponse || cloudinaryResponse.error) {
        throw new Error(cloudinaryResponse.error || "Unknown Cloudinary Error");
      }

      updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          fullname,
          profile: {
            imageId: cloudinaryResponse.public_id,
            imageUrl: cloudinaryResponse.secure_url,
            updated: true,
          },
        },
        { new: true }
      );
    } else {
      // If profile is not provided, update only other fields
      updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { fullname },
        { new: true }
      );
    }

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found after update" });
    }

    const userWithoutPassword = { ...updatedUser._doc };
    delete userWithoutPassword.password;

    return res.status(200).json({ user: userWithoutPassword });
  } catch (error) {

  }
};
