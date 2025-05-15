const Customer = require("../../models/Customer");

module.exports = async (req, res) => {
    try {
        const customers = await Customer.find();

        // Vérifie si la liste est vide
        if (customers.length === 0) {
            return res.status(404).json({ status: false, message: "Aucun client trouvé" });
        }

        // Retourne la liste des clients
        res.status(200).json({ status: true, customers });
    } catch (error) {
        console.error("Erreur lors de la récupération des clients :", error.message);
        res.status(500).json({ status: false, message: "Erreur serveur", error: error.message });
    }
};
