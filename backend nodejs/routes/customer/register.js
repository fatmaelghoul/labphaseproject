const express = require("express");
const Customer = require("../../models/Customer");
const bcrypt = require("bcryptjs");
const verifyEmail = require("../../lib/verifyEmail");
//Unexpected token } in JSON at position 199"

module.exports = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, address } = req.body;
    console.log(req.body);
    // Vérifiez si tous les champs requis sont présents
    if (!fullName || !email || !password || !phoneNumber || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Vérifiez si l'utilisateur existe déjà
    const validCustomer = await Customer.findOne({ email });
    if (validCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }
    // Hachez le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    // Créez un nouvel utilisateur
    const newCustomer = new Customer({
      fullName,
      email,
      password: hashedPassword,
      imgUrl: "https://www.w3schools.com/howto/img_avatar.png",
      phoneNumber,
      address,
    });
    // Sauvegardez l'utilisateur dans la base de données
    await newCustomer.save();
    // Envoyez un email de vérification
    const userData = await verifyEmail(
      email,
      fullName,
      newCustomer._id,
      req.get("origin")
    );
    res.status(201).json({
      message: "Customer registered successfully",
      user: {
        id: newCustomer._id,
        fullName: newCustomer.fullName,
        email: newCustomer.email,
        phoneNumber: newCustomer.phoneNumber,
        address: newCustomer.address,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
