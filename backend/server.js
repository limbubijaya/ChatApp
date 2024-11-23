const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./lib/db");
const authRoutes = require("./routes/auth.route");
const messageRoutes = require("./routes/message.route");
const cookieParser = require("cookie-parser");
const { app, server } = require("./lib/socket");

dotenv.config();

app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ limit: "1000mb", extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("server started on port");
  connectDB();
});
