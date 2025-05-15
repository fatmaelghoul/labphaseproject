// models/HandyMan.js
const mongoose = require("mongoose");

const HandyManSchema = new mongoose.Schema ({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User', // lien vers le compte utilisateur
  //   required: true,
  //   unique: true
  // },
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true

  },
  email: {
    type: String,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email"
    ],
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: [12, "Password must be at least 6 characters"],
    required: true
  },

  imgUrl: {
    type: String,
    default: "https://www.w3schools.com/howto/img_avatar.png"
  },
  adress: {
    type: String,

  },
  skills: {
    type: [String], // ex : ['plomberie', 'électricité']
    required: true
  },
  bio: {
    type: String,
    maxlength: 500
  },
  experienceYears: {
    type: Number,
    default: 0
  },
  availability: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ➕ Méthode : mettre à jour la note moyenne
HandyManSchema.methods.updateRating = function (newRating) {
  this.rating = ((this.rating * this.reviewsCount) + newRating) / (this.reviewsCount + 1);
  this.reviewsCount += 1;
  return this.save();
};

module.exports = mongoose.model('Handyman', HandyManSchema);