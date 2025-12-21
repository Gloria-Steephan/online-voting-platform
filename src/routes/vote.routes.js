const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { castVote } = require("../controllers/vote.controller");

// Protected vote route
router.post("/", authMiddleware, castVote);

module.exports = router;
