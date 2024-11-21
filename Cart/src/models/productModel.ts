import mongoose, { Schema, Document } from "mongoose";

export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

const productSchema: Schema<Product> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Image from cloudinary
  },
});


const produtModel = mongoose.models.Product || mongoose.model<Product>("Product", productSchema);