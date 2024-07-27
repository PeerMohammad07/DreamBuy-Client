import { jwtDecode } from "jwt-decode";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../api/userApi";
import { resetPasswordSeller } from "../../api/sellerApi";
import axios from "axios";
import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa6";
import { useState } from "react";


export interface Decoded {
  exp: number;
  iat: number;
  name: string;
  role: string;
  userId: string;
}

interface formData {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate()
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formData>();

  const [closeEye,setCloseEye] = useState(true)
  const [passCloseEye,setPassCloseEye] = useState(true)
  const password = watch("password");

  const validateConfirmPassword = (value: string) => {
    if (value == password) {
      return true;
    } else {
      return "Password is not match";
    }
  };

  const onSubmit: SubmitHandler<formData> = async (data: formData) => {
    try {
      let decoded = null
      if (token) {
        decoded = jwtDecode(token) as Decoded;
      } else {
        toast.error("Your link has been expired")
        return
      }
      const { password } = data;
      if (decoded.role == "user") {
        const response = await resetPassword(password, decoded.userId, token)
        if (response.data.message == "password updated succesfully") {
          navigate("/login")
        }
      } else if (decoded?.role == "seller") {
        const response = await resetPasswordSeller(password, decoded.userId, token)
        if (response&&response.data.message == "password updated succesfully") {
          navigate("/seller/register")
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message == "token has been expired") {
          toast.error("User doesnt exist with this email")
        } else if (error.response?.data.message == "user doesn't exist") {
          toast.error("User doesnt exist with this email")
        }
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <img
          src="/dreambuylogo.png"
          alt="dreambuylogo"
          className="w-15 h-9 mb-8"
        />

        <div className="w-10/12 lg:w-6/12 border-black rounded-xl shadow-lg overflow-hidden">
          <div className="lg:flex">
            <div className="w-full lg:w-1/3 bg-[url('/forgot-password-.avif')] flex flex-col justify-center p-10 bg-no-repeat bg-cover bg-center items-center relative"></div>
            <div className="w-full lg:w-2/3 py-8 px-10">
              <h2 className="text-3xl text-center lg:text-3xl mb-4 text-black">
                Reset Your Password
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-5">
                 <div className="relative flex items-center">
                 <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-400 py-1 px-2 w-full rounded-md"
                    {...register("password", {
                      required: "password field is required",
                      pattern:
                        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/,
                      onChange: (e) =>
                        setValue("password", e.target.value.trim()),
                    })}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                      {passCloseEye ? (
                        <RiEyeCloseFill onClick={() => setPassCloseEye(false)} />
                      ) : (
                        <FaEye onClick={() => setPassCloseEye(true)} />
                      )}
                    </div>
                 </div>
                  {errors.password?.type == "required" ? (
                    <h1 className="text-red-600">{errors.password.message}</h1>
                  ) : (
                    <></>
                  )}
                  {errors.password?.type == "pattern" && (
                    <ul>
                      {password.length < 8 && (
                        <li className="text-red-600">
                          * Minimum 8 characters required
                        </li>
                      )}
                      {password.length > 15 && (
                        <li className="text-red-600">
                          * Maximum 15 characters allowed
                        </li>
                      )}
                      {!/[A-Za-z]/.test(password) ? (
                        <li className="text-red-600">* Must contain letters</li>
                      ) : (
                        ""
                      )}
                    </ul>
                  )}
                </div>



                <div className="mt-5">
                  <div className="relative flex items-center">
                    <input
                      type={closeEye ? "password" : "text"}
                      placeholder="confirm password"
                      className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full pr-10"
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: validateConfirmPassword,
                        onChange: (e) =>
                          setValue("confirmPassword", e.target.value.trim()),
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
                  {errors.confirmPassword?.type == "required" && (
                    <h1 className="text-red-600">{errors.confirmPassword.message}</h1>
                  )}

                  {errors.confirmPassword?.type === "validate" &&
                    typeof errors.confirmPassword.message === "string" && (
                      <h1 className="text-red-600">
                        {errors.confirmPassword.message}
                      </h1>
                    )}
                </div>
                <div className="mt-5">
                  <button className="w-full bg-blue-500 py-3 text-center text-white rounded-md">
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
