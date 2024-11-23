const express = require("express");
const { verifyToken } = require("../controllers/auth.controller");
const {
  getSideBarUsers,
  getChatHistory,
  sendMessage,
} = require("../controllers/message.controller");

const router = express.Router();

router.get("/user", verifyToken, getSideBarUsers);
router.get("/:id", verifyToken, getChatHistory);
router.post("/send/:id", verifyToken, sendMessage);

module.exports = router;
