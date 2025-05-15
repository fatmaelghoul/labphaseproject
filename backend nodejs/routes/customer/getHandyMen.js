// routes/handyMen.js
const express = require("express");
const router = express.Router();
const HandyMan = require("../../models/HandyMan");

// GET - Tous les artisans
router.get("/getHandyMen", async (req, res) => {
    try {
        const handyMen = await HandyMan.find();
        if (handyMen.length === 0) {
            return res.status(404).json({ status: false, message: "Aucun artisan trouvé" });
        }
        res.status(200).json({ status: true, handyMen });
    } catch (error) {
        res.status(500).json({ status: false, message: "Erreur serveur", error: error.message });
    }
});

// POST - Ajouter un nouvel artisan
router.post("/", async (req, res) => {
    try {
        const newHandyMan = new HandyMan(req.body);
        const savedHandyMan = await newHandyMan.save();
        res.status(201).json({ status: true, handyMan: savedHandyMan });
    } catch (error) {
        res.status(400).json({ status: false, message: "Erreur lors de l'ajout", error: error.message });
    }
});

module.exports = router;
