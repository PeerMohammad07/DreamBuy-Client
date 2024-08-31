import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/layouts/seller/SellerSidebar';
import { useExpandContext } from '../../Context/ExpandContext';
import ChatBot from '../../components/common/ChatBot';
import { useSocket } from '../../Context/SocketContext';
import { rootState } from '../../Redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import notificationSound from "../../assets/notificationSound/frontend_src_assets_sounds_notification.mp3"
import { IonlineUsers } from '../Chat/ChatPage';
import { setCurrentUserId, setOnlineUsers } from '../../Redux/slice/chatCurrentUserSlice';
import Notification from '../../components/common/notificationComponent';

const Mainpage: React.FC = () => {
  const {expanded} = useExpandContext()
  const location = useLocation()
  const dispatch = useDispatch()
  const {socket}  = useSocket()
  const userData = useSelector((rootState:rootState)=> rootState.seller.sellerData)
  const currentUserId = useSelector((rootState:rootState)=> rootState.chat.id)
  const [notification, setNotification] = useState<string | null>(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState<boolean>(false);
  const [notificationSenderId,setNotificationSenderId] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    if (socket && userData?._id) {
      socket.emit('addUser', userData._id);
    }
  }, [socket, userData]);


  useEffect(() => {
    socket.on('notification', (name: string,senderId:string) => {   
      setNotificationSenderId(senderId)   
      const sound = new Audio(notificationSound); 
      sound.play();
      if ( currentUserId!=senderId && !isNotificationVisible) {
        setNotification(`You got a message from ${name}`);
        setIsNotificationVisible(true);
      }
    });

    return () => {
      socket.off('notification');
    };
  }, [isNotificationVisible,currentUserId]);

  const handleNotificationClick = () => {
    dispatch(setCurrentUserId(notificationSenderId))
    setNotification(null);
    setIsNotificationVisible(false);
    navigate("/seller/chat/seller")
  };

  const handleClose = () => {
    setNotification(null);
    setIsNotificationVisible(false);
  };

  useEffect(() => {
    if (socket) {
      const handleGetUser = (users: IonlineUsers[]) => {
        dispatch(setOnlineUsers(users))
      };

      const handleRemoveUser = (users: IonlineUsers[]) => {
        dispatch(setOnlineUsers(users))
      };

      socket.on('getUser', handleGetUser);
      socket.on('removeUser', handleRemoveUser);

      return () => {
        socket.off('getUser', handleGetUser);
        socket.off('removeUser', handleRemoveUser);
      };
    }
  }, [socket]);

  return (
    <>
    {isNotificationVisible && notification && (
        <Notification 
          message={notification}
          onClose={handleClose}
          onClick={handleNotificationClick}
        />
      )}
      <div className="flex">
        <SellerSidebar />
        <div className={`flex-grow bg-gray-900 ${expanded ? 'ml-72':'ml-14'} overflow-auto`}>
          <Outlet />
        </div>
        {location.pathname != "/seller/chat/seller" && <ChatBot/>}
      </div>
    </>
  );
};

export default Mainpage;
