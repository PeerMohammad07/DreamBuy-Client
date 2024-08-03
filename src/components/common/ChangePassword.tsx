import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa6";
import { RiEyeCloseFill, RiLockPasswordFill } from "react-icons/ri";
import Modal from "react-modal";
import { changePassword } from "../../api/sellerApi";
import { toast } from "react-toastify";

interface ChangePasswordProps {
  open: boolean;
  close: (value: boolean) => void;
  sellerId: string | undefined
}

export interface formDataProps {
  oldPassword: string
  newPassword: string
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "330px",
  },
};

const ChangePassword = ({ open, close, sellerId }: ChangePasswordProps) => {
  const [closeEye, setCloseEye] = useState(true);
  const [closeEyeNew, setCloseEyeNew] = useState(true);
  const { register, setValue, reset, formState: { errors }, handleSubmit } = useForm<formDataProps>();


  const onSubmit = async (data: formDataProps) => {
    try {
      const updateData = { ...data, sellerId: sellerId }
      const response = await changePassword(updateData)
      if (response&&response.data === "password updated succesfully") {
        toast.success("password updated successfully")
        reset()
        close(false)
      } else if (response && response.data === "Incorrect old Password") {
        toast.error("Incorrect old Password")
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <>
      <Modal isOpen={open} style={customStyles}>
        <button
          className="absolute top-2 right-2 bg-transparent text-black text-lg font-semibold"
          onClick={() => close(false)}
        >
          <i className="fa fa-window-close" aria-hidden="true"></i>
        </button>
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-black text-2xl font-serif">Change Password</h1>
          <RiLockPasswordFill className="ml-2 text-2xl" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 w-full">
            <div className="relative flex items-center">
              <input
                type={closeEye ? "password" : "text"}
                placeholder="Old Password"
                className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full pr-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("oldPassword", {
                  required: "Old password is required",
                  onChange: (e) => setValue("oldPassword", e.target.value.trim()),
                })}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                {closeEye ? (
                  <RiEyeCloseFill onClick={() => setCloseEye(false)} />
                ) : (
                  <FaEye onClick={() => setCloseEye(true)} />
                )}
              </div>
            </div>
            {errors.oldPassword?.type === "required" && (
              <h1 className="text-red-600">{String(errors.oldPassword.message)}</h1>
            )}
          </div>

          <div className="mt-5 w-full">
            <div className="relative flex items-center">
              <input
                type={closeEyeNew ? "password" : "text"}
                placeholder="New Password"
                className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full pr-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: { value: 8, message: "Minimum 8 characters required" },
                  maxLength: { value: 15, message: "Maximum 15 characters allowed" },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: "Must contain letters and numbers",
                  },
                  onChange: (e) => setValue("newPassword", e.target.value.trim()),
                })}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                {closeEyeNew ? (
                  <RiEyeCloseFill onClick={() => setCloseEyeNew(false)} />
                ) : (
                  <FaEye onClick={() => setCloseEyeNew(true)} />
                )}
              </div>
            </div>
            {errors.newPassword && (
              <h1 className="text-red-600">{String(errors.newPassword.message)}</h1>
            )}
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ChangePassword;
