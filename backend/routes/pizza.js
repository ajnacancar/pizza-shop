import express from "express";
import logger from "../logger.js";

import {protect, protectAdmin}   from "../middleware/authMiddleware.js";
import {logError}   from "../middleware/errorMiddleware.js";
import {getAll, getNewest, search, get, getByCategory, create, update, remove } from "../services/pizza.js"


const router = express.Router();


router.get("/", async function (req, res) {
  logger.info(`Accessing route for getting all pizzas - ${req.ip}`);
  try {
    let products = await getAll();
    if (req.query.search !== "" || req.query.search !== undefined) {
      products = await search(req.query.search);
    }
    res.json(products);
  } catch (err) {
    logError(err);
  }
});

router.get("/new", async function (req, res) {
  logger.info(`Accessing route for getting newest pizzas - ${req.ip}`);
  try {
    let products = await getNewest(req.query.num);
    res.json(products);
  } catch (err) {
    logError(err);
  }
});

router.get("/:id", async function (req, res) {
  logger.info(`Accessing route for getting pizza by id - ${req.ip}`);
  try {
    let product = await get(req.params.id);
    res.json(product);
  } catch (err) {
    logError(err);
  }
});

router.get("/category/:id", async function (req, res) {
  logger.info(`Accessing route for getting pizzas by category - ${req.ip}`);
  try {
    let products = await getByCategory(req.params.id);
    res.json(products);
  } catch (err) {
    logError(err);
  }
});

router.post("/", protectAdmin, async function (req, res) {
  logger.info(`Accessing route for adding new pizza - ${req.ip}`);
  try {
    let message = await create(req.body);
    res.json(message);
  } catch (err) {
    logError(err);
  }
});

router.put("/:id", protectAdmin, async function (req, res) {
  logger.info(`Accessing route for updating a pizza - ${req.ip}`);
  try {
    let message = await update(req.params.id, req.body);
    res.json(message);
  } catch (err) {
    logError(err);
  }
});

router.delete("/:id", protectAdmin, async function (req, res) {
  logger.info(`Accessing route for deleting a pizza - ${req.ip}`);
  try {
    let message = await remove(req.params.id);
    res.json(message);
  } catch (err) {
    logError(err);
  }
});

export default router;
