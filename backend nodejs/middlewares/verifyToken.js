const jwt = require("jsonwebtoken");
require("dotenv").config();

const publicRoutes = [
  "/api/userControllers/login",
  "/api/userControllers/logout",
  "/api/userControllers/verifyEmail",
  "/api/userControllers/register",
];
const allowedRoutes = [
  "/api/admin/login",
  "/api/admin/logout",
  "/api/admin/verifyEmail",
];

module.exports = (req, res, next) => {
  // Autoriser les routes publiques sans vérification
  console.log(`Incoming request: ${req.method} ${req.path}`);
  if (publicRoutes.some((route) => req.path.startsWith(route))) {
    return next();
  }

  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Injecter l'utilisateur dans la requête
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token." });
  }
};
