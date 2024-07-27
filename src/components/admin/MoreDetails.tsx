import React from 'react';
import { Box, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface ISeller {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: number;
  otpVerified: boolean;
  isBlocked: boolean;
  kycVerified: "Not Verified" | "Verification Pending" | "Verified" | "Cancelled";
  verificationImage: string;
  verificationImageUrl: string;
  __v: number;
}

interface MoreDetailsProps {
  open: boolean;
  onClose: () => void;
  seller: ISeller;
  onAccept: (id: string, status: string) => void;
}

const MoreDetails: React.FC<MoreDetailsProps> = ({
  open,
  onClose,
  seller,
  onAccept,
}) => {
  
  // Function to handle Accept button click
  const handleAccept = () => onAccept(seller._id, "Verified");
  
  // Function to handle Decline button click
  const handleDecline = () => onAccept(seller._id, "Cancelled");

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        outline: 'none'
      }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8
          }}
        >
          <CloseIcon />
        </IconButton>

        <div className="flex flex-col items-center">
          <h2 id="modal-title" className="mb-4 text-lg font-bold">KYC VERIFICATION</h2>
          <img
            src={seller.verificationImageUrl}
            alt="Seller"
            className="w-full h-auto mb-4 rounded-md"
          />
          <div className="mb-4">
            <p><strong>Phone:</strong> {seller.phone}</p>
          </div>
          <div className="flex justify-between w-full">
            <button
              onClick={handleAccept}
              className="px-4 py-2 rounded-md text-white font-medium shadow-md focus:outline-none bg-green-500 hover:bg-green-600 active:translate-y-1 transition duration-200 ease-in-out;"
            >
              Accept
            </button>
            <button
              onClick={handleDecline}
              className="px-4 py-2 rounded-md text-white font-medium shadow-md focus:outline-none bg-red-500 hover:bg-red-600 active:translate-y-1 transition duration-200 ease-in-out;"
            >
              Decline
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default MoreDetails;
