const express = require("express");
const { createVenue } = require("./../controllers/venue");

const router = express.Router();

//create a new venue
router.post("/vendor/:vendorId/venue", createVenue);

module.exports = router;
