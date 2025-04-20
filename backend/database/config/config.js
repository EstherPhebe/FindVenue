require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    if (process.env.NODE_ENV === "development") {
      mongoose.set("debug", true);
    }
    console.log("Database connected");
  } catch (error) {
    console.log(`Nope, an error: ${error.message}`);
    process.exit(1); // Exit process if connection fails
  }
}

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected");
});

mongoose.connection.on("error", (error) => {
  console.log(`Mongoose error ${error}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

module.exports = connect;
