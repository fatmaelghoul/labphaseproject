const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    const userId = req.user.id; // récupéré depuis le middleware verifyToken
    const user = await User.findById(userId).select('-password'); // on exclut le mot de passe

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Erreur lors de la récupération du profil :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};