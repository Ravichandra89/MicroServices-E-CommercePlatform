import productModel from "../models/productModel";
import { Request, Response } from "express";

const getProduct = async (req: Request, res: Response) => {
    
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating new product", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export { createProduct, getProduct };
