// deleteHomeRepairService.js
const HomeRepairService = require("../../models/HomeRepairService");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifie si le service existe
    const HomeRepairService = await HomeRepairService.findById(id);
    if (!HomeRepairService) {
      return res.status(404).json({ status: false, message: "Service non trouvé" });
    }

    // Supprime le service
    await HomeRepairService.findByIdAndDelete(id);

    res.status(200).json({ status: true, message: "Service supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du service :", error.message);
    res.status(500).json({ status: false, message: "Erreur serveur", error: error.message });
  }
};
