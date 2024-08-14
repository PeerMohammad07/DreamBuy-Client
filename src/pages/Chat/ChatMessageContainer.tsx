import React, { useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { BiSolidMessageDots } from "react-icons/bi";
import { IoVideocam } from "react-icons/io5";
import { LuSendHorizonal } from "react-icons/lu";
import { useSelector } from "react-redux";
import { rootState } from "../../Redux/store/store";
import { getMessages, sendMessage, uploadChatFile } from "../../api/chatApi";
import { IcurrentUser } from "./ChatPage";
import { getUser } from "../../api/userApi";
import { useSocket } from "../../Context/SocketContext";
import { SlOptionsVertical } from "react-icons/sl";
import { BackgroundBeams } from "../../components/aceternity/Background";
import Message from "./Message";
import MyDropzone from "./DropZone";
import { FaArrowLeft } from "react-icons/fa6";
import notificationSound from "../../assets/notificationSound/frontend_src_assets_sounds_notification.mp3"
import { toast } from "react-toastify";
import { LineWave } from "react-loader-spinner";
import { IoClose } from "react-icons/io5";


interface ChatMessageContainerProps {
  currentUser: IcurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<IcurrentUser>>;
  role: string | undefined;
  isOnline: boolean
}

export interface Imessage {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  conversationId: string;
  message: string;
  senderId: string;
}

export interface file {
  name: string
  type: string
  path: string
}

const ChatMessageContainer: React.FC<ChatMessageContainerProps> = ({
  currentUser,
  setCurrentUser,
  role,
  isOnline
}) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Imessage[] | []>([]);
  const [loading, setLoading] = useState(false)
  const [sendFileLoading, setSendFileLoading] = useState(false)
  const [preview, setPreview] = useState<string[]>([])
  const [file, setFile] = useState<File[]>([]);
  const [activePreview, setActivePreview] = useState(preview[0]);
  const { socket } = useSocket()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [noti, setNoti] = useState<Imessage[] | []>([])

  const userData =
    role === "user"
      ? useSelector((prevState: rootState) => prevState.user.userData)
      : role === "seller"
        ? useSelector((prevState: rootState) => prevState.seller.sellerData)
        : null;



  async function handleOnEnter(text: string) {
    if (file.length > 0 && userData) {
      const videos = file.filter((fil) => fil.type === 'video/mp4');
      const images = file.filter((fil) => fil.type.startsWith('image/'));

      if (videos.length > 1) {
        toast.error('You can only upload one video at a time.');
        return;
      }

      if (videos.length > 0 && images.length > 0) {
        toast.error('You cannot upload both images and videos together.');
        return;
      }

      setSendFileLoading(true)
      let formData = new FormData();
      file.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('senderId', userData?._id)
      formData.append('recieverId', currentUser.id)
      const response = await uploadChatFile(formData)
      if (!Array.isArray(response.data.data) && response.data.data.message.endsWith('.mp4')) {
        setMessages((prevState) => [...prevState, response.data.data])
        setSendFileLoading(false)
        setPreview([])
        setFile([])
      } else if (response.data.status) {
        response.data.data.map((msg: any) => {
          setMessages((prevState) => [...prevState, msg])
        })
        console.log("vanmn")
        setSendFileLoading(false)
        setPreview([])
        setFile([])
      } else {
        setSendFileLoading(false)
        toast.error(response.data.message)
      }
    }
    if (text.trim() == "" || text == "") {
      return;
    }
    if (userData) {
      const response = await sendMessage(userData?._id, currentUser.id, text);
      setMessages([...messages, response.data])
      socket.emit('message', response.data, currentUser.id)
      setText("")
    }
  }

  useEffect(() => {
    const handleMessageContent = (message: Imessage) => {
      if (message.senderId === currentUser.id || message.senderId === userData?._id) {
        const sound = new Audio(notificationSound)
        sound.play()
        setMessages((prevMessages) => [...prevMessages, message]);
      } else {
        setNoti([message, ...noti])
      }
    };

    socket.on('messageContent', handleMessageContent);

    return () => {
      socket.off('messageContent', handleMessageContent);
    };
  }, [currentUser.id, userData?._id, socket]);


  useEffect(() => {
    const getCurrentUserdata = async () => {
      if (currentUser && currentUser.id) {
        setLoading(true)
        const currUser = await getUser(currentUser.id, role);
        const messages = await getMessages(userData?._id, currUser.data._id);
        setCurrentUser((prevState: IcurrentUser) => ({
          ...prevState,
          userData: currUser.data,
        }));
        setMessages(messages.data);
        setLoading(false)
      }
    };
    getCurrentUserdata();
  }, [currentUser.id, userData, role]);


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])


  return (
    <>
      <div className="flex flex-grow h-full xl:flex flex-col bg-gray-100" >
        {currentUser.userData ? (
          <>
            <div className={`flex flex-col h-screen ${role == "user" ? "bg-white" : "bg-gray-900"}`}>
              {/* Header */}
              <div className={`flex justify-between items-center p-3 ${role == "user" ? "bg-gray-100" : "bg-gray-900"}`}>
                <div className="flex items-center">
                  <FaArrowLeft
                    onClick={() => {
                      setCurrentUser(() => ({
                        id: '',
                        userData: null,
                      }))
                    }}
                    className={`${role == "seller" ? "text-white" : ""} xl:hidden lg:hidden md:hidden me-2`}
                    size={18}
                  />
                  <img
                    src={currentUser.userData.image}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h1 className={`${role == "user" ? "text-black" : "text-white"} font-bold`}>{currentUser.userData.name}</h1>
                    {isOnline ? <span className="text-green-500 text-sm">Online</span> : <span className="text-sm text-gray-400">offline</span>}
                  </div>
                </div>
                <div className="flex me-5 justify-center items-center">
                  <IoVideocam size={30} className={`${role == "user" ? "" : "text-white"} me-5`} />
                  <SlOptionsVertical size={23} className={`${role == "user" ? "" : "text-white"} `} />
                </div>
              </div>

              {/* Chat Messages Container */}
              {<div
                className="flex-grow p-4 overflow-y-auto"
                style={{
                  backgroundImage: role === "seller" ? 'url(/floating-cogs.svg)' : 'none',
                  backgroundPosition: 'center',
                }}
              >
                {messages.map((message: Imessage) => (
                  <Message
                    key={message._id}
                    message={message}
                    isSender={message.senderId === userData?._id}
                    userImage={message.senderId === userData?._id ? userData?.image : currentUser.userData?.image}
                    userName={currentUser.userData?.name}
                    role={role}
                  />
                ))}
                <div ref={scrollRef} />
              </div>}

              {/* Image preview Section */}
              {sendFileLoading ?
                <>
                  <div
                    className="mb-1  absolute flex gap-1 overflow-x-auto"
                    style={{ bottom: role === "seller" ? '85px' : '30px' }}
                  >
                    <LineWave
                      visible={true}
                      height="100"
                      width="100"
                      color="#4fa94d"
                      ariaLabel="line-wave-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      firstLineColor=""
                      middleLineColor=""
                      lastLineColor=""
                    />
                  </div>
                </>
                : <div
                  className="mb-1 absolute flex gap-1 overflow-x-auto"
                  style={{ bottom: role === "seller" ? '85px' : '30px' }}
                >
                  {preview.map((item, index) => (
                    <>
                      <div
                        key={index}
                        onClick={() => setActivePreview(item)}
                        className={`flex-shrink-0 cursor-pointer border ${activePreview === item ? 'border-blue-500' : 'border-gray-500'} rounded-lg overflow-hidden`}
                      >
                        {item.startsWith('data:video') ? (
                          <video className="rounded-lg h-36" controls>
                            <source src={item} type="video/mp4" />
                          </video>
                        ) : (
                          <>
                            <img src={item} alt={`Thumbnail-${index}`} className="h-36 w-36 object-cover rounded-lg" />
                          </>
                        )}
                      </div>
                    </>
                  ))}
                </div>}

              {/* Background Design  */}
              {role == "seller" && <BackgroundBeams />}


              {/* Chat Input Box */}
              <div className={`flex items-center p-4 border-t ${role == "user" ? "bg-gray-200" : "bg-gray-900"}`} >
                <MyDropzone setPreview={setPreview} setFile={setFile} />
                <div className="flex-grow">
                  <InputEmoji
                    value={text}
                    onChange={setText}
                    cleanOnEnter
                    onEnter={handleOnEnter}
                    placeholder="Type a message"
                    shouldReturn={true}
                    shouldConvertEmojiToImage={false}
                  />
                </div>
                <button
                  onClick={() => {
                    handleOnEnter(text)
                  }}
                  className="ml-4 p-2 bg-blue-600 text-white rounded-full"
                >
                  <LuSendHorizonal size={24} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center flex-grow h-full bg-gray-300">
            <BiSolidMessageDots size={60} className="mb-4 text-gray-600" />
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome 👋 {userData?.name}
              </h1>
              <p className="text-lg text-gray-600">
                Select a user to start messaging.
              </p>
            </div>
          </div>
        )}
      </div >
    </>
  );
};

export default ChatMessageContainer;
