// Modal.tsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 relative">
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-center text-blue-600">Premium Subscription Required ✨</h2>
        </div>
        <div className="p-4 text-center">
          <p className="text-gray-700 mb-4">
            Unlock exclusive features and get in touch with property owners by subscribing to our premium plan.
          </p>
        </div>
        <div className="p-4 border-t flex justify-center">
          <button
            className="bg-blue-500 text-white rounded-md px-6 py-2 hover:bg-blue-600 transition duration-300"
          >
          <Link to={'/premium'}>
            Get Premium
          </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
