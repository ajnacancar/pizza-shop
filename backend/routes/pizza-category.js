import express from "express";
import logger from "../logger.js"
import {get, getAll, create, update, remove} from "../services/pizza-category.js"
import {protect, protectAdmin} from "../middleware/authMiddleware.js";
import { logError } from "../middleware/errorMiddleware.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  logger.info(`Accessing route for getting all pizza categories - ${req.ip}`);
  try {
    let pizzas = await getAll();
    res.json(pizzas);
  } catch (err) {
    logError(err, req, res, next);
  }
});

router.get("/:id", async (req, res, next) => {
  logger.info(`Accessing route for getting pizza category by id - ${req.ip}`);
  try {
    let pizzas = await get(req.params.id);
    res.json(pizzas);
  } catch (err) {
    logError(err, req, res, next);
  }
});


router.post("/", protectAdmin, async (req, res, next) => {
  logger.info(`Accessing route for creating pizza category - ${req.ip}`);
  try {
    let message = await create(req.body);
    res.json(message);
  } catch (err) {
    logError(err, req, res, next);
  }
});


router.put("/:id", protectAdmin, async (req, res, next) => {
  logger.info(`Accessing route for updating pizza category - ${req.ip}`);
  try {
    let message = await update(req.params.id, req.body);
    res.json(message);
  } catch (err) {
    logError(err, req, res, next);
  }
});


router.delete("/:id", protectAdmin, async (req, res, next) => {
  logger.info(`Accessing route for deleting pizza category - ${req.ip}`);
  try {
    let message = await remove(req.params.id);
    res.json(message);
  } catch (err) {
    logError(err, req, res, next);
  }
});

export default router;
