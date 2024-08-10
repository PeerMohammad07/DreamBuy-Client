import { Imessage } from "./ChatMessageContainer";

interface MessageProps {
  message: Imessage;
  isSender: boolean;
  userImage: string | undefined;
  userName: string | undefined;
  role: string | undefined;
}

const Message: React.FC<MessageProps> = ({ message, isSender, userImage, userName, role }) => {
  return (
  <div className={`message-container mb-2 ${isSender ? 'flex justify-end' : ''} `}>
    <div className={`flex ${isSender ? 'flex-row-reverse' : ''}`}>
      {/* Profile image for both sender and receiver */}
      <img
        src={userImage}
        alt={`${userName}'s Profile`}
        className={`w-8 h-8 rounded-full object-cover ${isSender ? 'ml-3' : 'mr-3'}`}
      />
      <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'}`}>
        <div className={`message ${isSender ? 'sent' : 'received'} bg-${isSender ? 'blue' : 'gray'}-500 p-1 px-3 rounded-lg max-w-xs ${isSender ? 'text-right' : 'text-left'}`}>
          <p className="text-white">{message.message}</p>
        </div>
        <span className={`text-xs ${role === "user" ? "" : "text-white"} mt-1 ${isSender ? 'text-right' : 'text-left'}`}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  </div>
)}

export default Message;
  