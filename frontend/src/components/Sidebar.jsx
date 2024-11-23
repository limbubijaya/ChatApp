import React, { useEffect } from "react";
import chatStore from "../store/chatStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser } = chatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-2 flex items-center justify-center">
        <span className="font-medium text-center text-xl">Contacts</span>
      </div>

      <div className="overflow-y-auto w-full">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center border-b-2 border-grey-200 hover:bg-cyan-200 transition-colors ${
              selectedUser?._id === user._id ? "bg-blue-400" : ""
            }`}
          >
            <div className="flex-grow text-left min-w-0">
              <div className="font-medium">{user.name}</div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
