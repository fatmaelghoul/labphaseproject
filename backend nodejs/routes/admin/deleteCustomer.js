const Customer = require("../../models/Customer"); // Assurez-vous que le chemin est correct

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifiez si le client existe
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ status: false, message: "Client non trouvé" });
    }

    // Supprimez le client
    await Customer.findByIdAndDelete(id);

    res.status(200).json({ status: true, message: "Client supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du client :", error.message);
    res.status(500).json({ status: false, message: "Erreur serveur", error: error.message });
  }
};
