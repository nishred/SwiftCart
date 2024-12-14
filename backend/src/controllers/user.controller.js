import UserRepository from "../repositories/user.repository.js";

import asyncHandler from "../utils/asyncHandler.js";

import { StatusCodes } from "http-status-codes";

const userRepository = new UserRepository();

const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await userRepository.getById(req.user._id);

  res.status(StatusCodes.OK).json({ success: true, data: { user } });
});

const updateUserProfile = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const updatedUser = await userRepository.update(_id, req.body);

  console.log("updated user", updatedUser);

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

export { getUserProfile, updateUserProfile };
