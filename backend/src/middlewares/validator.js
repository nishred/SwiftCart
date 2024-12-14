import asyncHandler from "../utils/asyncHandler.js";

const validator = (schema) => {
  return asyncHandler((req, res, next) => {
    const parsedSchema = schema.parse(req.body);

    req.body = parsedSchema;

    next();
  });
};

export default validator;
