const express = require("express");
const {
  createVenue,
  updateVenue,
  deleteVenue,
} = require("./../controllers/venue");

const router = express.Router();

//create a new venue
router.post("/vendor/:vendorId/venue", createVenue);
//update venue
router.patch("/vendor/:vendorId/venue/:id", updateVenue);
//delete venue
router.delete("/vendor/:vendorId/venue/:id", deleteVenue);
module.exports = router;
