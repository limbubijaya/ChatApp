import express from "express";
import {
  login,
  signup,
  logout,
  checkUser,
  verifyToken,
} from "../controllers/auth.controller.js"; 

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", verifyToken, checkUser);

export default router; 
