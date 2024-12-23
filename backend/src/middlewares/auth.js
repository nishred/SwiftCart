import asyncHandler from "../utils/asyncHandler.js";

import UserRepository from "../repositories/user.repository.js";

import ErrorResponse from "../errors/ErrorResponse.js";

import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/server.config.js";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

const userRepository = new UserRepository();

// const auth = asyncHandler(async (req, res, next) => {
//   let token;

//   if (req.cookies?.token) token = req.cookies.token;
//   else if (req.headers.authorization?.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token)
//     throw new ErrorResponse("Not authorized to access this route", 401);

//   const decoded = jwt.verify(token, JWT_SECRET);

//   const user = await userRepository.getById(decoded.id);

//   if (!user) throw new ErrorResponse("No user found with this id", 404);

//   req.user = user;

//   next();
// });

const auth = (admin) => {
  return asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      throw new ErrorResponse("Please login again", StatusCodes.UNAUTHORIZED);

    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await userRepository.getById(id);

    if (!user) throw new ErrorResponse("User not found", StatusCodes.NOT_FOUND);

    if (admin) {
      if (!user.isAdmin)
        throw new ErrorResponse(
          "User is not an admin",
          StatusCodes.UNAUTHORIZED
        );
    }

    req.user = user;

    next();
  });
};

export default auth;
