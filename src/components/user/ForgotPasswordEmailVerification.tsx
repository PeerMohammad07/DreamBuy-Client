import Modal from "react-modal";
import React from "react";

export interface OtpComponentProps {
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
}

const ForgotPasswordEmailVerification = ({
  openModal,
  setOpenModal,
}: OtpComponentProps) => {
  // Modal Styling
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      <Modal isOpen={openModal} style={customStyles}>
        <button
          className="absolute top-2 right-2 bg-transparent text-black text-lg font-semibold"
          onClick={() => setOpenModal(false)}
        >
          <i className="fa fa-window-close" aria-hidden="true"></i>
        </button>
        <div className="max-w-md mx-auto bg-white p-6  rounded-lg">
          <h1 className="text-center text-2xl font-bold mb-4">
            Forgot Password ?
          </h1>
          <p className="text-center mb-6">
            Enter your email address and we'll send you a link to set your
            password.
          </p>
          <form action="" className="flex flex-col items-center">
            <div className="w-full mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send
            </button>
            <div className="mt-4">
              <span className="text-gray-600">Know your password?</span>
              <button type="button" className="text-blue-600 ml-1" onClick={()=> setOpenModal(false)}>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ForgotPasswordEmailVerification;
