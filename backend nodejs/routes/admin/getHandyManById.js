
const HandyMan = require("../../models/HandyMan"); // Modèle Handyman

module.exports = async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'ID du technicien depuis les paramètres

    // Vérifiez si l'ID est fourni
    if (!id) {
      return res.status(400).json({ message: "Technician ID is required" });
    }

    // Trouver le technicien par ID
    const HandyMan = await HandyMan.findById(id);

    // Vérifiez si le technicien existe
    if (!HandyMan) {
      return res.status(404).json({ message: "Technician not found" });
    }

    res.status(200).json(HandyMan);
  } catch (error) {
    console.error("Error fetching technician by ID:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}