import React, { useState, useEffect, useRef } from "react";
import { AiFillMessage } from "react-icons/ai";
import { TbUserSearch } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa"; 

const ChatSideBar = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

    const newUsers = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
      { id: 4, name: "Asna" },
      { id: 5, name: "Peeru" },
      { id: 5, name: "Sahad" },

    ];


  const filteredUsers = newUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-900 w-1/4 min-h-screen p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-white text-xl">Chats</h1>
        <AiFillMessage size={25} className="text-gray-600" />
      </div>
      <hr className="border-t border-gray-300 mb-4" />
      <div className="relative flex items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users"
          className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <TbUserSearch size={22} className="absolute left-3 text-gray-500" />
      </div>
      <div
        className="flex-1 overflow-y-auto space-y-2"
        ref={containerRef}
        style={{ maxHeight: "430px" }}
      >
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
            >
              <FaUserCircle size={40} className="text-gray-400 mr-3" />
              <span className="text-lg text-white font-medium">{user.name}</span>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No results found...</div>
        )}
        {loading && <div className="text-center text-gray-500">Loading...</div>}
      </div>
    </div>
  );
};

export default ChatSideBar;
