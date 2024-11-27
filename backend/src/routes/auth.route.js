const express = require("express");
const {
  login,
  signup,
  logout,
  checkUser,
  verifyToken,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", verifyToken, checkUser);

module.exports = router;
