const express = require("express");
const router = express.Router();
const HomeRepairService = require("../../models/HomeRepairService"); // Import du modèle Service

// Mettre à jour un service de réparation à domicile par ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {HomeRepairServiceName, description, price, duration, category, isAvailable } =
      req.body;

    // Vérifiez que les champs nécessaires sont présents
    if (!HomeRepairServiceName || !description || !price || !duration || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Mettre à jour le service
    const updatedHomeRepairService = await Service.findByIdAndUpdate(
      id,
      { HomeRepairServiceName, description, price, duration, category, isAvailable },
      { new: true } // Retourner le document mis à jour
    );

    if (!updatedHomeRepairService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      message: "Service updated successfully",
      HomeRepairService: updatedHomeRepairService,
    });
  } catch (error) {
    console.error("Error updating service:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
