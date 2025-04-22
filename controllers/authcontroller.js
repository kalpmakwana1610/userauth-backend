const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

//function to generate JWT token
const generatetoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//signup function
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userexists = await User.findOne({ email });
    if (userexists) {
      return res.status(400).json({ message: "user already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = generatetoken(newUser._id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//LOGIN function

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login request received:", email, password);

    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generatetoken(user._id);
    console.log("Token generated:", token);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDcwNDU1NDYyMDRkMjQ4MjY4OWIwMSIsImlhdCI6MTc0NTI5MDMyNSwiZXhwIjoxNzQ3ODgyMzI1fQ.r6Fv1Sv3xx4Fp4XqA8_a8jZetvx_DKlDYzVOgyzTjeM
