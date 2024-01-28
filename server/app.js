import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./Routes/UserRoutes.js";
import postRoutes from "./Routes/PostRoutes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

export default app;
