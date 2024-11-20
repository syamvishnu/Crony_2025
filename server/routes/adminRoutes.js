import express from "express";
import {
  deleteUser,
  getSearchLog,
  getUser,
  getUserLog,
} from "../controllers/adminController.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const AdminRouter = express.Router();

AdminRouter.get("/getuser", getUser);
AdminRouter.delete("/deluser/:userid", deleteUser);
AdminRouter.get("/getuserlog", getUserLog);
AdminRouter.get("/getsearchlog", getSearchLog);

export default AdminRouter;
