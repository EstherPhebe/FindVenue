const express = require("express");
const { createUser } = require("./../controllers/user");

const router = express.Router();

//create new user
router.post("/user/register", createUser);

module.exports = router;
