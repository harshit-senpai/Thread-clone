import express from "express";

import {
  createPost,
  createReply,
  deletePost,
  getFeed,
  getPost,
  likeUnlike,
} from "./../Controllers/PostController.js";
import protectedRoutes from "./../middlewares/protectedRoutes.js";

const router = express.Router();

router.post("/feed", protectedRoutes, getFeed);
router.post("/createPost", protectedRoutes, createPost);
router.get("/:id", getPost);
router.delete("/:id", protectedRoutes, deletePost);
router.post("/like/:id", protectedRoutes, likeUnlike);
router.post("/reply/:id", protectedRoutes, createReply);

export default router;
