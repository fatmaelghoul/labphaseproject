const HomeRepairService = require("../../models/HomeRepairService"); // Assurez-vous que le modèle est correctement importé

module.exports = async (req, res) => {
  try {
    const { category } = req.params; // Récupérez la catégorie depuis les paramètres de la requête

    // Recherchez les services correspondant à la catégorie
    const HomeRepairService = await HomeRepairService.find({ category });

    if (! HomeRepairService ||  HomeRepairService.length === 0) {
      return res.status(404).json({ message: "No services found for this category" });
    }

    res.status(200).json( HomeRepairService); // Retournez les services trouvés
  } catch (error) {
    console.error("Error fetching services by category:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};