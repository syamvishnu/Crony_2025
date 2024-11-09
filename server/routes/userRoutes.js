import express from "express";
import { logoutUser, signinUser, signUpUser } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/signup", signUpUser);
userRouter.post("/", signinUser);
userRouter.post("/logout", logoutUser);

export default userRouter;
