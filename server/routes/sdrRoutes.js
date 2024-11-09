import express from "express";
import sdrSearch from "../controllers/sdrController.js";
import { reverseSearch } from "../controllers/reverseController.js";

const sdrRouter = express.Router();

sdrRouter.post("/", sdrSearch);
sdrRouter.post("/keyword", reverseSearch);


export default sdrRouter;
