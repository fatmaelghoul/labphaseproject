const express = require("express");
const router = express.Router();
const Handyman = require("../../models/HandyMan"); // Modèle Handyman
const crypto = require("crypto"); // Pour générer des tokens sécurisés
const bcrypt = require("bcryptjs"); // Pour hacher les mots de passe
//const sendEmail = require("../../utils/sendEmail"); // Fonction pour envoyer des emails

// Route pour demander un lien de réinitialisation de mot de passe
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    // Vérifiez si le technicien existe
    const handyman = await Handyman.findOne({ email });
    if (!handyman) {
      return res.status(404).json({ message: "Handyman not found" });
    }

    // Générer un token sécurisé
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hacher le token avant de le stocker
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Définir le token et sa date d'expiration
    handyman.resetPasswordToken = hashedToken;
    handyman.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await handyman.save();

    // Créer le lien de réinitialisation
    const resetUrl = `${req.protocol}://${req.get("host")}/api/handyman/resetPassword/${resetToken}`;

    // Envoyer l'email
    const message = `You requested a password reset. Click the link below to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`;
    await sendEmail({
      to: handyman.email,
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

    // Trouver le technicien avec le token valide
    const handyman = await Handyman.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Vérifiez si le token n'a pas expiré
    });

    if (!handyman) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Mettre à jour le mot de passe et supprimer le token
    handyman.password = hashedPassword;
    handyman.resetPasswordToken = undefined;
    handyman.resetPasswordExpires = undefined;
    await handyman.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in reset password:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;