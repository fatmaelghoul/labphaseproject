const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "votre_clé_secrète_par_défaut";

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cherche le user (customer ou handyman) par email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    // Vérifie le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    // Génère un token avec son rôle
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,      // "customer" ou "handyman"
        phone: user.phone,
        address: user.address,
        skills: user.skills || [handyman ? [] : null],
        prices: user.prices || [handyman ? [] : null],
        duration: user.duration || [handyman ? [] : null],
     }   });   
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
