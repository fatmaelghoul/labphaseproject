const express = require("express"); // Import express framework
const User = require("../../models/Customer"); // Import the User model
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token generation
const dotenv = require("dotenv"); // Import dotenv to load environment variables
dotenv.config(); // Load environment variables from .env file

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from request body

    // Check if the user exists in the database
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" }); // Send error response if user not found
    }
    //middleware express.json

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compareSync(password, existingUser);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" }); // Send error response if password is invalid
    }

    // Check if the user is verified
    if (!existingUser.isVerified) {
      return res.status(401).json({ message: "Please verify your email" }); // Send error response if email is not verified
    }

    // Generate a JWT token for the user
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        isVerified: existingUser.isVerified, // Include isVerified in the token payload
      },
      process.env.JWT_SECRET,
      { expiresIn: "1 day" }
    );

    res.status(200).json({ message: "Login successful", token }); // Send success response with token
  } catch (error) {
    console.error("Error logging in:", error.message); // Log any errors
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message }); // Send error response
  }
};
