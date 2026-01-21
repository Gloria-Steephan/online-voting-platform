const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

/* =========================
   EMAIL / PASSWORD AUTH
   ========================= */
router.post("/signup", authController.register);
router.post("/login", authController.login);

/* =========================
   FORGOT PASSWORD
   ========================= */
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

/* =========================
   GET CURRENT USER
   ========================= */
router.get("/me", authMiddleware, authController.getMe);

/* =========================
   GOOGLE OAUTH START
   ========================= */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/* =========================
   GOOGLE OAUTH CALLBACK
   ========================= */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  (req, res) => {
    if (!req.user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login`);
    }

    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.redirect(
      `${process.env.FRONTEND_URL}/login/success?token=${token}`
    );
  }
);

/* =========================
   LINKEDIN OAUTH START
   ========================= */
router.get(
  "/linkedin",
  passport.authenticate("linkedin")
);

/* =========================
   LINKEDIN OAUTH CALLBACK
   ========================= */
router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  async (req, res) => {
    try {
      // Passport already authenticated
      let user = await User.findOne({ linkedinId: req.user.linkedinId });

      if (!user) {
        user = await User.create({
          name: "LinkedIn User",
          email: `linkedin_${Date.now()}@mail.com`,
          linkedinId: req.user.linkedinId,
          linkedinProfile: "https://www.linkedin.com", // required by doc
        });
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.redirect(
        `${process.env.FRONTEND_URL}/login/success?token=${token}`
      );
    } catch (err) {
      console.error("LinkedIn callback error:", err);
      res.redirect(`${process.env.FRONTEND_URL}/login`);
    }
  }
);

module.exports = router;
