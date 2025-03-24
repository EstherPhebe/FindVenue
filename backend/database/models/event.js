const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    min: Date.now,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  venue: { type: Schema.Types.ObjectId, ref: "Venue" },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
