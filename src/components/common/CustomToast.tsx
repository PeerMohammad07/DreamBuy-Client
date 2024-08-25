import { toast } from 'react-hot-toast';
import { SiTicktick } from "react-icons/si";
import { AiFillCloseCircle } from "react-icons/ai";

interface ShowToastWithActionsProps {
  accept: () => void;
  decline: () => void;
  name: string;
}

const ShowToastWithActions = ({ accept, decline, name }: ShowToastWithActionsProps) => {
  return toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex items-center ring-1 ring-black ring-opacity-5`}
      style={{ minHeight: '60px' }}
    >
      <div className="flex items-center flex-1 px-4 py-2">
        <div className="flex-1">
          <p className="text-base font-medium text-gray-900">Incoming Video Call</p>
          <p className="text-sm text-gray-500">{`Video call from ${name}`}</p>
        </div>
        <div className="flex items-center space-x-4 ml-4">
          <SiTicktick
            onClick={() => {
              accept();
              toast.dismiss(t.id);
            }}
            color="green"
            size={28}
            className="cursor-pointer"
          />
          <AiFillCloseCircle
            onClick={() => {
              decline();
              toast.dismiss(t.id);
            }}
            color="red"
            size={28}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  ),{
    duration:60000
  });
};

export default ShowToastWithActions;
