import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { TbBulbFilled } from "react-icons/tb";
import { BsFillSendCheckFill } from "react-icons/bs";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { TiMessageTyping } from "react-icons/ti";
import { Link } from 'react-router-dom';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  email:string|undefined
}

const GetOwnerDetails: React.FC<ModalProps> = ({ isOpen, onClose,email }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <FaTimes size={20} onClick={onClose} className='' />
          <div className='flex items-center justify-center'>
            <h1 className='font-bold text-xl'>Owner Contact Details
            </h1>
            <BsFillSendCheckFill className='ms-3' />
          </div>
          <hr className='border-1 h-1 mt-2' />
          <div className='flex pt-5'>
            <h2 className='text-md text-black'>Owner details will be sent shortly to your  <span className='text-blue-700'>{email}</span></h2>
          </div>
          <div className='flex justify-between pt-5'>
            <div className='flex'>
              <button className='bg-gradient-to-t from-green-500 to-green-800 rounded p-2 flex items-center text-white'>
                <TiMessageTyping className='mr-2' size={20} />
                Message Owner
              </button>
            </div>
            <Link to={'/premium'}>
              <button className='bg-gradient-to-t from-yellow-500 to-yellow-600 rounded p-2 flex items-center text-white'>
                <MdOutlineWorkspacePremium className='mr-2' size={20} />
                Explore Premium
              </button>
            </Link>
          </div>
          <div className="bg-yellow-200 p-4 rounded-lg mb-4 mt-5">
            <div className='flex justify-between'>
              <strong>NB Tip :
              </strong>
              <TbBulbFilled size={20} />
            </div>
            <p>Do visit the property before transferring any advance money to the Owner</p>
          </div>


          {/* <div className='flex'>
            <h2 className="text-xl font-bold mb-4">
              Owner details will be sent shortly to your  dreambuyrealestate@gmail.com.
            </h2>
            <FaTimes size={20} onClick={onClose} />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-4">
            Send Message
          </button>
          <div className="bg-yellow-200 p-4 rounded-lg mb-4">
            <div className='flex justify-between'>
              <strong>NB Tip :
              </strong>
              <TbBulbFilled size={20} />
            </div>
            <p>Do visit the property before transferring any advance money to the Owner</p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default GetOwnerDetails;
