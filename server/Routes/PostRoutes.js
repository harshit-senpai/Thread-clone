import express from "express";

import { createPost, getPost } from "./../Controllers/PostController.js";
import { protect } from "./../middlewares/protectedRoutes.js";

const router = express.Router();

router.post("/createPost", protect, createPost);
router.get("/:id", getPost);

export default router;
