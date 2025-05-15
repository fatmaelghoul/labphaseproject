const Handyman = require("../../models/HandyMan"); // Modèle Handyman

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Vérifiez si l'ID est fourni
    if (!id) {
      return res.status(400).json({ message: "Handyman ID is required" });
    }

    // Vérifiez si les données à mettre à jour sont fournies
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No updates provided" });
    }

    // Mettre à jour les informations du technicien
    const updatedHandyman = await Handyman.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    // Vérifiez si le technicien existe
    if (!updatedHandyman) {
      return res.status(404).json({ message: "Handyman not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", handyman: updatedHandyman });
  } catch (error) {
    console.error("Error updating handyman profile:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};