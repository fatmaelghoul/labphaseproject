const express = require("express");
const route = express.Router();
const verifyToken = require("../../middlewares/verifyToken"); // Middleware JWT
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// --------------------- AUTH ADMIN ---------------------
route.post("/register", verifyToken, require("./register"));
route.post("/login", require("./login")); // ✅ Le login ne doit PAS être protégé par verifyToken
route.get("/logout", verifyToken, require("./logout"));

// ----------------- HOME REPAIR SERVICES ----------------
route.get("/getHomeRepairService", verifyToken, require("./getHomeRepairService"));
route.get("/getHomeRepairServiceByCategory", verifyToken, require("./getHomeRepairServiceByCategory"));
route.get("/getHomeRepairServiceById/:id", verifyToken, require("./getHomeRepairServiceById")); // ✅ Ajouter ":id"
route.put("/updateHomeRepairService/:id", verifyToken, require("./updateHomeRepairService")); // ✅ Ajouter ":id"
route.delete("/deleteHomeRepairServiceById/:id", verifyToken, require("./deleteHomeRepairServiceById")); // ✅ CORRECTION: nom du fichier était mal écrit

// ---------------------- HANDYMEN ----------------------
route.get("/getHandyManByFullNameById", verifyToken, require("./getHandyManByFullNameById")); // ✅ Ajouter ":id"
route.get("/getHandyManById", verifyToken, require("./getHandyManById"));
route.put("/updateHandyMan/:id", verifyToken, require("./updateHandyMan")); // ✅ Ajouter ":id" et corriger le nom du fichier
route.delete("/deleteHandyMan/:id", verifyToken, require("./deleteHandyMan")); // ✅ Ajouter ":id"
//route.delete("/banHandyMan/:id", verifyToken, require("./banHandyMan")); // ✅ Ajouter ":id"

// ---------------------- CUSTOMERS ----------------------
route.get("/getCustomer", verifyToken, require("./getCustomer"));
route.put("/updateCustomer/:id", verifyToken, require("./updateCustomer")); // ✅ Ajouter ":id"
route.delete("/deleteCustomer/:id", verifyToken, require("./deleteCustomer")); // ✅ Ajouter ":id"
route.delete("/banCustomer/:id", verifyToken, require("./banCustomer")); // ✅ Ajouter ":id"

module.exports = route;

