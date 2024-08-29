import { getUser } from '../../api/userApi';
import React, { useState, useEffect } from 'react';
import { User } from '../../components/common/Table';
import { useDispatch } from 'react-redux';
import { setCurrentUserId } from '../../Redux/slice/chatCurrentUserSlice';

interface ChatBoxProps {
  id: string;
  role: string | undefined;
  isOnline: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ id, role, isOnline }) => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser(id, role);
      setUser(response.data);
    };
    fetchUser();
  }, [id, role]);

  const containerStyles = role === 'user'
    ? "flex items-center p-2 rounded-lg hover:bg-blue-300 cursor-pointer"
    : "flex items-center p-2 rounded-lg hover:bg-gray-600 cursor-pointer";

  const textStyles = role === 'user'
    ? "text-lg text-blue-800 font-medium hover:text-white"
    : "text-lg text-white font-medium";

  const imgContainerStyles = role === 'user'
    ? "w-10 h-10 rounded-full border border-blue-300 relative"
    : "w-10 h-10 rounded-full border border-gray-600 relative";

  const onlineIndicatorStyles = isOnline
    ? "absolute top-0 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
    : "hidden";
  return (
    <div
      className={containerStyles}
      onClick={() => dispatch(setCurrentUserId(id))}
      >
      {user && (
        <>
          <div className="relative">
            <img
              src={user.image}
              alt="User Profile"
              className={`${imgContainerStyles} object-cover mr-3`}
            />
            {isOnline && (
              <div className={onlineIndicatorStyles}></div>
            )}
          </div>
          <span className={textStyles}>{user.name}</span>
        </>
      )}
    </div>
  );
};

export default ChatBox;
