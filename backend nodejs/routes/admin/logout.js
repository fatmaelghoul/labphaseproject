const Admin = require("../../models/Admin"); // Import du modèle Admin
module.exports = async (req, res) => {
  try {
    // Si vous utilisez des sessions ou des tokens, vous pouvez les invalider ici
    // Exemple : Supprimez le token côté client ou terminez la session

    res.status(200).json({ message: "Admin logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
