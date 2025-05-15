const express = require("express");
const Customer = require("../../models/Customer"); // Modèle Customer

// Récupérer le profil d'un client
module.exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifiez si l'ID est valide
    if (!id) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    // Trouver le client par ID
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer profile:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Mettre à jour le profil d'un client
module.exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Vérifiez si l'ID est valide
    if (!id) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    // Vérifiez si les données à mettre à jour sont fournies
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No updates provided" });
    }

    // Mettre à jour les informations du client
    const updatedCustomer = await Customer.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", customer: updatedCustomer });
  } catch (error) {
    console.error("Error updating customer profile:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};