const User = require("../../models/User");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ status: false, message: "Les champs sont obligatoires." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: false, message: "Utilisateur non trouvé." });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: false, message: "Ancien mot de passe incorrect." });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ status: true, message: "Mot de passe mis à jour avec succès." });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du mot de passe :")
        console.error(error);
        res.status(500).json({ status: false, message: "Erreur serveur." });
    }
};