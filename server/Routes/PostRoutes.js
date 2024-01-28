import express from "express";

import {
  createPost,
  createReply,
  deletePost,
  getFeed,
  getPost,
  likeUnlike,
} from "./../Controllers/PostController.js";
import { protect } from "./../middlewares/protectedRoutes.js";

const router = express.Router();

router.post("/feed", protect, getFeed);
router.post("/createPost", protect, createPost);
router.get("/:id", getPost);
router.delete("/:id", protect, deletePost);
router.post("/like/:id", protect, likeUnlike);
router.post("/reply/:id", protect, createReply);

export default router;
