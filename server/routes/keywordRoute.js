import express from "express";
import { reverseSearch } from "../controllers/reverseController.js";

const keywordRoute = express.Router();

  keywordRoute.post("/", reverseSearch);


export default keywordRoute;
