const HandyMan = require("../../models/HandyMan");

module.exports = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifie si l'ID est présent
        if (!id) {
            return res.status(400).json({ status: false, message: "ID de l'artisan requis" });
        }

        // Cherche l'artisan par ID
        const handyMan = await HandyMan.findById(id);

        // Si non trouvé
        if (!handyMan) {
            return res.status(404).json({ status: false, message: "Artisan non trouvé" });
        }

        // Artisan trouvé
        res.status(200).json({ status: true, handyMan });
    } catch (error) {
        console.error("Erreur lors de la récupération de l'artisan :", error.message);
        res.status(500).json({ status: false, message: "Erreur serveur", error: error.message });
    }
};
