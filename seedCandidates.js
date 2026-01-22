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
        linkedinProfile: "https://www.linkedin.com/in/gloria-steephan-43a574371",
      },
      {
        name: "Candidate Two",
        linkedinProfile: "https://www.linkedin.com/in/chrismon-p-lijo-083b07322?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
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
