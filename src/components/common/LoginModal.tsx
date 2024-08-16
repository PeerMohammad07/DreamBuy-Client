import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

interface LoginModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <div className="modal-box">
          <form method="dialog">
            <button onClick={()=> onClose(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4 font-bold text-gray-600">          🚀 To contact the owner and access this feature, you need to be logged in. Please log in to continue.
          </p>
          <div className='flex justify-center'>

            <Link to={"/login"}>  <button className='text-white bg-blue-600 rounded-lg p-3'>Login Now</button></Link>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default LoginModal;
