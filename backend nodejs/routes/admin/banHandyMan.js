const HandyMan = require("../../../models/HandyMan"); // Import du modèle HandyMan

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifiez si le technicien existe
    const handyman = await HandyMan.findById(id);
    if (!handyman) {
      return res.status(404).json({ status: false, message: "HandyMan not found" });
    }

    // Bannir le technicien
    handyman.isBanned = true;
    await handyman.save();

    res.status(200).json({ status: true, message: "HandyMan banned successfully" });
  } catch (error) {
    console.error("Error banning HandyMan:", error.message);
    res.status(500).json({ status: false, message: "Internal server error", error: error.message });
  }
};