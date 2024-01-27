import express from "express";

import { signUp } from "../Controllers/UserController.js";

const router = express.Router();

router.post("/signup", signUp);

export default router;
