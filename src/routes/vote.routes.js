const express = require("express");
const router = express.Router();

const voteController = require("../controllers/vote.controller");
const authMiddleware = require("../middleware/auth.middleware");

/**
 * CAST VOTE
 */
router.post(
  "/",
  authMiddleware,
  voteController.castVote
);

/**
 * GET VOTERS
 */
router.get(
  "/voters",
  authMiddleware,
  voteController.getVoters
);

module.exports = router;
