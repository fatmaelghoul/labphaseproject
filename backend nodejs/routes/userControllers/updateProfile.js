const User = require("../../models/User");

  var controller = async (req, res) => {
    try {
      const userId = req.user?.id || req.params.id;
      const updates = req.body;

      // Fetch the user from the database
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "Utilisateur non trouvé",
        });
      }

      // Mise à jour des champs communs
      user.fullName = updates.fullName ?? user.fullName;
      user.email = updates.email ?? user.email;
      user.phoneNumber = updates.phoneNumber ?? user.phoneNumber;
      user.address = updates.address ?? user.address;
      user.img = updates.img ?? user.img;

      // Mise à jour des champs spécifiques au handyman
      if (user.role === "handyman") {
        user.skills = updates.skills ?? user.skills;
        user.prices = updates.prices ?? user.prices;
        user.duration = updates.duration ?? user.duration;
      }

      await user.save();

      res.status(200).json({
        status: true,
        message: "Profil mis à jour avec succès",
        user,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error.message);
      res.status(500).json({
        status: false,
        message: "Erreur serveur",
        error: error.message,
      });
    }
  };

module.exports = controller;