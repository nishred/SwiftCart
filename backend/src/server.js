import express from "express";

import products from "./data/products.js";

import cors from "cors";

import connectToDB from "./config/db.config.js";

import { JWT_EXPIRY, JWT_SECRET, PORT } from "./config/server.config.js";
import errorHandler from "./middlewares/errorHandler.js";

import cookieParser from "cookie-parser";

import apiRouter from "./routes/index.js";

import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import User from "./models/User.js";
import ErrorResponse from "./errors/ErrorResponse.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api", apiRouter);

app.get("/me", async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    const decodedPayload = jwt.verify(token, JWT_SECRET);

    //  name, email, _id, isAdmin, token;

    const id = decodedPayload.id;

    const user = await User.findById(id);

    if (!user) throw new Error("Token invalid");

    res.status(StatusCodes.OK).json({
      success: true,
      data: {
        name: user.name,
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
      },
    });
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      error: "Please login",
    });
  }
});

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log("The server has started running on PORT", PORT);

  await connectToDB();
});
