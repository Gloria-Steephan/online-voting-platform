const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");
const User = require("../models/User");

exports.castVote = async (req, res) => {
  try {
    const userId = req.user._id;
    const { candidateId } = req.body;

    // 1. Check if user already voted
    if (req.user.hasVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }

    // 2. Check if candidate exists
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // 3. Save vote
    await Vote.create({
      user: userId,
      candidate: candidateId,
    });

    // 4. Increment candidate vote count
    candidate.voteCount += 1;
    await candidate.save();

    // 5. Update user voting status
    await User.findByIdAndUpdate(userId, { hasVoted: true });

    res.status(200).json({ message: "Vote cast successfully" });
  } catch (error) {
    res.status(500).json({ message: "Voting failed", error });
  }
};
