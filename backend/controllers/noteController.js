const asyncHandler = require("express-async-handler");
const Note = require("../models/Note");
const User = require("../models/User");

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean();

  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }

  res.json(notes);
});
const createNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;
  if (!user || !title || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //   const existingUser = await User.findById({ _id: user }).lean().exec();
  //   if (!existingUser) {
  //     return res.status(400).json({ message: "No such user found" });
  //   }

  const note = await Note.create({ user, title, text });
  if (!note) {
    return res.status(201).json({ message: "new note is created" });
  } else {
    return res.status(400).json({ message: "Invalid data" });
  }
});
const updateNote = asyncHandler(async (req, res) => {});
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Note Id is required" });
  }
  const note = await Note.findById(id).exec();
  if (!note) {
    return res.status(400).json({ message: "No note found" });
  }
  const result = await note.deleteOne();
});

module.exports = { getAllNotes, createNote, updateNote, deleteNote };
