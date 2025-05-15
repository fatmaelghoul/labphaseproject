//geCustomer.js
const Customer = require("../../models/Customer");


module.exports = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifiez si le client existe
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ status: false, message: "Client non trouvé" });
        }
    }
    catch (error) {
        console.error("Erreur lors de la récupération du client :", error.message);
        res.status(500).json({ status: false, message: "Erreur serveur", error: error.message });
    }
    try {
        const { id } = req.params; // Récupérer l'ID du client depuis les paramètres

        // Vérifiez si l'ID est fourni
        if (!id) {
            return res.status(400).json({ message: "Client ID is required" });
        }

        // Trouver le client par ID
        const customer = await Customer.findById(id);

        // Vérifiez si le client existe
        if (!customer) {
            return res.status(404).json({ message: "Client not found" });
        }

        res.status(200).json(customer);
    } catch (error) {
        console.error("Error fetching customer by ID:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}