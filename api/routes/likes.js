import express from "express";
import { addLike, cancelLike, getLikes } from "../controllers/like.js";
const router = express.Router();

router.get("/", getLikes);
router.post("/", addLike);
router.delete("/:postId", cancelLike);

export default router;
