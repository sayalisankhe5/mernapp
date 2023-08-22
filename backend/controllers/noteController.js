const asyncHandler = require("express-async-handler");
const Note = require("../models/Note");
const User = require("../models/User");

const collationProps = {
  locale: "en",
  strength: 2,
};
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean();

  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }
  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean().exec();
      return { ...note, username: user.username };
    })
  );

  res.json(notesWithUser);
});
const createNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;
  if (!user || !title || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findById(user).lean().exec();
  if (!existingUser) {
    return res.status(400).json({ message: "No such user found" });
  }

  const duplicateNote = await Note.findOne({ title })
    .collation(collationProps)
    .lean()
    .exec();
  if (duplicateNote) {
    return res.status(400).json({ message: "duplicate note found" });
  }

  const note = await Note.create({ user, title, text });
  if (note) {
    return res.status(201).json({ message: "new note is created" });
  } else {
    return res.status(400).json({ message: "Invalid data" });
  }
});
const updateNote = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body;

  if (!id || !user || !title || !text || typeof completed != "boolean") {
    return res.status(400).json({ message: "All fields are required " });
  }
  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "No such note found" });
  }

  const existingUser = await User.findById(user).lean().exec();
  if (!existingUser) {
    return res.status(400).json({ message: "no such user found" });
  }
  const duplicateNote = await Note.findOne({ title })
    .collation(collationProps)
    .lean()
    .exec();
  if (duplicateNote && duplicateNote?._id.toString() != id) {
    return res.status(409).json({ message: "duplicate note found" });
  }

  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;
  const updatedNote = await note.save();
  res.json({ message: `note with title ${updatedNote.title} is updated` });
});
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

  const reply = `note with title ${note.title} and Id ${note._id} is deleted`;
  res.json(reply);
});

module.exports = { getAllNotes, createNote, updateNote, deleteNote };
