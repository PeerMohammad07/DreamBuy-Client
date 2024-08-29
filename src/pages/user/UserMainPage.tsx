import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../../components/layouts/user/Navbar'
import Footer from '../../components/layouts/user/Footer'
import ChatBot from '../../components/common/ChatBot'
import { useSocket } from '../../Context/SocketContext'
import { useDispatch, useSelector } from 'react-redux'
import { rootState } from '../../Redux/store/store'
import { useEffect, useState } from 'react'
import notificationsound from "../../assets/notificationSound/frontend_src_assets_sounds_notification.mp3"
import { setCurrentUserId, setOnlineUsers } from '../../Redux/slice/chatCurrentUserSlice'
import { IonlineUsers } from '../Chat/ChatPage'
import Notification from '../../components/common/notificationComponent'

const UserMainPage = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { socket } = useSocket()
  const navigate = useNavigate()
  const userData = useSelector((rootState: rootState) => rootState.user.userData)
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationSenderId,setNotificationSenderId] = useState<string>('')
  const [isNotificationVisible, setIsNotificationVisible] = useState<boolean>(false);
  const currentUserId = useSelector((rootState:rootState)=> rootState.chat.id)


  useEffect(() => {
    if (socket && userData?._id) {
      socket.emit('addUser', userData._id);
    }
  }, [socket, userData]);


  useEffect(() => {
    socket.on('notification', (name: string,senderId:string) => {  
      setNotificationSenderId(senderId)    
      const sound = new Audio(notificationsound);
      sound.play();
      
      if (!isNotificationVisible&&currentUserId!=senderId) {
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
    navigate('/chat/user')
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
      <Navbar />
      <Outlet />
      {location.pathname == "/chat/user" || location.pathname == "/homes/" || location.pathname == "/homes/sale" || location.pathname == "/homes/rent" ? <></> : <Footer />}
      {location.pathname != "/chat/user" && <ChatBot />}
    </>
  )
}

export default UserMainPage
