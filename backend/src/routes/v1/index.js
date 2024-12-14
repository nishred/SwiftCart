import express from "express";

import productRouter from "./product.routes.js";

import authRouter from "./auth.routes.js";

import userRouter from "./user.routes.js";

import orderRouter from "./order.routes.js"

const v1Router = express.Router();

v1Router.use("/products", productRouter);

v1Router.use("/auth", authRouter);

v1Router.use("/users", userRouter);

v1Router.use("/orders",orderRouter)

export default v1Router;
