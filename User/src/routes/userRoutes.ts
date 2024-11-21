import express from "express";
import {
  getUser,
  userRegister,
  userLogin,
} from "../controllers/userController";
import validateToken from "../middlewares/validateToken";

// Make the router
const userRouter = express.Router();

userRouter.route("/").post(userRegister);
userRouter.route("/login").post(userLogin);

userRouter.route("/").get(validateToken, getUser);

export default userRouter;
