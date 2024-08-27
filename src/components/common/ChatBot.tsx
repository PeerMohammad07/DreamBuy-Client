import { useEffect, useRef, useState } from 'react';
import { TbSend } from "react-icons/tb";
import { sendAiMessage } from '../../api/chatApi';
import { CircularProgress } from '@mui/material';

interface Imessage {
  message: string;
  isUser: boolean;
  loading?: boolean; // Optional loading state
}

const ChatBot = () => {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState<string>('');
  const [chat, setChat] = useState<Imessage[]>([{ message: "Hello, how can I assist you today?", isUser: false }]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === '') {
      return;
    }

    const userMessage = { message: text, isUser: true, loading: false };
    const botMessage = { message: "", isUser: false, loading: true };

    setText('');
    setChat((prev) => [...prev, userMessage, botMessage]);

    try {
      const response = await sendAiMessage(text);
      setChat((prev) => {
        const updatedChat = prev.map((msg) =>
          msg.loading ? { ...msg, message: response.data, loading: false } : msg
        );
        return updatedChat;
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <>
      <div
        className={`fixed bottom-8 right-8 z-30 cursor-pointer transition-transform duration-300 ease-in-out ${expanded ? 'scale-110' : 'scale-100'
          }`}
        onClick={() => setExpanded(prevState => !prevState)}
      >
        {expanded
          ? <></>
          : <img src="/chatBotIcon.png" alt="Open chatbot icon" className="rounded-full w-16 h-16" />
        }
      </div>

      <div
        className={`fixed bottom-5 right-8 z-40 w-96 h-[95vh] bg-teal-600 rounded-xl shadow-lg border-l-4 border-r-4 border-teal-700 transition-all duration-300 ease-in-out transform ${expanded ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        style={{ transition: 'opacity 0.3s ease-in-out' }}
      >
        <div className="flex flex-col h-full">
          <div className="bg-teal-700 text-white p-4 rounded-t-xl flex justify-between items-center">
            <h3 className="text-lg font-bold">Dream Buy AI</h3>
            <button onClick={() => setExpanded(false)} className="text-white text-3xl hover:text-teal-400">
              &times;
            </button>
          </div>

          {/* Messages Area */}
          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto bg-gray-200 text-gray-800 space-y-4">
            {chat.map((message, index) => (
              message.isUser ? (
                <div key={index} className="flex justify-end">
                  <div className="bg-gray-700 text-white p-3 rounded-lg max-w-xs">
                    {message.message}
                  </div>
                </div>
              ) : (
                <div key={index} className="flex items-center space-x-2">
                  {message.loading ? (
                    <CircularProgress color='success' />
                  ) : (
                    <div className="bg-gray-300 text-gray-800 p-3 rounded-lg max-w-xs">
                      {message.message}
                    </div>
                  )}
                </div>
              )
            ))}
          </div>

          <div className="p-4 bg-teal-700 rounded-b-xl relative">
            <form onSubmit={sendMessage}>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="Type your message..."
                className="w-full p-3 rounded-full bg-teal-900 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-teal-400"
              >
                <TbSend color='white' size={25} className='me-3' />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
