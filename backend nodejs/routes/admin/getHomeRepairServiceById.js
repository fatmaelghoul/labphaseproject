const express = require("express");
const HomeRepairService = require("../../models/HomeRepairService"); // Modèle HomeRepairServices

module.exports = async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'ID du service depuis les paramètres

    // Vérifiez si l'ID est fourni
    if (!id) {
      return res.status(400).json({ message: "Service ID is required" });
    }

    // Trouver le service par ID
    const HomeRepairService = await HomeRepairService.findById(id).populate(
      "handymanId",
      "fullName email"
    );

    // Vérifiez si le service existe
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error("Error fetching service by ID:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
