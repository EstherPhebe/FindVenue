const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateCookie(res, payload) {
  const token = jwt.sign({ id: payload }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  res.cookie("cookie", token, {
    maxAge: 2 * 60 * 60 * 1000,
    httpOnly: true,
  });
}

module.exports = generateCookie;
