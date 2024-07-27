import { watch } from "fs";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdAttachEmail } from "react-icons/md";
import { RiEyeCloseFill, RiLockPasswordFill } from "react-icons/ri";
import { signIn } from "../../api/adminApi";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../Redux/slice/adminAuthSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye } from "react-icons/fa6";

interface formData {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();
  const [closeEye, setCloseEye] = useState(true)

  const onSubmit: SubmitHandler<formData> = async (data: formData) => {
    try {
      const { email, password } = data
      const response = await signIn(email, password)
      if (response.data.message == "login Successfully") {
        console.log("adklsjfkl");
        dispatch(adminLogin())
        navigate("/admin/")
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message == "incorrect password") {
          toast.error("Incorrect password")
        } else if (error.response?.data.message == "Invalid Email") {
          toast.error("No admin found with the provided email address");
        }
      }
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-transparent border-2 border-white border-opacity-20 backdrop-filter backdrop-blur-lg text-white rounded-lg p-8">
        <h1 className="text-3xl mb-8 text-center">Welcome Admin</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-box mb-6 relative">
            <MdAttachEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl text-white" />
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={"admin@gmail.com"}
              className="w-full h-full bg-transparent border-2 border-white border-opacity-20 rounded-full text-white text-lg pl-12 py-4"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                onChange: (e) => setValue("email", e.target.value.trim()),
              })}
            />
            {errors.email?.type == "required" && (
              <h1 className="text-red-600">This field is required</h1>
            )}
          </div>

          <div className="input-box mb-6 relative">
            <RiLockPasswordFill className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl text-white" />
            <input
              type={closeEye ? "password" : "text"}
              placeholder="Password"
              value={"admin123"}
              className="w-full h-full bg-transparent border-2 border-white border-opacity-20 rounded-full text-white text-lg pl-12 pr-12 py-4 focus:outline-none focus:border-opacity-50"
              {...register("password", {
                required: true,
                onChange: (e) => setValue("password", e.target.value.trim()),
              })}
            />
            <div className="absolute inset-y-0 right-4 flex items-center cursor-pointer">
              {closeEye ? (
                <RiEyeCloseFill className="text-xl text-white" onClick={() => setCloseEye(false)} />
              ) : (
                <FaEye className="text-xl text-white" onClick={() => setCloseEye(true)} />
              )}
            </div>
            {errors.password?.type === "required" && (
              <h1 className="text-red-600 mt-2">This field is required</h1>
            )}
          </div>

          <button
            type="submit"
            className="btn w-full py-3 rounded-full bg-white shadow-lg text-lg font-semibold text-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
