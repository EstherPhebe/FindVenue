const express = require("express");
const { createVendor, getVendor } = require("./../controllers/vendor");
const { getvendorsVenues } = require("./../controllers/venue");

const router = express.Router();

//Create new vendor - new vendor registration
router.post("/vendor", createVendor);
//Get vendor details
router.get("/vendor/:id", getVendor);
//Get all vendor venues
router.get("./vendor/:id/venues", getvendorsVenues);

module.exports = router;
