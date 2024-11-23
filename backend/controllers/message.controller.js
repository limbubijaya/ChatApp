const Message = require("../model/messageModel");
const cloudinary = require("../lib/cloudinary");
const User = require("../model/userModel");
const { getReceiverSocketId, io } = require("../lib/socket");

const getSideBarUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const allUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error in getSideBarUsers: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: receiverId, receiverId: loggedInUserId },
        { senderId: loggedInUserId, receiverId: receiverId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getChatHistory: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { text, image } = req.body;

    let imageUrl;
    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadImage.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getSideBarUsers, getChatHistory, sendMessage };
