const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = require("../../middlewares/verifyToken"); // Middleware pour vérifier le token JWT
const profile = require("./profile"); // Importation du module de profil
// Route pour l'enregistrement
router.post("/register",  verifyToken,require("./register")); // Route pour enregistrer un nouveau client

// Route pour vérifier l'email
router.patch("/verifyEmail/:id", require("./verifyEmail")); // Route pour vérifier l'email d'un client

// Route pour la réinitialisation du mot de passe
router.post("/forgotPassword", verifyToken, require("./forgotPassword")); // Route pour demander un lien de réinitialisation
router.put("/resetPassword/:token", verifyToken,require("./resetPassword")); // Route pour réinitialiser le mot de passe

// Route pour la connexion
router.post("/login", verifyToken,require("./login")); // Route pour connecter un client

// Route pour récupérer le profil d'un client
router.get("/profile/:id", verifyToken, profile.getProfile); // Route pour récupérer les détails d'un client

// Route pour mettre à jour le profil d'un client
router.put("/profile/:id", verifyToken, profile.updateProfile); // Route pour mettre à jour les informations d'un client
//route pour  recuérer le profild'un technitien 
router.get("/getHandyMan", require("./getHandyMan"));
//route pour  recuérer le profil des technitiens 
router.get("/getHandyMen",require("./getHandyMen"));
// Route pour la déconnexion
router.get("/logout", verifyToken, require("./logout")); // Route pour déconnecter un client

router.get("/getHomeRepairServices", verifyToken, require("./getHomeRepairServices")); // Route pour récupérer les services de réparation à domicile
//router.get("/getHomeRepairServicesByCategory", verifyToken, require("/getHomeRepairServicesByCategory")); // Route pour récupérer les détails d'un service de réparation à domicile
module.exports = router;