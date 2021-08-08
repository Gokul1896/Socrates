/** This file defines the schema for the user model*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  userName: { type: String, unique: true },
  isVerified: { type: Boolean, default: true },
  password: { type: String },
  passwordResetToken: String,
  passwordResetExpires: String,
  role: { type: String },
  specialization: { type: String },
  institute: { type: String },

  created_at: { type: Date },

  fullName: { type: String },
});

const UserModel = mongoose.model("user", Schema);
module.exports = UserModel;
