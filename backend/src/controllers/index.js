import { login, register } from "./auth.controller.js";
import {
  deleteProduct,
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
} from "./product.controller.js";
import {
  getAllUsers,
  getUserById,
  getUserProfile,
  removeUser,
  updateUserProfile,
} from "./user.controller.js";

import {
  createOrder,
  getOrder,
  getOrdersByUser,
  updateOrderToPaid,
} from "./order.controller.js";

const ProductController = {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
};

const AuthController = {
  register,
  login,
};

const UserController = {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  removeUser,
  getUserById,
};

const OrderController = {
  createOrder,
  getOrder,
  updateOrderToPaid,
  getOrdersByUser,
};

export { ProductController, AuthController, UserController, OrderController };
