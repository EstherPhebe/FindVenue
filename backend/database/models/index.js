const Venue = require("./venue");
const Vendor = require("./vendor");
const Event = require("./event");
const User = require("./user");
const Review = require("./review");

const db = {
  Venue,
  Vendor,
  Event,
  User,
  Review,
};

module.exports = db;
