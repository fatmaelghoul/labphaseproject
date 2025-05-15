const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./lib/connect");
const Customer = require("./models/Customer");
require("dotenv").config();

// Connect to the database
connectDB()
  .then(() => console.log("Connected to MongoDB ✅"))
  .catch((err) => console.error("Error connecting to MongoDB ❌", err));

// Middleware
app.use(express.static("public")); // Serve static files from the public directory
app.use(cors({ origin: ["http://localhost:5173"] })); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Log incoming requests
app.use((req, res, next) => {
  console.log (`${req.method} ${req.url}`);
  next();
});

// Routes
//middleware

app.use("/api/customer", require("./routes/customer"));
app.use("/api/handyMan", require("./routes/handyMan"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/homeRepairService", require("./routes/homeRepairService"));



app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running 🚀" });
});

// Default route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
console.log("Server is running on port 5000 🚀");

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
