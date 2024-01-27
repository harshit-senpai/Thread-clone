import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import userRoutes from "./Routes/UserRoutes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);

export default app;
