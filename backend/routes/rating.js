import express from "express";
import logger from "../logger.js";

import {logError} from "../middleware/errorMiddleware.js"

import {rate} from "../services/rating.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
    logger.info(`Accessing route for rating pizza - ${req.ip}`);
    try {
      let message = await rate(req.body);
      res.json(message);
    } catch (err) {
      logError(err, req, res, next);
    }
  });

  export default router;