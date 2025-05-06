const User = require("./../database/models/user");
require("dotenv").config();
const argon2 = require("argon2");
const generateCookie = require("./../utils/utils");

//create new user
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hash = await argon2.hash(password);
    const pw = hash.replace("$argon2id$", "");
    const newUser = await User.create({ name, email, password: pw });
    await newUser.save();
    let payload = newUser._id.toString();
    generateCookie(res, payload);
    return res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json(error);
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    let hash = `$argon2id$${user.password}`;
    const check = await argon2.verify(hash, password);
    if (!check) {
      return res.status(401).json({ mesage: "Invalid credentials" });
    } else {
      //.sign(payload, secret, options)
      const payload = user._id.toString();
      generateCookie(res, payload);
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

//book a venue for an event

//cancel an event 48hrs - users cannot cancel the event 2 days before
//

module.exports = { createUser, loginUser };
