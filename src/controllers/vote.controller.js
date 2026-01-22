const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");
const User = require("../models/User");

/**
 * =========================
 * CAST VOTE
 * =========================
 */
exports.castVote = async (req, res) => {
  try {
    const userId = req.user._id;
    const { candidateId } = req.body;

    if (req.user.hasVoted === true) {
      return res.status(400).json({ message: "You have already voted" });
    }

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    await Vote.create({
      user: userId,
      candidate: candidateId,
    });

    await Candidate.findByIdAndUpdate(candidateId, {
      $inc: { voteCount: 1 },
    });

    await User.findByIdAndUpdate(userId, {
      hasVoted: true,
    });

    res.status(200).json({ message: "Vote cast successfully" });
  } catch (error) {
    console.error("Vote error:", error);
    res.status(500).json({ message: "Voting failed" });
  }
};

/**
 * =========================
 * GET VOTERS (REAL USERS)
 * =========================
 */
exports.getVoters = async (req, res) => {
  try {
    const voters = await User.find(
      { hasVoted: true },
      {
        name: 1,
        linkedinProfile: 1,
        _id: 0,
      }
    );

    res.status(200).json(voters);
  } catch (error) {
    console.error("Get voters error:", error);
    res.status(500).json({ message: "Failed to fetch voters" });
  }
};
