import express from "express";
import {
  getProductFromCart,
  addProductToCart,
  deleteProductFromCart,
  checkOut,
} from "../controller/cart.controller";

const cartRoute = express.Router();

// Route enteries
cartRoute.get("/", getProductFromCart);
cartRoute.post("/", addProductToCart);
cartRoute.delete("/:id", deleteProductFromCart);
cartRoute.post("/checkout", checkOut);

export default cartRoute;
