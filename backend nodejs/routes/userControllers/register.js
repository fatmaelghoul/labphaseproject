const User = require("../../models/User"); // Remplacez par Customer ou HandyMan si besoin
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
require("dotenv").config();

const sendVerificationEmail = require("../../lib/sendVerificationEmail");

const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète_par_défaut';

module.exports = async (req, res) => {
  try {
    const { fullName, email, password, role,phoneNumber, address, skills } = req.body;

    if (!['customer', 'handyman'].includes(role)) {
      return res.status(400).json({ message: 'Rôle invalide.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    phoneNumber,
      address,
      skills: role === 'handyman' ? skills : []
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role }, JWT_SECRET, { expiresIn: '1h' });
    const verificationLink = `http://localhost:5173/verifyEmail?token=${token}&role=${role}`;

    await sendVerificationEmail(email, verificationLink);

    res.status(201).json({ message: 'Inscription réussie. Vérifiez votre email.' });
  
  
  
  
  
  
  
  
  
  
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
