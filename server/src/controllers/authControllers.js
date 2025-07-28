import cloudinary from "../lib/cloudinary.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signupHandler = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create new user
    const newUser = new User.create({
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

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
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
  const { fullname, email, profile } = req.body;

  try {
    // Check for duplicate email
    if (email !== req.user.email) {
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(400).json({ error: "Email already in use" });
      }
    }

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
          email,
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
        { fullname, email },
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
}

export const sendToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });

  const userWithoutPassword = { ...user._doc };
  delete userWithoutPassword.password;

  res
    .cookie("kenroXToken", token, {
      maxAge: 5 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
    });

  res.redirect(`${process.env.CLIENT_URL}`);
};
