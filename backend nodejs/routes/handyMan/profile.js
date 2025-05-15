const express = require("express");
//const Handyman = require("../../models/HandyMan"); // Modèle Handyman

// Récupérer le profil d'un technicien
module.exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Trouver le technicien par ID
    const handyman = await Handyman.findById(id);

    if (!handyman) {
      return res.status(404).json({ message: "Handyman not found" });
    }

    res.status(200).json(handyman);
  } catch (error) {
    console.error("Error fetching handyman profile:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Mettre à jour le profil d'un technicien
module.exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Mettre à jour les informations du technicien
    const updatedHandyman = await Handyman.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedHandyman) {
      return res.status(404).json({ message: "Handyman not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", handyman: updatedHandyman });
  } catch (error) {
    console.error("Error updating handyman profile:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};