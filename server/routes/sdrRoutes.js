import express from "express";
import sdrSearch from "../controllers/sdrController.js";

const sdrRouter = express.Router();

sdrRouter.post("/", sdrSearch);

export default sdrRouter;
