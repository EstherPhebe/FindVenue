const User = require("./../database/models/user");

//create new user
const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = User.create({ name, email });
    newUser.save();
    let data = newUser.name;
    return res.status(201).json({ message: "User created", name });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createUser };
