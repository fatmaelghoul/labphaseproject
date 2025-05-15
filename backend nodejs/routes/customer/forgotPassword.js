const express = require("express");
const router = express.Router();
const Customer= require("../../models/Customer"); // Modèle utilisateur
const crypto = require("crypto"); // Pour générer des tokens sécurisés
//const sendEmail = require("../../utils/sendEmail"); // Fonction pour envoyer des emails
const bcrypt = require("bcryptjs"); // Pour hacher les mots de passe
const jwt = require("jsonwebtoken"); // Pour vérifier les tokens

// Route pour demander un lien de réinitialisation de mot de passe
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    // Vérifiez si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Générer un token sécurisé
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hacher le token avant de le stocker
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Définir le token et sa date d'expiration
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Créer le lien de réinitialisation
    const resetUrl = `${req.protocol}://${req.get("host")}/api/handyman/resetPassword/${resetToken}`;

    // Envoyer l'email
    const message = `You requested a password reset. Click the link below to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`;
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: message,
    });

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Error in forgot password:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Route pour réinitialiser le mot de passe
router.put("/resetPassword/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Hacher le token pour le comparer avec celui stocké
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Trouver l'utilisateur avec le token valide
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Vérifiez si le token n'a pas expiré
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Mettre à jour le mot de passe et supprimer le token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in reset password:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;


// Compare this snippet from routes/customer/login.js:
// const express = require("express");