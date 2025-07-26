const express = require("express");
const router = express.Router();

// Import des gestionnaires de route
router.post("/create", require("./createService")); // Route pour créer un service de réparation à domicile


// Route pour créer un service de réparation à domicile
router.get("/", require("./getService")); // Route pour récupérer tous les services de réparation à domicile

module.exports = router;