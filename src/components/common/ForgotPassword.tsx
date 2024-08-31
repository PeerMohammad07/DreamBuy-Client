import Modal from "react-modal";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { forgotPassword } from "../../api/userApi";
import { forgotPasswordSeller } from "../../api/sellerApi";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2"

export interface OtpComponentProps {
  open: boolean;
  role: string;
  close :(state: boolean) => void;
}

interface FormData {
  email: string;
}

const ForgotPassword = ({ open, role, close }: OtpComponentProps) => {
  const [openModal, setOpenModal] = useState(open);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

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

  function showEmailSentAlert(email: string) {
    Swal.fire({
      title: 'Email Sent!',
      html: `A password reset link has been sent to <span style="color: #3085d6; font-weight: bold;">${email}</span>.`,
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 5000,
      customClass: {
        popup: 'popup-class',
        title: 'title-class',
        icon: 'icon-class'
      },
      backdrop: true,
      allowOutsideClick: false,
      allowEscapeKey: true,
      buttonsStyling: true,
      confirmButtonColor: '#3085d6',
      confirmButtonAriaLabel: 'OK button'
    });
  }


  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const { email } = data;
      if(role == "user"){
        const response = await forgotPassword(email)
        if(response.data.message == "email send succesfully"){
          setOpenModal(false)
          close(false)
          showEmailSentAlert(email)
        }
        console.log(response);
      }else if(role == "seller"){
        const response = await forgotPasswordSeller(email)
        if(response&&response.data.message == "email send succesfully"){          
          setOpenModal(false)
          showEmailSentAlert(email)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={openModal} style={customStyles}>
        <button
          className="absolute top-2 right-2 bg-transparent text-black text-lg font-semibold"
          onClick={() => {
            setOpenModal(false)
            close(false)
          }}
        >
          <i className="fa fa-window-close" aria-hidden="true"></i>
        </button>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
          <h1 className="text-center text-2xl font-bold mb-4">
            Forgot Password ?
          </h1>
          <p className="text-center mb-6">
            Enter your email address and we'll send you a link to set your
            password.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
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
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  onChange: (e) => setValue("email", e.target.value.trim()),
                })}
              />
              {errors.email?.type === "required" && (
                <h1 className="text-red-600">{errors.email.message}</h1>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send
            </button>
            <div className="mt-4">
              <span className="text-gray-600">Know your password?</span>
              <button
                type="button"
                className="text-blue-600 ml-1"
                onClick={() => setOpenModal(false)}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ForgotPassword;
