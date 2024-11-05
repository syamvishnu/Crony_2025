import express from "express";
import { getUser } from "../controllers/adminController.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const AdminRouter = express.Router();

AdminRouter.get("/getuser", getUser);

export default AdminRouter;
