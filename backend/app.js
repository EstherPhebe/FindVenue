const express = require("express");
const cors = require("cors");
require("dotenv").config();
const vendor = require("./routers/vendor");
const venue = require("./routers/venue");
const user = require("./routers/user");

const connectDB = require("./database/config/config");

const PORT = process.env.PORT;

const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use("/", vendor, venue, user);

app.get("/test", (req, res) => {
  return res.status(200).json({ msg: "Working fine" });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT} - ${Date()}`);
});
