const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./lib/connect");
require("dotenv").config();

// Connect to the database
connectDB()
  .then(() => console.log("Connected to MongoDB ✅"))
  .catch((err) => console.error("Error connecting to MongoDB ❌", err));

// Middleware
app.use(express.static("public"));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/userControllers", require("./routes/userControllers"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/services", require("./routes/homeRepairServicesData"));

// Route racine
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running 🚀" });
});

// Default route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT} 🚀`);
});
