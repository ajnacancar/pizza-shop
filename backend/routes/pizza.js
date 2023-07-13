import express from "express";
import logger from "../logger.js";

import {protect, protectAdmin}   from "../middleware/authMiddleware.js";
import {logError}   from "../middleware/errorMiddleware.js";
import {getAll, getNewest, getBest, search, get, getByCategory, create, update, remove } from "../services/pizza.js"


const router = express.Router();


router.get("/", async (req, res, next) => {
  logger.info(`Accessing route for getting all pizzas - ${req.ip}`);
  try {
    let products = await getAll();
    if (req.query.search !== "" || req.query.search !== undefined) {
      products = await search(req.query.search);
    }
    res.json(products);
  } catch (err) {
    logError(err, req, res, next);
  }
});

router.get("/new", async (req, res, next) => {
  logger.info(`Accessing route for getting newest pizzas - ${req.ip}`);
  try {
    let products = await getNewest(req.query.num);
    res.json(products);
  } catch (err) {
    logError(err, req, res, next);
  }
});

router.get("/best", async (req, res, next) => {
  logger.info(`Accessing route for getting best pizzas - ${req.ip}`);
  try {
    let products = await getBest(req.query.num);
    res.json(products);
  } catch (err) {
    logError(err, req, res, next);
  }
});

router.get("/:id", async (req, res, next) => {
  logger.info(`Accessing route for getting pizza by id - ${req.ip}`);
  try {
    let product = await get(req.params.id);
    res.json(product);
  } catch (err) {
    logError(err, req, res, next);
  }
});

router.get("/category/:id", async (req, res, next) => {
  logger.info(`Accessing route for getting pizzas by category - ${req.ip}`);
  try {
    let products = await getByCategory(req.params.id);
    res.json(products);
  } catch (err) {
    logError(err, req, res, next);
  }
});

router.post("/", protectAdmin, async (req, res, next) => {
  logger.info(`Accessing route for adding new pizza - ${req.ip}`);
  try {
    let message = await create(req.body);
    res.json(message);
  } catch (err) {
    logError(err, req, res, next);
  }
});

router.put("/:id", protectAdmin, async (req, res, next) => {
  logger.info(`Accessing route for updating a pizza - ${req.ip}`);
  try {
    let message = await update(req.params.id, req.body);
    res.json(message);
  } catch (err) {
    logError(err, req, res, next);
  }
});

router.delete("/:id", protectAdmin, async (req, res, next) => {
  logger.info(`Accessing route for deleting a pizza - ${req.ip}`);
  try {
    let message = await remove(req.params.id);
    res.json(message);
  } catch (err) {
    logError(err, req, res, next);
  }
});

export default router;
