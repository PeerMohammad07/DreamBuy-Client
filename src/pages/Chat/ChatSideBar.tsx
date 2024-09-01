import { useState, useEffect, useRef } from "react";
import { AiFillMessage } from "react-icons/ai";
import ChatBox from "./ChatBox";
import { rootState } from "../../Redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Skeleton, Typography } from "@mui/material";
import { setCurrentUserId } from "../../Redux/slice/chatCurrentUserSlice";

export interface IConversation extends Document {
  senderId: string;
  receiverId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatSideBarProps {
  conversations: IConversation[];
  role: string | undefined;
  loading: boolean
  onlineUsers : any[]
}

const ChatSideBar: React.FC<ChatSideBarProps> = ({ conversations, role, loading ,onlineUsers}) => {
  const userData = role === 'user'
    ? useSelector((prevState: rootState) => prevState.user.userData)
    : role === 'seller'
      ? useSelector((prevState: rootState) => prevState.seller.sellerData)
      : null;


  const [conversationUsers, setConversationUsers] = useState<IConversation[] | []>([]);
  const containerRef = useRef(null);
  const dispatch = useDispatch()

  const alreadyMessagedUsers = conversationUsers.map((value) => {
    if (value.receiverId === userData?._id) {
      return value.senderId;
    } else {
      return value.receiverId;
    }
  });

  const userOnline = (id: string): boolean => {
    return onlineUsers.some(user => user.id === id);
  };

  useEffect(() => {
    setConversationUsers(conversations);
  }, [conversations]);

  const sidebarStyles = role === 'user'
    ? "bg-white text-blue-800 border "
    : "bg-gray-900 text-white";

  const textColor = role === 'user' ? "text-blue-800" : "text-white";

  return (
    <div className={`w-full lg:w-1/4 md:w-1/4 min-h-screen p-4 flex flex-col ${sidebarStyles}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className={`font-bold text-xl ${textColor}`}>Chats</h1>
        <AiFillMessage size={25} className={`text-gray-600`} />
      </div>
      <hr className="border-t border-gray-300 mb-4" />
      <div
        className="flex-1 overflow-y-auto space-y-2"
        ref={containerRef}
        style={{ maxHeight: "430px" }}
      >
        {alreadyMessagedUsers.length > 0 ? (
          alreadyMessagedUsers.map((id) => (
            <div key={id} onClick={() => {
              dispatch(setCurrentUserId(id))
            }}>
              <ChatBox id={id}  role={role} isOnline={userOnline(id)} />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No results found...</div>
        )}
        {loading && <div className="text-center text-gray-500"><Skeleton variant="circular">
          <Avatar />
        </Skeleton> <Skeleton width="100%">
            <Typography>.</Typography>
          </Skeleton></div>}
      </div>
    </div>
  );
};

export default ChatSideBar;
