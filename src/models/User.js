const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
    },

    googleId: {
      type: String,
    },

    linkedinId: {
      type: String,
    },

    // 🔹 REQUIRED for voters list → LinkedIn profile click
    linkedinProfile: {
      type: String,
      default: "", // safe default
    },

    hasVoted: {
      type: Boolean,
      default: false,
    },

    /* =========================
       FORGOT PASSWORD SUPPORT
       ========================= */
    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
