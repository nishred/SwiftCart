import UserRepository from "../repositories/user.repository.js";

import asyncHandler from "../utils/asyncHandler.js";

import { StatusCodes } from "http-status-codes";

import ErrorResponse from "../errors/ErrorResponse.js";

const userRepository = new UserRepository();

//@desc Register a new user
//@route POST /api/v1/auth/register
//@access Public

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await userRepository.create({ name, email, password });

  const token = user.getJwtToken();

  res
    .status(StatusCodes.CREATED)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
      },
    });
});

//@desc Login user

//@route POST /api/v1/auth/login
//@access Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;


  const user = await userRepository.getByEmail(email);


  if (!user)
    throw new ErrorResponse("Invalid credentials", StatusCodes.UNAUTHORIZED);

  const match = await user.comparePassword(password);


  if (!match)
    throw new ErrorResponse("Invalid credentials", StatusCodes.UNAUTHORIZED);

  const token = user.getJwtToken();

  res
    .status(StatusCodes.OK)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
      },
    });
});

export { register, login };
