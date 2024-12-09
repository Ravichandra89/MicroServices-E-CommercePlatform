import mongoose, { Schema, Document } from "mongoose";

export interface Product extends Document {
  name: string;
  price: Number;
  descriptoin: string;
  category?: string;
  image?: string;
}

const productSchema: Schema<Product> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  descriptoin: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
});

const productModel =
  mongoose.models.Product || mongoose.model<Product>("Product", productSchema);

export default productModel;
