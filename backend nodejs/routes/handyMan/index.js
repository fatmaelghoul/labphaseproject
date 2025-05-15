const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Charger les variables d'environnement
const verifyToken = require("../../middlewares/verifyToken"); // Middleware pour vérifier le token JWT
// Middleware pour vérifier le token JWT

// Routes pour l'enregistrement et la connexion
router.post("/register", require("./register")); // Enregistrer un technicien
router.post("/login", require("./login")); // Connexion d'un technicien
router.get("/logout", verifyToken, require("./logout")); // Déconnexion d'un technicien

// Routes pour le profil
router.get("/profile/:id", verifyToken, require("./getProfile")); // Récupérer le profil d'un technicien
router.put("/profile/:id", verifyToken, require("./updateProfile")); // Mettre à jour le profil d'un technicien

// Routes pour la vérification de l'email
router.post("/verifyEmail", require("./verifyEmail")); // Envoyer un email de vérification
router.patch("/verifyEmail", require("./verifyEmail")); // Vérifier l'email d'un technicien

// Routes pour la réinitialisation du mot de passe
router.post("/forgotPassword", require("./forgotPassword")); // Demander un lien de réinitialisation
router.put("/resetPassword/:token", require("./resetPassword")); // Réinitialiser le mot de passe

// Ajoutez ici d'autres routes spécifiques aux techniciens si nécessaire

// Exportation du routeur
module.exports = router;