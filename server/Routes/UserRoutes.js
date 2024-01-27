import express from "express";

import { signUp, SignIn, signOut } from "../Controllers/UserController.js";
import { protect } from "../middlewares/protectedRoutes.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", SignIn);
router.post("/signout", signOut);

router.post("/follow/:id", protect);

export default router;
