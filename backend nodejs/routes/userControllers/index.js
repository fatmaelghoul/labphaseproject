const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/verifyToken");

router.post("/register", require("./register"));
router.post("/login", require("./login"));
router.get("/profile",  require("./profile"));
router.patch("/updateProfile", require("./updateProfile.js")); // Décommenté et protégé
router.post("/forgotPassword", require("./forgotPassword"));
router.put("/resetPassword/:token", require("./resetPassword")); // Token dans l'URL
router.patch("/updatePassword", verifyToken, require("./updatePassword")); // Protégé
//router.get("/getAllUsers", verifyToken, require("./getAllUsers")); // Protégé
router.use("/verifyEmail", require("./verifyEmail"));

module.exports = router;
