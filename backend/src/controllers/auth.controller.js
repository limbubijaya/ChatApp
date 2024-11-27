const generateToken = require("../lib/utils");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ message: "Mandatory fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, name, password: hashedPassword });
    await newUser.save();

    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    });
  } catch (error) {
    console.error("Error in Signup Controller: " + error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error("Error in Login Controller: " + error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Error in Logout Controller: " + error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

const checkUser = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in checkUser Controller: " + error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const tokenMatch = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(tokenMatch.userID).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying token: " + error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  signup,
  login,
  logout,
  checkUser,
  verifyToken,
};
