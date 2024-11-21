import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  phone: string;
  gender: string;
  createdAt: Date;
}

const userSchema: Schema<User> = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is Required Field"],
  },
  password: {
    type: String,
    required: [true, "Password is Required Field"],
  },
  age: {
    type: Number,
    required: [true, "Age is Required Field"],
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const userModel =
  mongoose.models.User || mongoose.model<User>("User", userSchema);

export default userModel;
