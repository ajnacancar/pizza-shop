import express from "express";
import dotenv from 'dotenv';

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import logger from "../logger.js";
import {create, getUserByEmail} from "../services/user.js";
import { logError } from "../middleware/errorMiddleware.js";

const router = express.Router();
dotenv.config();

function generateAccessToken(id) {
  return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET);
}

router.post("/register", async (req, res, next) => {
  logger.info(`Accessing register route - ${req.ip}`);
  try {
    let user = await create(req.body);
    if (user) {
      res.status(201).json({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        token: generateAccessToken(user.id),
      });
    }
  } catch (err) {
    logError(err, req, res, next);
  }
});


router.post("/login", async (req, res, next) => {
  logger.info(`Accessing login route - ${req.ip}`);
  let checkUser = await getUserByEmail(req.body.email);
  if (checkUser == null) {
    logger.error(
      `Invalid credientials. There is no user with that email address. - ${req.ip}`
    );
    return res.json({
      error: "Invalid credientials. There is no user with that email address.",
    });
  }

  if (await bcrypt.compare(req.body.password, checkUser.password)) {
    res.status(201).json({
      id: checkUser.id,
      first_name: checkUser.first_name,
      last_name: checkUser.last_name,
      username: checkUser.username,
      email: checkUser.email,
      is_admin: checkUser.is_admin,
      token: generateAccessToken(checkUser.id),
    });
    logger.info(
      `User successfully logged in. ${checkUser.username} - ${req.ip}`
    );
  } else {
    logger.error(`Invalid credientials. - ${req.ip}`);
    res.json({ error: "Invalid credientials" });
  }
});

export default router;
