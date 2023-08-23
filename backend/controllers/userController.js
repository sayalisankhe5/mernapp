const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Note = require("../models/Note");
const collationProps = {
  locale: "en",
  strength: 2,
};
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "Users data not found" });
  }
  res.json(users);
});

const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const duplicate = await User.findOne({ username })
    .collation(collationProps)
    .lean()
    .exec();
  if (duplicate) {
    return res.status(409).json({ message: "duplicate user present" });
  }

  const hashedPswd = await bcrypt.hash(password, 10);

  const user = await User.create({ username, password: hashedPswd, roles });
  if (user) {
    res.status(201).json({ message: `New user ${username} is created` });
  } else {
    res.status(400).json({ message: "Invalid data" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, username, password, roles, active } = req.body;
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active != "boolean"
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const duplicate = await User.findOne({ username })
    .collation(collationProps)
    .lean()
    .exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "duplicate User found" });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} is updated` });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  /*const note = await Note.findOne({ user: id }).lean().exec();
  if (note) {
    return res.status(400).json({
      message: "User has notes assigned to them so the user cannot be deleted ",
    });
  }*/

  const result = await user.deleteOne();
  const reply = `User with username = ${result.username} and id = ${result.id} is deleted`;
  res.json(reply);
});

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
