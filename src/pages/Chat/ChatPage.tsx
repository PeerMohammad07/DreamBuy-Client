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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const userData = role === 'user'
    ? useSelector((prevState: rootState) => prevState.user.userData)
    : role === 'seller'
      ? useSelector((prevState: rootState) => prevState.seller.sellerData)
      : null;
  

  const onlineUsers = useSelector((prevState: rootState)=> prevState.chat.onlineUsers)
  const currentUserId = useSelector((prevState: rootState)=> prevState.chat.id)

  useEffect(()=>{
    if(!userData){
      navigate("/")
    }
  },[userData])

  const userOnline = (id: string): boolean => {
    return onlineUsers.some(user => user.id === id);
  };


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
          {currentUserId === '' ? (
            <ChatSideBar role={role} onlineUsers={onlineUsers} conversations={conversations} loading={loading}/>
          ) : (
            <ChatMessageContainer
              isOnline={userOnline(currentUserId)}
              role={role}
            />
          )}
        </div>
      ) : (
        <div className='flex h-screen'>
          <ChatSideBar role={role} onlineUsers={onlineUsers} conversations={conversations} loading={loading}/>
          <ChatMessageContainer
            isOnline={userOnline(currentUserId)}
            role={role}
          />
        </div>
      )}
    </>
  );
};

export default ChatPage;
