import ErrorResponse from "../errors/ErrorResponse.js";

export default function errorHanlder(err, req, res, next) {
  if (err instanceof ErrorResponse) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });

  } else
    res.status(500).json({
      success: false,
      error: err.message,
    });
}
