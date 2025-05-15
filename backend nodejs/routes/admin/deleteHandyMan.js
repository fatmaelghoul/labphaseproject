// Import du modèle HandyMan
const HandyMan = require("../../models/HandyMan"); // Assurez-vous que le modèle est correctement importé

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifiez si le technicien existe
    const HandyMan = await HandyMan.findById(id);
    if (!HandyMan) {
      return res.status(404).json({ status: false, message: "Technicien non trouvé" });
    }

    // Supprimez le technicien
    await HandyMan.findByIdAndDelete(id);

    res.status(200).json({ status: true, message: "Technicien supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du technicien :", error.message);
    res.status(500).json({ status: false, message: "Erreur serveur", error: error.message });
  }
};
