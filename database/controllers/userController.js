// controllers/userController.js
const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listUsers = async (_, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findUserBySub = async (req, res) => {
  const { sub } = req.params;
  try {
    const user = await User.find({ authSub: sub });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { sub } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { authSub: sub },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createUser, listUsers, findUserBySub, updateUser };
