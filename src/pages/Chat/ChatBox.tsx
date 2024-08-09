import { getUser } from '../../api/userApi';
import React, { useState, useEffect } from 'react';
import { User } from '../../components/common/Table';
import { IcurrentUser } from './ChatPage';

interface ChatBoxProps {
  id: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<IcurrentUser>>;
  role: string | undefined;
}

const ChatBox: React.FC<ChatBoxProps> = ({ id, setCurrentUser, role  }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser(id,role);
      console.log(response,"chat box user data fetched ")
      setUser(response.data);
    };
    fetchUser();
  }, [id]);

  // Define color schemes and styles based on the role
  const containerStyles = role == 'user'
    ? "flex items-center p-2 rounded-lg hover:bg-blue-300 cursor-pointer"
    : "flex items-center p-2 rounded-lg hover:bg-gray-600 cursor-pointer";

  const textStyles = role == 'user'
    ? "text-lg text-blue-800 font-medium hover:text-white"
    : "text-lg text-white font-medium";

  const imgContainerStyles = role === 'user'
    ? "w-10 h-10 rounded-full border border-blue-300"
    : "w-10 h-10 rounded-full border border-gray-600";


  return (
    <div
      className={containerStyles}
      onClick={() => setCurrentUser(prevState => ({ ...prevState, id }))}
    >
      {user && (
        <>
          <img
            src={user.image}
            alt="User Profile"
            className={`${imgContainerStyles} object-cover mr-3`}
          />
          <span className={textStyles}>{user.name}</span>
        </>
      )}
    </div>
  );
};

export default ChatBox;
