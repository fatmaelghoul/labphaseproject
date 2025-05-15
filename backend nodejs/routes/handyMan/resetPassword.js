const express = require("express");
const router = express.Router();
const Handyman = require("../../models/HandyMan"); // Modèle Handyman
const crypto = require("crypto"); // Pour hacher le token
const bcrypt = require("bcryptjs"); // Pour hacher les mots de passe

// Route pour réinitialiser le mot de passe
router.put("/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Vérifiez que le mot de passe est fourni
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

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