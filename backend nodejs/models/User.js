const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  img: {
    type: String, // URL de l'image de profil
    trim: true,
    default:
      "https://fr.freepik.com/vecteurs-libre/cercle-bleu-utilisateur-blanc_145857007.htm#fromView=keyword&page=1&position=0&uuid=6e7e418e-11f9-4350-b29a-9c13a0bc72a8&query=User+Icon", // ou une image par défaut
  },
  role: {
    type: String,
    enum: ["user", "handyman","customer"],
    default: "user",
  },
  // Champs spécifiques aux handymen
  skills: [
    {
      type: String,
      trim: true,
    },
  ],
  prices: [
    {
      type: Number,
    },
  ],
  duration: [
    {
      type: String, // ou Number si tu veux stocker en minutes/heures
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
