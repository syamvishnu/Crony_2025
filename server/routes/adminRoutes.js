import express from "express";
import {
  deleteUser,
  getSearchLog,
  getUser,
  getUserLog,
} from "../controllers/adminController.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { dbUpdate } from "../controllers/dbUpdateController.js";
import { columnsName } from "../controllers/dbHeaderController.js";

const AdminRouter = express.Router();

AdminRouter.get("/getuser", getUser);
AdminRouter.delete("/deluser/:userid", deleteUser);
AdminRouter.get("/getuserlog", getUserLog);
AdminRouter.get("/getsearchlog", getSearchLog);
AdminRouter.post("/update", dbUpdate);
AdminRouter.post("/headers", columnsName);

export default AdminRouter;
