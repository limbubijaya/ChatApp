import { useEffect, useRef, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import { formatMessageTime } from "../lib/util";
import authStore from "../store/authStore";
import chatStore from "../store/chatStore";
import { io } from "socket.io-client";

const socket = io();

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = chatStore();
  const { authUser } = authStore();
  const messageEndRef = useRef(null);
  const [typingUser, setTypingUser] = useState(null);
  const [typingTimeoutId, setTypingTimeoutId] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages.length) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const handleTyping = (data) => {
      if (data.userId !== authUser._id) {
        setTypingUser(data.userId);
      }
      if (typingTimeoutId) clearTimeout(typingTimeoutId);
      const timeoutId = setTimeout(() => setTypingUser(null), 3000);
      setTypingTimeoutId(timeoutId);
    };

    socket.on("typing", handleTyping);
    socket.on("stopTyping", () => setTypingUser(null));

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stopTyping");
      if (typingTimeoutId) clearTimeout(typingTimeoutId);
    };
  }, [authUser._id, typingTimeoutId]);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.senderId === authUser._id
                ? "justify-end"
                : "justify-start"
            }`}
            ref={messageEndRef}
          >
            <div
              className={`max-w-xs p-2 rounded-lg ${
                message.senderId === authUser._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              <div className="flex items-center">
                <div className="chat-image avatar mr-2">
                  <div className="w-10 h-10 overflow-hidden rounded-full">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="max-w-[200px] max-h-[150px] object-contain mb-2"
                      />
                    )}
                    {message.text && (
                      <p className="whitespace-pre-wrap break-words max-w-[200px]">
                        {message.text}
                      </p>
                    )}
                  </div>
                  <time className="text-xs opacity-50 mt-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
              </div>
            </div>
          </div>
        ))}
        {typingUser && typingUser !== authUser._id && (
          <p className="text-gray-500 italic">Typing...</p>
        )}
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatContainer;
