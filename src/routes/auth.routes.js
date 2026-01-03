const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const authController = require("../controllers/auth.controller");

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
    try {
      console.log("✅ Google OAuth callback hit");
      console.log("User from Google:", req.user);

      if (!req.user) {
        return res.redirect(`${process.env.FRONTEND_URL}/login`);
      }

      const token = jwt.sign(
        { id: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      console.log("✅ JWT created, redirecting to frontend");

      res.redirect(
        `${process.env.FRONTEND_URL}/login/success?token=${token}`
      );
    } catch (err) {
      console.error("❌ Google callback error:", err);
      res.redirect(`${process.env.FRONTEND_URL}/login`);
    }
  }
);

module.exports = router;
