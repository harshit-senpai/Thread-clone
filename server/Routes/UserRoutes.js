import express from "express";

import {
  signUp,
  SignIn,
  signOut,
  followUser,
  updateProfile,
  getUserProfile,
} from "../Controllers/UserController.js";
import protectedRoutes  from "./../middlewares/protectedRoutes.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", SignIn);
router.post("/signout", signOut);

router.post("/follow/:id", protectedRoutes, followUser);
router.put("/updateprofile/:id", protectedRoutes, updateProfile);

router.get("/profile/:username", getUserProfile);

export default router;
