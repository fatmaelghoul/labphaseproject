const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

// Définition du schéma Admin
const AdminSchema = new Schema(
  {
    fullName: {
      type: String,
      minlength: [3, "Full name length must be at least 3 characters"],
      required: true,
    },
    email: {
      type: String,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email",
      ],
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      required: true,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false, // Indique si l'admin est un super administrateur
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // Ajoute createdAt et updatedAt automatiquement

// Middleware pour hacher le mot de passe avant de sauvegarder
AdminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10); // Générer un sel
    this.password = await bcrypt.hash(this.password, salt); // Hacher le mot de passe avec le sel
  }
  next(); // Passer au middleware suivant ou sauvegarder le document
});

// Méthode pour comparer les mots de passe
AdminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Exportation du modèle
module.exports = mongoose.model("Admin", AdminSchema);
