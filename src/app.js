const express = require("express");
const cors = require("cors");
const passport = require("passport");
require("./config/passport");
const authRoutes = require("./routes/auth.routes");
const protectedRoutes = require("./routes/protected.routes");
const voteRoutes = require("./routes/vote.routes");
const candidateRoutes = require("./routes/candidate.routes");


const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/vote", voteRoutes);
app.use("/api/candidates", candidateRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

module.exports = app;
