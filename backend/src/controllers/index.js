import { login, register } from "./auth.controller.js";
import { getProduct, getProducts } from "./product.controller.js";
import { getUserProfile, updateUserProfile } from "./user.controller.js";

import { createOrder, getOrder, updateOrderToPaid } from "./order.controller.js";

const ProductController = {
  getProducts,
  getProduct,
};

const AuthController = {
  register,
  login,
};

const UserController = {
  getUserProfile,
  updateUserProfile,
};

const OrderController = {
  createOrder,
  getOrder,
  updateOrderToPaid
};

export { ProductController, AuthController, UserController, OrderController };
