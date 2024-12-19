import asyncHandler from "../utils/asyncHandler.js";
import OrderRepository from "../repositories/order.repository.js";
import { StatusCodes } from "http-status-codes";
import ErrorResponse from "../errors/ErrorResponse.js";
const orderRepository = new OrderRepository();

const createOrder = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const createdOrder = await orderRepository.create({ ...req.body, user: _id });

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Order created Successfully",
    data: { order: createdOrder },
  });
});

const getOrder = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const order = await orderRepository.getById(id, {
    path: "user",
    select: "name email",
  });

  if (!order) throw new ErrorResponse("Order not found", StatusCodes.NOT_FOUND);

  res.status(StatusCodes.ACCEPTED).json({
    success: true,
    message: "Order fetched successfully",
    data: { order },
  });
});

const updateOrderToPaid = asyncHandler(async (req, res, next) => {

  const orderId = req.params.id;


  const updatedOrder = await orderRepository.updateOrderToPaid(
    orderId,
    req.body
  );

  res.status(StatusCodes.ACCEPTED).json({
    success: true,
    message: "Paid successfully",
    data: {
      order: updatedOrder,
    },
  });
});

export { createOrder, getOrder, updateOrderToPaid };
