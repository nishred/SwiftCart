import ErrorResponse from "../errors/ErrorResponse.js";
import ProductRepository from "../repositories/product.repository.js";
import asyncHandler from "../utils/asyncHandler.js";

import multer from "multer";

import { StatusCodes } from "http-status-codes";

import s3Client from "../config/s3.config.js";
import { S3_BUCKET_NAME } from "../config/server.config.js";

import { AWS_REGION } from "../config/server.config.js";

import { PutObjectCommand } from "@aws-sdk/client-s3";

const productRepository = new ProductRepository();

const storage = multer.memoryStorage();
export const upload = multer({ storage });

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

const deleteProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const product = await productRepository.delete(id);

  if (!product)
    throw new ErrorResponse("Product doesn't exist", StatusCodes.NOT_FOUND);

  res.status(StatusCodes.ACCEPTED).json({
    success: true,
    message: "Product has been deleted successfully",
  });
});

// file {
//   fieldname: 'image',
//   originalname: 'photo_6262440408290279373_w.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 01 00 48 00 48 00 00 ff e2 02 28 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 02 18 00 00 00 00 04 30 00 00 ... 709690 more bytes>,
//   size: 709740
// }

const createProduct = asyncHandler(async (req, res, next) => {
  const file = req.file;

  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: `${Date.now()}_${file.originalname}`, // Unique file name
    Body: file.buffer, // File content from Multer
    ContentType: file.mimetype, // File MIME type
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  const fileUrl = `/${params.Key}`;

  const product = await productRepository.create({
    ...req.body,
    user: req.user._id,
    image: fileUrl,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product created successfully",
    data: { product },
  });
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const file = req.file;

  const productId = req.params.id;

  const product = { ...req.body };

  const oldProduct = await productRepository.getById(productId);

  if (!oldProduct)
    throw new ErrorResponse("product doesn't exist", StatusCodes.NOT_FOUND);

  if (file) {
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: `${Date.now()}_${file.originalname}`, // Unique file name
      Body: file.buffer, // File content from Multer
      ContentType: file.mimetype, // File MIME type
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const image = `/${params.Key}`;

    product.image = image;
  }

  const updatedProduct = await productRepository.update(productId, product);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "product updated successfully",
    data: { product: updatedProduct },
  });
});

export { getProducts, getProduct, deleteProduct, createProduct, updateProduct };
