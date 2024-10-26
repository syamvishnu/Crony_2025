import express from "express";
import { signinUser, signUpUser } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/signup", signUpUser);
userRouter.post("/", signinUser);
export default userRouter;
