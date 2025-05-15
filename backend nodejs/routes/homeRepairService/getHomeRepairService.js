const HomeRepairService = require('../../models/HomeRepairService');

const getHomeRepairService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await HomeRepairService.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service non trouvé." });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error("Erreur récupération service :", error.message);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

module.exports = getHomeRepairService;
// Compare this snippet from routes/homeRepairService/index.js: