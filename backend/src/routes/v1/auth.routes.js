import { AuthController } from "../../controllers/index.js";

import express from "express";

const authRouter = express.Router();

authRouter.post("/register", AuthController.register);

authRouter.post("/login", AuthController.login);

export default authRouter;
