const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");
const User = require("../models/User");

/**
 * CAST VOTE
 */
exports.castVote = async (req, res) => {
  try {
    const userId = req.user._id;
    const { candidateId } = req.body;

    // Check if user already voted
    if (req.user.hasVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }

    // Check if candidate exists
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Save vote
    await Vote.create({
      user: userId,
      candidate: candidateId,
    });

    // Increment candidate vote count
    candidate.voteCount += 1;
    await candidate.save();

    // Mark user as voted
    await User.findByIdAndUpdate(userId, { hasVoted: true });

    res.status(200).json({ message: "Vote cast successfully" });
  } catch (error) {
    res.status(500).json({ message: "Voting failed", error });
  }
};

/**
 * GET VOTERS
 */
exports.getVoters = async (req, res) => {
  try {
    const votes = await Vote.find()
      .populate("user", "name linkedinProfile")
      .populate("candidate", "name");

    const voters = votes.map(vote => ({
      voterName: vote.user?.name,
      linkedinProfile: vote.user?.linkedinProfile,
      votedFor: vote.candidate?.name,
    }));

    res.status(200).json(voters);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch voters", error });
  }
};
