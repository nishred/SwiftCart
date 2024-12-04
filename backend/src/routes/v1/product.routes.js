import { ProductController } from "../../controllers/index.js";

import express from "express";

const productRouter = express.Router();

productRouter.get("/", ProductController.getProducts);
productRouter.get("/:id", ProductController.getProduct);

export default productRouter;
