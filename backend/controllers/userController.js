const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const getAllUsers = asyncHandler(async (req, res) => {});

const createNewUser = asyncHandler(async (req, res) => {});

const updateUser = asyncHandler(async (req, res) => {});

const deleteUser = asyncHandler(async (req, res) => {});

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
