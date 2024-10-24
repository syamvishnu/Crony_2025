import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";

import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/", userRouter);

const PORT = process.env.PORT || 5000;

app.use(cors);

connectDB();

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
