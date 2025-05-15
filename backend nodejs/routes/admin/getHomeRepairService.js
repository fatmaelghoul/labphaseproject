const HomeRepairService =require("../../models/HomeRepairService"); // Assurez-vous que le modèle est correctement importé

module.exports = async (req, res) => {
  try {
    // Récupérez tous les services de réparation à domicile avec les relations peuplées
    const data  = await HomeRepairService.find()
      .populate(
        "handymanId",
        "fullName email",
        "-password -isBanned -isVerified"
      ) // Inclure les informations du technicien (handyman)
      .populate(
        "customerId",
        "fullName email",
        "-password -isBanned -isVerified"
      ); // Inclure les informations du client (si applicable)

    res.status(200).json({ status: true, data });
  } catch (error) {
    console.error("Error fetching home repair services:", error.message);
    res.status(500).json({ status: false, error: error.message });
  }
};
