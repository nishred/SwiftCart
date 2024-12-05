import ProductRepository from "../repositories/product.repository.js";
import asyncHandler from "../utils/asyncHandler.js";

import { StatusCodes } from "http-status-codes";

const productRepository = new ProductRepository();

//@desc Get all products
//@route GET /api/v1/products
//@access Public
const getProducts = asyncHandler(async (req, res, next) => {
  const products = await productRepository.getAll();

  res.status(StatusCodes.OK).json({ success: true, data: { products } });
});

//@desc Get single product
//@route GET /api/v1/products/:id
//@access Public
const getProduct = asyncHandler(async (req, res, next) => {
  const product = await productRepository.getById(req.params.id);

  res.status(StatusCodes.OK).json({ success: true, data: { product } });
});

export { getProducts, getProduct };
