const asyncHandler = require("express-async-handler");
const Note = require("../models/Note");

const getAllNotes = asyncHandler(async (req, res) => {});
const createNote = asyncHandler(async (req, res) => {});
const updateNote = asyncHandler(async (req, res) => {});
const deleteNote = asyncHandler(async (req, res) => {});

module.exports = { getAllNotes, createNote, updateNote, deleteNote };
