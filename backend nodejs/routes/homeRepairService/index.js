const express = require("express");
const router = express.Router();

// Import des gestionnaires de route
router.post("/create", require("./createHomeRepairService")); // Route pour créer un service de réparation à domicile


// Route pour créer un service de réparation à domicile
router.get("/", require("./getHomeRepairService")); // Route pour récupérer tous les services de réparation à domicile

module.exports = router;