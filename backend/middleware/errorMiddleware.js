import logger from "../logger.js";

export const logError =  (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  if (err.message.includes("prisma")) {
    res.json({ "error:": "Datatabase error. Please check your data and try again." });
    logger.error(err.message);
    next();
  } else {
    res.json({ "error:": err.message });
    logger.error(err.message);
    next();
  }

  }