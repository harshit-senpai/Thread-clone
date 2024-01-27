import express from "express";

import { signUp, SignIn, signOut } from "../Controllers/UserController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", SignIn);
router.post("/signout", signOut);

export default router;
