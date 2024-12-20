import { UserController } from "../../controllers/index.js";

import express from "express";

import auth from "../../middlewares/auth.js";
import orderRouter from "./order.routes.js";

const userRouter = express.Router();

userRouter.use("/orders", orderRouter);

userRouter.get("/profile", auth, UserController.getUserProfile);
userRouter.put("/:id", auth, UserController.updateUserProfile);

export default userRouter;
