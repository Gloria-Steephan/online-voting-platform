require("dotenv").config();
const mongoose = require("mongoose");
const Candidate = require("./src/models/Candidate");

const seedCandidates = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Candidate.deleteMany();

    await Candidate.insertMany([
      {
        name: "Candidate One",
        linkedinProfile: "https://linkedin.com/in/candidateone",
      },
      {
        name: "Candidate Two",
        linkedinProfile: "https://linkedin.com/in/candidatetwo",
      },
    ]);

    console.log("Candidates seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedCandidates();
