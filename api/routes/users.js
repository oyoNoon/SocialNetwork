import express from "express";
import { getUser, updateUser, getSuggestions, getLatestActivities, getUserStats } from "../controllers/user.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/", updateUser);
router.get("/suggestions", getSuggestions);
router.get("/activities", getLatestActivities);
router.get("/stats/:userId", getUserStats);

export default router;
