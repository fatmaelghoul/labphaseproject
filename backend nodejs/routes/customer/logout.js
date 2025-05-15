const express = require("express");

module.exports = (req, res) => {
  try {
    // Invalider le token côté client
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};