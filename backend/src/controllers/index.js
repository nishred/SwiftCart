import { login, register } from "./auth.controller.js";
import { getProduct, getProducts } from "./product.controller.js";
import { getUserProfile } from "./user.controller.js";

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
};

export { ProductController, AuthController, UserController };
