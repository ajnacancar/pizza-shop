
import express, { json, urlencoded } from "express";
import logger  from "./logger.js";
import {protect} from "./middleware/authMiddleware.js";

import pizzaRouter from "./routes/pizza.js";
import categoryRouter from "./routes/pizza-category.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";
import addressRouter from "./routes/country-state-city.js";
import ratingRouter from "./routes/rating.js";

import dotenv from 'dotenv'
dotenv.config();

const app = express();

app.use(json());
app.use(urlencoded({extended: true}));

const port = 5000;
const ipAddress = process.env.IPADDRESS;

// default route
app.get("/", protect, (req, res) => {
  res.json({ user: req.user });
});

// use the routes that are defined in the routers
app.use("/pizza", pizzaRouter);
app.use("/category", categoryRouter);
app.use("/user", authRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/address", addressRouter);
app.use("/rating", ratingRouter);

// listen to the port, using ip address
app.listen(port, ipAddress, () => {
  logger.info(`Example app listening at port: ${port}`);
});

