import express from "express";

import products from "../products.js";

import cors from "cors"

import {PORT} from "./config/server.config.js"

const app = express();

app.use(cors())

app.get("/products", (req, res, next) => {
  res.json({
    data: {
      products: products,
    },
  });
});

app.get("/products/:id", (req, res, next) => {
  const product = products.find((item) => {
    return item._id === req.params.id;
  });

  res.json({
    data: {
      product,
    },
  });
});

app.listen(PORT, () => {
  console.log("The server has started running on PORT",PORT);
});
