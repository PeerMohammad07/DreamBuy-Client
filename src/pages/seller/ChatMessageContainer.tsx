import React, { useState } from 'react'
import InputEmoji from 'react-input-emoji'
import { BiSolidMessageDots } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { IoVideocam } from "react-icons/io5";
import { LuSendHorizonal } from "react-icons/lu";
import { BsFillImageFill } from "react-icons/bs";

const ChatMessageContainer = () => {
  const currentUser = true;

  const [text, setText] = useState('')

  function handleOnEnter(text) {
    console.log('enter', text)
  }

  return (
    <div className="flex-grow h-full flex flex-col bg-gray-200">
      {currentUser ? (
        <>
          <div className='flex bg-gray-900 justify-between items-center p-3'>
            <div className='flex items-center'>
              <FaUserCircle size={40} className="text-gray-400 mr-3" />
              <h1 className="text-white">Peer Mohamad</h1>
            </div>
            <IoVideocam size={30} className="text-white" />
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">You were the Chosen One!</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble">I hate you!</div>
              <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div>
          </div>

          {/* Chat input box */}
          <div className="flex items-center p-4 border-t border-gray-700 bg-gray-900">
            <BsFillImageFill className="mr-3" />
            <div className="flex-grow">
              <InputEmoji
                value={text}
                onChange={setText}
                cleanOnEnter
                onEnter={handleOnEnter}
                placeholder="Type a message"
              />
            </div>
            <button onClick={() => handleOnEnter(text)} className="ml-4 p-2 bg-blue-600 text-white rounded-full">
              <LuSendHorizonal size={24} />
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center flex-grow h-full bg-gray-300">
          <BiSolidMessageDots size={60} className="mb-4 text-gray-600" />
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome 👋 Peer Mohammad
            </h1>
            <p className="text-lg text-gray-600">
              Select a user to start messaging.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessageContainer;
