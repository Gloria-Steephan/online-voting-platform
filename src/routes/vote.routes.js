const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

const { castVote, getVoters } = require("../controllers/vote.controller");

// Cast vote (protected)
router.post("/", authMiddleware, castVote);

// Get voters list (can be public or protected — choose one)
router.get("/voters", getVoters);

module.exports = router;
