const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.URI;
module.exports = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connected to database ✅");
  } catch (error) {
    if (error) throw error;
    return error;
  }
};