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
