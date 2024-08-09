import { useState, useEffect, useRef } from "react";
import { AiFillMessage } from "react-icons/ai";
import { TbUserSearch } from "react-icons/tb";
import ChatBox from "./ChatBox";
import { rootState } from "../../Redux/store/store";
import { useSelector } from "react-redux";
import { IcurrentUser } from "./ChatPage";

export interface IConversation extends Document {
  senderId: string;
  receiverId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatSideBarProps {
  conversations: IConversation[];
  setCurrentUser: React.Dispatch<React.SetStateAction<IcurrentUser>>;
  role: string | undefined;
}

const ChatSideBar: React.FC<ChatSideBarProps> = ({ conversations, setCurrentUser, role }) => {
  const userData = role === 'user'
    ? useSelector((prevState: rootState) => prevState.user.userData)
    : role === 'seller'
      ? useSelector((prevState: rootState) => prevState.seller.sellerData)
      : null;

  const [search, setSearch] = useState("");
  const [conversationUsers, setConversationUsers] = useState<IConversation[] | []>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const alreadyMessagedUsers = conversationUsers.map((value) => {
    if (value.receiverId === userData?._id) {
      return value.senderId;
    } else {
      return value.receiverId;
    }
  });


  useEffect(() => {
    setLoading(true)
    setConversationUsers(conversations);
    setLoading(false)
  }, [conversations]);

  // Define color schemes based on the role
  const sidebarStyles = role === 'user'
    ? "bg-white text-blue-800 border "
    : "bg-gray-900 text-white";

  const inputStyles = role === 'user'
    ? "pl-10 pr-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    : "pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const textColor = role === 'user' ? "text-blue-800" : "text-white";

  return (
    <div className={`w-full lg:w-1/4 md:w-1/4 min-h-screen p-4 flex flex-col ${sidebarStyles}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className={`font-bold text-xl ${textColor}`}>Chats</h1>
        <AiFillMessage size={25} className={`text-gray-600`} />
      </div>
      <hr className="border-t border-gray-300 mb-4" />
      {/* <div className="relative flex items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users"
          className={inputStyles}
        />
        <TbUserSearch size={22} className={`absolute left-3 ${textColor}`} />
      </div> */}
      <div
        className="flex-1 overflow-y-auto space-y-2"
        ref={containerRef}
        style={{ maxHeight: "430px" }}
      >
        {alreadyMessagedUsers.length > 0 ? (
          alreadyMessagedUsers.map((id) => (
            <div key={id} onClick={() => {
              setCurrentUser((prevState: IcurrentUser) => ({
                ...prevState,
                id: id
              }));
            }}>
              <ChatBox id={id} setCurrentUser={setCurrentUser} role={role} />
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
