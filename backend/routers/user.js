const express = require("express");
const { createUser, loginUser } = require("./../controllers/user");

const router = express.Router();

//create new user
router.post("/user/register", createUser);
//login user
router.post("/user/login", loginUser);

module.exports = router;
