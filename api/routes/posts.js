import express from "express";
import { addPost, deletePost, getPosts, getPost } from "../controllers/post.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/:postId", getPost);
router.post("/", addPost);
router.delete("/:postId", deletePost);

export default router;
