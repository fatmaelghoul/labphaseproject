
const Handyman = require("../../models/HandyMan"); // Modèle Handyman

module.exports = async (req, res) => {
  try {
    const { fullName } = req.params; // Récupérer le nom complet depuis les paramètres

    // Vérifiez si le nom complet est fourni
    if (!fullName) {
      return res.status(400).json({ message: "Full name is required" });
    }

    // Rechercher les techniciens par nom complet (insensible à la casse)
    const handymen = await Handyman.find({ fullName: { $regex: fullName, $options: "i" } });

    // Vérifiez si des techniciens ont été trouvés
    if (!handymen || handymen.length === 0) {
      return res.status(404).json({ message: "No handymen found with the given full name" });
    }

    res.status(200).json(handymen);
  } catch (error) {
    console.error("Error fetching handymen by full name:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};