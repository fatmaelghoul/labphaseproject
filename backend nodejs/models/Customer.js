const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const CustomerSchema = new Schema({
  fullName: { 
    type: String,
    minlength: [3, "Full name length must be at least 3 characters"],
    required: false,
  },
  birthDate: {
    type: Date,
  
  },
  email: {
    type: String,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email",
    ],
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters"],

    required: false,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    default: "https://www.w3schools.com/howto/img_avatar.png",
  },
  address: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
