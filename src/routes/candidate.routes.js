const express = require("express");
const router = express.Router();

const { getCandidates } = require("../controllers/candidate.controller");

// GET all candidates
router.get("/", getCandidates);

module.exports = router;
