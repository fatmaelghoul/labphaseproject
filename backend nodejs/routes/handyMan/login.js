const TeckHandMan = require("../../models/HandyMan"); // Import du modèle TeckHandMan
const bcrypt = require("bcryptjs"); // Import de bcrypt pour comparer les mots de passe
const jwt = require("jsonwebtoken"); // Import de jsonwebtoken pour générer des tokens
require("dotenv").config(); // Charger les variables d'environnement

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body; // Extraire l'email et le mot de passe du corps de la requête

    // Vérifiez si l'utilisateur existe
    const existingTeckHandlyMan = await TeckHandMan.findOne({ email });
    if (!existingTeckHandlyMan) {
      return res.status(404).json({ message: "User not found" });
    }

    // Vérifiez si le mot de passe est correct
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Vérifiez si l'utilisateur est vérifié
    if (!existingUser.isVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your email before logging in" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Le token expire après 1 heure
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        phoneNumber: existingUser.phoneNumber,
        address: existingUser.address,
      },
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
