import ErrorResponse from "../errors/ErrorResponse.js";
import UserRepository from "../repositories/user.repository.js";

import asyncHandler from "../utils/asyncHandler.js";

import { StatusCodes } from "http-status-codes";

const userRepository = new UserRepository();

const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await userRepository.getById(req.user._id);

  res.status(StatusCodes.OK).json({ success: true, data: { user } });
});

const updateUserProfile = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  const updatedUser = await userRepository.update(id, req.body);

  if (!updatedUser)
    throw new ErrorResponse("User not found", StatusCodes.NOT_FOUND);

  res.status(StatusCodes.ACCEPTED).json({
    success: true,
    message: "User updated successfully",
    data: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    },
  });
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await userRepository.getAll();

  res.status(StatusCodes.ACCEPTED).json({
    success: true,
    message: "Users retrieved successfully",
    data: { users },
  });
});

const removeUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const user = await userRepository.delete(id);

  if (!user)
    throw new ErrorResponse("The user doesn't exist", StatusCodes.NOT_FOUND);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "User deleted successfully",
  });
});

const getUserById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const user = await userRepository.getById(id);

  if (!user) throw new ErrorResponse("User not found", StatusCodes.NOT_FOUND);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "User retrieved successfully",
    data: { user },
  });
});

export {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  removeUser,
  getUserById,
};
