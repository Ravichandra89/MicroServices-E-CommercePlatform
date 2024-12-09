import {Router} from "express";
import {getProduct, createProduct} from "../controller/product.controller";
import { create } from "domain";

const productRoute = Router();

productRoute.get("/", getProduct);
productRoute.get("/create", createProduct);

export default productRoute;
