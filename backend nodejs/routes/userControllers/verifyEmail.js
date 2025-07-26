const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendVerificationEmail = require("../../lib/sendVerificationEmail");

// 📩 Route pour envoyer l'email de vérification
router.post("/verifyEmail", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email déjà vérifié." });
    }

    // Génération du token de vérification
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Lien vers la page frontend
    const verificationLink = `${process.env.FRONTEND_URL}/verifyEmail?token=${token}`;

    // Envoi de l'email
    await sendVerificationEmail(user.email, verificationLink);

    res.status(200).json({ message: "Email de vérification envoyé." });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// ✅ Route pour vérifier l'email à partir du lien
router.get("/verifyEmail", async (req, res) => {
  try {
    const token = req.query.token;
    console.log("Token reçu :", token);
    if (!token) return res.status(400).send("Token manquant.");

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).send("Lien invalide ou expiré.");
    }

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).send("Utilisateur non trouvé.");

    if (user.isVerified) {
      return res.status(200).send({msg: "Email déjà vérifié."});
    }

    user.isVerified = true;
    await user.save();

    return res.redirect(`${process.env.FRONTEND_URL}/login?verified=true`);
  } catch (error) {
    console.error("Erreur de vérification :", error.message);
    res.status(500).send("Erreur serveur.");
  }
});

module.exports = router;
