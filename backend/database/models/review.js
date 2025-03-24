const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  review: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  venue: { type: Schema.Types.ObjectId, ref: "Venue" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
