import express from "express"
import logger from "../logger.js"

import {protect, protectAdmin} from "../middleware/authMiddleware.js";
import {logError} from "../middleware/errorMiddleware.js";

import {create, getAll, getAllOrdersForUser, getOrderById, deleteOrder, update } from "../services/order.js";

const router = express.Router();

router.post("/", protect, async function (req, res, next) {
  logger.info(`Accessing route for creating a new order - ${req.user.id} ${req.ip}`);
  try {
    res.json(await create(req.user.id, req.body));
  } catch (err) {
    logError(err, req, res, next);
  }
});

router.get("/userOrders", protect, async (req, res, next) => {
  logger.info(`Accessing route for getting all orders for a logged in user - ${req.user.id} ${req.ip}`);
  try {
    let ordersForLoggedInUser = await getAllOrdersForUser(req.user.id);
    if (!ordersForLoggedInUser) {res.json([])} 
    else {res.json(ordersForLoggedInUser)}
  } catch (err) {
    logError(err, req, res, next);
  }
});

router.get("/:id", protect, async (req, res, next) => {
  logger.info(`Accessing route for getting order by id - ${req.ip}`);
  try {
    let order = await getOrderById(req.params.id);
    res.json(order);
  } catch (err) {
    logError(err, req, res, next);
  }
});

router.get("/", protectAdmin, async (req, res, next) => {
  logger.info(`Accessing route for getting all orders - ${req.ip}`);
  try {
    let orders = await getAll();
    res.json(orders);
  } catch (err) {
    logError(err, req, res, next);
  }
});

router.delete("/:id", protectAdmin, async (req, res, next) => {
  logger.info(`Accessing route for deleting order by id - ${req.ip}`);
  try {
    let message = await deleteOrder(req.params.id);
    res.json(message);
  } catch (err) {
    logError(err, req, res, next);
  }
});

router.put("/:id", protectAdmin, async (req, res, next) => {
  logger.info(`Accessing route for updating order by id - ${req.ip}`);
  try {
    let message = await update(req.params.id, req.body.status);
    res.json(message);
  } catch (err) {
    logError(err, req, res, next);
  }
});

export default router;
