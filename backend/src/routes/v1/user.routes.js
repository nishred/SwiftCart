import { UserController } from "../../controllers/index.js";

import express from "express";

import auth from "../../middlewares/auth.js";

const userRouter = express.Router();

userRouter.get("/profile", auth, UserController.getUserProfile);
userRouter.put("/:id", auth, UserController.updateUserProfile);

export default userRouter;


