import React, { useEffect } from 'react';
import { BiSolidMessageAltDots } from "react-icons/bi";

interface NotificationProps {
  message: string;
  onClose: () => void;
  onClick: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose, onClick }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
    className="z-50 fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 bg-white shadow-lg rounded-lg border border-gray-300 p-3 cursor-pointer"
    onClick={onClick}
    role="alert"
  >
    <div className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full text-white">
      <BiSolidMessageAltDots className="w-6 h-6" />
    </div>
    <div className="flex-1">
      <div className="font-semibold text-gray-800 text-sm">{message}</div>
      <button 
        className="absolute top-1 right-1 text-gray-500 hover:text-gray-700" 
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  </div>
  );
};

export default Notification;
