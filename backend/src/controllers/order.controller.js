import asyncHandler from "../utils/asyncHandler.js";
import OrderRepository from "../repositories/order.repository.js";

import { StatusCodes } from "http-status-codes";

const orderRepository = new OrderRepository();

const createOrder = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const createdOrder = await orderRepository.create({ ...req.body, user: _id });

  console.log("created order", createdOrder);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Order created Successfully",
    data: { order: createdOrder },
  });
});

export { createOrder };
