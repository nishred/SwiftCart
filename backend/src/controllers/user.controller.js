import UserRepository from "../repositories/user.repository.js";

import asyncHandler from "../utils/asyncHandler.js";

import { StatusCodes } from "http-status-codes";

const userRepository = new UserRepository();

const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await userRepository.getById(req.user._id);

  res.status(StatusCodes.OK).json({ success: true, data: { user } });
});

export { getUserProfile };
