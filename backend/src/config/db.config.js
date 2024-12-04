import { MONGO_URI } from "./server.config.js";

import mongoose from "mongoose";

export default async function connectToDB() {
    
  console.log(MONGO_URI);

  await mongoose.connect(MONGO_URI);
}
