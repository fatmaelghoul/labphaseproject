const Admin = require("../../models/Admin"); // Import du modèle Admin
const bcrypt = require("bcryptjs"); // Import de bcrypt pour comparer les mots de passe
const jwt = require("jsonwebtoken"); // Import de jsonwebtoken pour générer des tokens
require("dotenv").config(); // Charger les variables d'environnement

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body; // Extraire l'email et le mot de passe du corps de la requête

    // Vérifiez si l'administrateur existe
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Vérifiez si le mot de passe est correct
    const isPasswordValid = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      {
        id: existingAdmin._id,
        email: existingAdmin.email,
        isSuperAdmin: existingAdmin.isSuperAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Le token expire après 1 heure
    );

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: existingAdmin._id,
        fullName: existingAdmin.fullName,
        email: existingAdmin.email,
        isSuperAdmin: existingAdmin.isSuperAdmin,
      },
    });
  } catch (error) {
    console.error("Error during admin login:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
