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
  password: {
    type: String,
    required: true,
  },
  locations: {
    type: [
      {
        localGA: String,
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
      },
    ],
  },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;

// validator {
// validate: (v) => {
// if (v.length <= 10) {
//   return true
// } else return false
// }
//  }

//  pre('save', )
