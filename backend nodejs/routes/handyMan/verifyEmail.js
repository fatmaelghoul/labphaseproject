const HandyMan = require("../../models/HandyMan"); // Assurez-vous d'importer le modèle HandyMan
const verifyEmail = require("./verifyEmail");
module.exports = async (req, res) => {
  try {
    const { id } = req.params; // Extraire l'ID des paramètres de la requête

    // Trouvez l'utilisateur par son ID et mettez à jour isVerified à true
    const updatedHandyMan = await HandyMan.findByIdAndUpdate(
      id,
      { isVerified: true }, // Définir isVerified sur true
      { new: true } // Retourne le document mis à jour
    );

    // Vérifiez si l'utilisateur existe
    if (!updatedHandyMan) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Email verified successfully" }); // Envoyer une réponse de succès
  } catch (error) {
    console.error("Error verifying email:", error.message); // Journaliser les erreurs éventuelles
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message }); // Envoyer une réponse d'erreur
  }
};
