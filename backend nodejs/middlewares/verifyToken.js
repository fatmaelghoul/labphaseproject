const jwt = require("jsonwebtoken");
require("dotenv").config(); // Charger les variables d'environnement

module.exports = (req, res, next) => {

  // Vérifiez si la route est autorisée sans token
  // Vous pouvez définir une liste de routes autorisées sans token ici
  const allowedRoutes = ["/register", "/login", "/logout"]; // Routes autorisées sans token

  if (allowedRoutes.includes(req.path)) {
    return next();
  }

  const token = req.header("Authorization")?.split(" ")[1]; // Récupérez le token depuis l'en-tête Authorization

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifiez le token avec la clé secrète
    req.user = decoded; // Ajoutez les données décodées à l'objet `req`
    next(); // Passez au middleware suivant
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};
