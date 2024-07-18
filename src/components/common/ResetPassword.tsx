import { jwtDecode } from "jwt-decode";
import { decode } from "querystring";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../api/userApi";
import { resetPasswordSeller } from "../../api/sellerApi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { sellerLogin } from "../../Redux/slice/sellerAuthSlice";
import { userLogin } from "../../Redux/slice/userAuthSlice";

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
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formData>();

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
      }else {
        toast.error("Your link has been expired")
        return
      }
      const { password } = data;      
      if (decoded.role == "user") {
        const response = await resetPassword(password,decoded.userId,token)
        if(response.data.message == "password updated succesfully"){
          dispatch(userLogin())
          navigate("/")
        }
      } else if (decoded?.role == "seller") {        
        const response = await resetPasswordSeller(password,decoded.userId,token)
        if(response.data.message == "password updated succesfully"){
          dispatch(sellerLogin())
          navigate("/seller/")
        }
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        if(error.response?.data.message == "token has been expired"){
          toast.error("User doesnt exist with this email")
        }else if(error.response?.data.message == "user doesn't exist"){
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
                  <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-400 py-1 px-2 w-full rounded-md"
                    {...register("password", {
                      required: true,
                      pattern:
                        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/,
                      onChange: (e) =>
                        setValue("password", e.target.value.trim()),
                    })}
                  />
                  {errors.password?.type == "required" ? (
                    <h1 className="text-red-600">This field is required</h1>
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
                <div className="mt-3">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="border border-gray-400 py-1 px-2 w-full rounded-md"
                    {...register("confirmPassword", {
                      required: true,
                      validate: validateConfirmPassword,
                      onChange: (e) =>
                        setValue("confirmPassword", e.target.value.trim()),
                    })}
                  />
                  {errors.confirmPassword?.type == "required" && (
                    <h1 className="text-red-600">This field is required</h1>
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
