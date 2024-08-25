import { useEffect, useState } from 'react';
import ChatSideBar from './ChatSideBar';
import { useExpandContext } from '../../Context/ExpandContext';
import ChatMessageContainer from './ChatMessageContainer';
import { useSelector } from 'react-redux';
import { rootState } from '../../Redux/store/store';
import { getConversation } from '../../api/chatApi';
import { User } from '../../Redux/slice/userAuthSlice';
import { SellerProfile } from '../../Redux/slice/sellerAuthSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useSocket } from '../../Context/SocketContext';
import { useMediaQuery } from '@mui/system';

export interface IcurrentUser {
  id: string;
  userData: User | SellerProfile | null;
}

export interface IonlineUsers {
  id: string;
  socketId: string;
}

const ChatPage = () => {
  const { role } = useParams<{ role: string }>();
  const { setExpanded } = useExpandContext();
  const [conversations, setConversation] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<IcurrentUser>({ id: '', userData: null });
  const { socket } = useSocket();
  const [onlineUsers, setOnlineUsers] = useState<IonlineUsers[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const userData = role === 'user'
    ? useSelector((prevState: rootState) => prevState.user.userData)
    : role === 'seller'
      ? useSelector((prevState: rootState) => prevState.seller.sellerData)
      : null;

  useEffect(()=>{
    if(!userData){
      navigate("/")
    }
  },[userData])

  const userOnline = (id: string): boolean => {
    return onlineUsers.some(user => user.id === id);
  };

  useEffect(() => {
    // Emit 'addUser' event after socket is connected
    if (socket && userData?._id) {
      socket.emit('addUser', userData._id);
    }
  }, [socket, userData]);

  

  useEffect(() => {
    if (socket) {
      const handleGetUser = (users: IonlineUsers[]) => {
        setOnlineUsers(users);
      };

      const handleRemoveUser = (users: IonlineUsers[]) => {
        setOnlineUsers(users);
      };

      socket.on('getUser', handleGetUser);
      socket.on('removeUser', handleRemoveUser);

      return () => {
        socket.off('getUser', handleGetUser);
        socket.off('removeUser', handleRemoveUser);
      };
    }
  }, [socket]);

  useEffect(() => {
    const fetchConversation = async () => {
      setLoading(true)
      if (userData?._id) {
        try {
          const response = await getConversation(userData._id);
          setConversation(response.data);
          setLoading(false)
        } catch (error) {
          console.error('Error fetching conversations:', error);
          setLoading(false)
        }
      }
    };
    fetchConversation();
  }, [userData]);

  useEffect(() => {
    setExpanded(false);
    return () => {
      setExpanded(true);
    };
  }, [setExpanded]);

  const matches = useMediaQuery('(max-width:768px)');
  
  return (
    <>
      {matches ? (
        <div className='flex h-screen'>
          {currentUser.id === '' ? (
            <ChatSideBar role={role} conversations={conversations} setCurrentUser={setCurrentUser} loading={loading}/>
          ) : (
            <ChatMessageContainer
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              isOnline={userOnline(currentUser.id)}
              role={role}
            />
          )}
        </div>
      ) : (
        <div className='flex h-screen'>
          <ChatSideBar role={role} conversations={conversations} setCurrentUser={setCurrentUser} loading={loading}/>
          <ChatMessageContainer
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            isOnline={userOnline(currentUser.id)}
            role={role}
          />
        </div>
      )}
    </>
  );
};

export default ChatPage;
