const express = require("express");
//const HandyMan= require("../../models/HandyMan");
const bcrypt = require("bcryptjs");
const verifyEmail = require("../../lib/verifyEmail");
module.exports = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, address } = req.body;
    console.log(req.body);
    // Vérifiez si tous les champs requis sont présents
    // Vérifiez si l'utilisateur existe déjà
    const validHandyMan = await HandyMan.findOne({ email });
    if (validHandyMan) {
      return res.status(400).json({ message: "HandyMan already exists" });
    }
    // Hachez le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    // Créez un nouvel utilisateur
    const newHandyMan = new HandyMan({
      fullName,
      email,
      password: hashedPassword,
      imgUrl: "https://www.w3schools.com/howto/img_avatar.png",
      phoneNumber,
      address,
    });
    // Sauvegardez l'utilisateur dans la base de données
    await newHandyMan.save();
    // Envoyez un email de vérification
    const userData = await verifyEmail(
      email,
      fullName,
      newHandyMan._id,
      req.get("origin")
    );
    res.status(201).json({
      message: "HandyMan registered successfully",
      user: {
        id: newHandyMan._id,
        fullName: newHandyMan.fullName,
        email:newHandyMan.email,
        phoneNumber:newHandyMan.phoneNumber,
        address: newHandyMan.address,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
// Compare this snippet from routes/users/register.js:
//
// const User = require("../../models/User");
// const bcrypt = require("bcryptjs");
// const verifyEmail = require("../../lib/verifieyEmail");
