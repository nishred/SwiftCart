import express from "express";
import { createOrderExtendedSchema } from "../../validators/order.validator.js";
import validator from "../../middlewares/validator.js";
import { OrderController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  auth,
  validator(createOrderExtendedSchema),
  OrderController.createOrder
);

orderRouter.get("/:id", auth, OrderController.getOrder);

orderRouter.put("/:id/pay", auth, OrderController.updateOrderToPaid);

export default orderRouter;
