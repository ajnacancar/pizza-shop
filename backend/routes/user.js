import express from "express";
import logger from "../logger.js";

import {protectAdmin} from "../middleware/authMiddleware.js";
import {logError} from "../middleware/errorMiddleware.js"

import {getAll, getUserById, deleteUser, update} from "../services/user.js";

const router = express.Router();

router.get("/", protectAdmin, async (req, res, next) => {
  logger.info(`Accessing route for getting all users - ${req.ip}`);
  try {
    let users = await getAll();
    res.json(users);
  } catch (err) {
    logError(err, req, res, next);
  }
});


router.get("/:id", protectAdmin, async (req, res, next) => {
  logger.info(`Accessing route for getting user by id - ${req.ip}`);
  try {
    let user = await getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    logError(err, req, res, next);
  }
});

router.delete("/:id", protectAdmin, async (req, res, next) => {
  logger.info(`Accessing route for deleting user by id - ${req.ip}`);
  try {
    res.json(await deleteUser(req.params.id));
  } catch (err) {
    logError(err, req, res, next);
  }
});

router.put("/:id", protectAdmin, async (req, res, next) => {
  logger.info(`Accessing route for updating user by id - ${req.ip}`);
  try {
    let updatedUser = {
      id: req.params.id,
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      is_admin: req.body.is_admin,
    };
    res.json(await update(updatedUser));
  } catch (err) {
    logError(err, req, res, next);
  }
});

export default router;
