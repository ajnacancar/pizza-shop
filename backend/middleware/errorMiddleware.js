import logger from "../logger.js";

export const logError =  (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.statusCode(statusCode).json({ "error:": err.message });
  logger.error(err.message);
  next(err)
  }