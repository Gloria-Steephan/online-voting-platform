const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const protectedRoutes = require("./routes/protected.routes");
const voteRoutes = require("./routes/vote.routes");
const candidateRoutes = require("./routes/candidate.routes");
const passport = require("passport");
require("./config/passport");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/vote", voteRoutes);
app.use("/api/candidates", candidateRoutes);
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

module.exports = app;
