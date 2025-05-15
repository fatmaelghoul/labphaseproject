const express = require("express");
const Handyman = require("../../models/HandyMan"); // Modèle Handyman

module.exports = async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'ID du technicien

    // Vérifiez si l'ID est fourni
    if (!id) {
      return res.status(400).json({ message: "Handyman ID is required" });
    }

    // Trouver le technicien par ID
    const handyman = await Handyman.findById(id);

    // Vérifiez si le technicien existe
    if (!handyman) {
      return res.status(404).json({ message: "Handyman not found" });
    }

    res.status(200).json(handyman);
  } catch (error) {
    console.error("Error fetching handyman profile:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};