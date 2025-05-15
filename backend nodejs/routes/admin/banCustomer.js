const Customer = require("../../models/Customer"); // Import du modèle Customer

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifie que l'ID est bien fourni
    if (!id) {
      return res.status(400).json({ status: false, message: "ID du client manquant." });
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { $set: { isBanned: true } },
      { new: true } // pour renvoyer le document mis à jour si besoin
    );

    // Si le client n'existe pas
    if (!updatedCustomer) {
      return res.status(404).json({ status: false, message: "Client non trouvé." });
    }

    res.status(200).json({ status: true, message: "Client banni avec succès.", customer: updatedCustomer });
  } catch (error) {
    console.error("Erreur lors du bannissement :", error);
    res.status(500).json({ status: false, message: "Erreur serveur.", error: error.message });
  }
};
