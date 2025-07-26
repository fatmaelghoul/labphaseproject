//index
const User = require("../../models/User");
const express = require("express");
const { route } = require("../admin");
const router = express.Router();

router.post("/register", require("./register"));
router.post("/login", require("./login")); // ✅ Le login ne doit PAS être protégé par verifyToken
//router.get("/profile", require("./profile")); // ✅ Le profil doit être protégé par verifyToken
//router.put("/profile", require("./updateProfile")); // ✅ La mise à jour du profil doit
module.exports = router;