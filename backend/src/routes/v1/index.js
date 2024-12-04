import express from "express"

import productRouter from "./product.routes.js"

const v1Router = express.Router()


v1Router.use("/products", productRouter)

export default v1Router