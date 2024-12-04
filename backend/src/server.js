import express from "express";

import products from "./data/products.js";

import cors from "cors";

import connectToDB from "./config/db.config.js";

import { PORT } from "./config/server.config.js";
import errorHandler from "./middlewares/errorHandler.js";

import apiRouter from "./routes/index.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log("The server has started running on PORT", PORT);

  await connectToDB();
});
