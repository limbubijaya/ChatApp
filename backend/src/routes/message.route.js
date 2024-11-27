import express from "express";
import { verifyToken } from "../controllers/auth.controller.js";
import {
  getSideBarUsers,
  getChatHistory,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/user", verifyToken, getSideBarUsers);
router.get("/:id", verifyToken, getChatHistory);
router.post("/send/:id", verifyToken, sendMessage);

export default router;
