const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
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
  phonenumber: {
    type: Number,
    required: true,
  },
  venues: [{ type: Schema.Types.ObjectId, ref: "Venue" }],
});

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
