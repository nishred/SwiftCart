import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRY, JWT_SECRET } from "../config/server.config.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;

  next();
});

userSchema.methods.comparePassword = async function (plainPassword) {
  const result = await bcrypt.compare(plainPassword, this.password);
  return result;
};

userSchema.methods.getJwtToken = function () {
  const token = jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
