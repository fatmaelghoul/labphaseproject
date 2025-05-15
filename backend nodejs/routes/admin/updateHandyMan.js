const Handyman = require("../../models/HandyMan");

module.exports = async (req, res) => {
  try {
    const { id } = req.params; // Récupérez l'ID du technicien à mettre à jour
    const updates = req.body; // Récupérez les données de mise à jour depuis le corps de la requête

    // Mettez à jour le technicien et renvoyez le document mis à jour
    const updatedHandyman = await Handyman.findByIdAndUpdate(id, updates, {
      new: true, // Retourne le document mis à jour
      runValidators: true, // Valide les mises à jour selon le schéma
    });

    if (!updatedHandyman) {
      return res.status(404).json({ status: false, message: "Handyman not found" });
    }

    res.status(200).json({ status: true, message: "Handyman updated successfully", data: updatedHandyman });
  } catch (error) {
    console.error("Error updating handyman:", error.message);
    res.status(500).json({ status: false, message: "Internal server error", error: error.message });
  }
};