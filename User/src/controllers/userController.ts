import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import dotenv from "dotenv";
import { apiResponse } from "../utils/apiResponse";

dotenv.config();

const getUser = async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return apiResponse(res, 404, false, "User not found");
    }

    if (!user) {
      return apiResponse(res, 401, false, "User not found");
    }

    apiResponse(res, 200, true, "User fetched successfully", user);
  } catch (error) {
    console.error("Error while fetching user", error);
    apiResponse(res, 500, false, "Error while fetching user");
  }
};

const userRegister = async (req : any , res : any) => {
  try {
    const { firstName, lastName, email, password, age, phone, gender } =
      req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const userCheck = await userModel.findOne({ email });

    if (userCheck) {
      return apiResponse(res, 400, false, "Email already exists");
    }

    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      age,
      phone,
      gender,
    });

    apiResponse(res, 201, true, "User registered successfully!", {
      id: user.id,
    });
  } catch (error) {
    console.error("Error while registering user", error);
    apiResponse(res, 500, false, "Error while registering user");
  }
};

// Login Function
const userLogin = async (req : any, res : any) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const Token = process.env.SECRET_TOKEN;

    if (!Token) {
      console.error("SECRET_TOKEN is not defined");
      return apiResponse(res, 500, false, "Internal server error");
    }

    if (!user) {
      return apiResponse(res, 401, false, "User not found");
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return apiResponse(res, 401, false, "Invalid password");
    }

    const accessToken = jwt.sign(
      {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
          phone: user.phone,
          gender: user.gender,
        },
      },
      Token,
      { expiresIn: "5m" }
    );

    return apiResponse(res, 200, true, "Login successful", { accessToken });
  } catch (error) {
    console.error("Error while login user", error);
    return apiResponse(res, 500, false, "Error While Login User");
  }
};

export { getUser, userRegister, userLogin };
