const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const venueSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  state: {
    type: String,
    required: true,
  },
  localGA: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: [
      "<15",
      "<35",
      "<50",
      "<75",
      "<100",
      "<150",
      "<200",
      "<250",
      "<300",
      "<350",
      "<400",
      "<450",
      "<500",
    ],
  },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

const Venue = mongoose.model("Venue", venueSchema);
module.exports = Venue;
