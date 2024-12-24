import { ProductController } from "../../controllers/index.js";

import express from "express";
import auth from "../../middlewares/auth.js";
import { upload } from "../../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get("/", ProductController.getProducts);
productRouter.get("/:id", ProductController.getProduct);

productRouter.delete("/:id", auth(true), ProductController.deleteProduct);

productRouter.post(
  "/",
  auth(true),
  upload.single("image"),
  ProductController.createProduct
);

productRouter.put(
  "/:id",
  auth(true),
  upload.single("image"),
  ProductController.updateProduct
);

export default productRouter;
