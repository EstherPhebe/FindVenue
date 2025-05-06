const express = require("express");
const {
  createVenue,
  updateVenue,
  deleteVenue,
  getVenue,
} = require("./../controllers/venue");
const { bookEvent } = require("./../controllers/event");

const router = express.Router();

//create a new venue
router.post("/vendor/:vendorId/venue", createVenue);
//update venue
router.patch("/vendor/:vendorId/venue/:id", updateVenue);
//delete venue
router.delete("/vendor/:vendorId/venue/:id", deleteVenue);
//show single venue with details
router.get("/venue/:id", getVenue);
//book event //Move to event routes file
router.post("/:userId/:venueId/event", bookEvent);
module.exports = router;
