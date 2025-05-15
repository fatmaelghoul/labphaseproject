const HomeRepairService = require("../../models/HomeRepairService");

const createHomeRepairService = async (req, res) => {
  try {
    const { serviceName, description, price, category, duration } = req.body;

    if (!serviceName || !description || !price || !category) {
      return res
        .status(400)
        .json({ message: "Champs obligatoires manquants." });
    }

    const newService = new HomeRepairService({
      serviceName,
      description,
      price,
      category,
      duration,
    });

    const savedService = await newService.save();
    res
      .status(201)
      .json({ message: "Service créé avec succès", service: savedService });
  } catch (err) {
    console.error("Erreur création service :", err.message);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = createHomeRepairService;
