const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Définition du schéma Services
const ServicesSchema = new Schema(
  {
    serviceName: {
      type: String,
      required: true,
      minlength: [3, "Service name must be at least 3 characters long"],
    },
    description: {
      type: String,
      required: true,
      minlength: [10, "Description must be at least 10 characters long"],
    },
    image: {
      type: String,
      default: "https://example.com/default-image.jpg", // URL par défaut si aucune image n'est fournie
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
    },
    duration: {
      type: String, // Exemple : "1 hour", "2 days"
      required: true,
    },
    category: {
      type: String, // Exemple : "Plumbing", "Electrical", "Carpentry", "Mechanical"
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true, // Par défaut, le service est disponible
    },
  },
  { timestamps: true } // Ajoute createdAt et updatedAt automatiquement
);

// Exportation du modèle
module.exports = mongoose.model("Service", ServicesSchema);


