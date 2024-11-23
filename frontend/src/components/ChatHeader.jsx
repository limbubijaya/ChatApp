import chatStore from "../store/chatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = chatStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">
            {selectedUser?.name || "Select a user"}
          </h3>
          <p className="text-sm text-base-content/70"></p>
        </div>
        <button onClick={() => setSelectedUser(null)} aria-label="Close chat">
          <p>X</p>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
