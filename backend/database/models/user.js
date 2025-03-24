const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
