import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import userLoginActivity from "./middleware/userLogMiddleware.js";
import sdrRouter from "./routes/sdrRoutes.js";
import sdrSearchActivity from "./middleware/sdrLogMiddleware.js";
import AdminRouter from "./routes/adminRoutes.js";
import { isAdmin } from "./middleware/adminMiddleware.js";
dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.use("/api/auth", userLoginActivity, userRouter);
app.use("/api/sdr", sdrSearchActivity, sdrRouter);
app.use("/api/admin", isAdmin, AdminRouter);

const PORT = process.env.PORT || 5000;

app.use(cors);

connectDB();

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
