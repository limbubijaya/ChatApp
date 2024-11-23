import React from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import DefaultContainer from "../components/DefaultContainer";
import chatStore from "../store/chatStore";

const Homepage = () => {
  const { selectedUser } = chatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)] bg-white">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <DefaultContainer /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
