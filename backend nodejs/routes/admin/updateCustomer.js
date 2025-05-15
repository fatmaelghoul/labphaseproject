const Customer = require("../../models/Customer");

module.exports = async (req, res) => {
  try {
    const { id } = req.params; // Récupérez l'ID du client à mettre à jour
    const updates = req.body; // Récupérez les données de mise à jour depuis le corps de la requête

    // Mettez à jour le client et renvoyez le document mis à jour
    const updatedCustomer = await Customer.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedCustomer) {
      return res.status(404).json({ status: false, message: "Customer not found" });
    }

    res.status(200).json({ status: true, message: "Customer updated successfully", data: updatedCustomer });
  } catch (error) {
    console.error("Error updating customer:", error.message);
    res.status(500).json({ status: false, message: "Internal server error", error: error.message });
  }
};