// import React from 'react'
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { signIn } from "../../api/userApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/slice/userAuthSlice";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { googleAuthLogin } from "../../api/userApi";
import ForgotPasswordEmailVerification from "./ForgotPasswordEmailVerification";

interface CredentialPayload extends JwtPayload {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
}

interface formData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState({
    emailErr: "",
    passwordErr: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formData>();
  const [openModal,setOpenModal] = useState(false)

  // Handling OnSubmit
  const onSubmit = async (data: formData) => {
    try {
      const response = await signIn(data.email, data.password);
      if (
        response.data.message == "Login Succesfully" &&
        response.data.status
      ) {
        dispatch(userLogin());
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        if (error.response?.data.otpVerified == "false") {
          localStorage.setItem("otpTimer", "60");
          navigate("/verifyOtp");
        } else if (error.response?.data.message == "incorrect password") {
          setError({
            emailErr: "",
            passwordErr: "Incorrect password",
          });
        } else {
          setError({
            emailErr: "invalid email user not found",
            passwordErr: "",
          });
        }
      }
    }
  };

  const googleLogin = async (response: CredentialResponse) => {
    try {
      const credentails: CredentialPayload = jwtDecode(
        response.credential as string
      );
      const googleLoginResponse = await googleAuthLogin(
        credentails.name,
        credentails.email,
        credentails.picture
      );
      if (
        googleLoginResponse.data.message == "google Login succesfull" &&
        googleLoginResponse.data.status
      ) {
        dispatch(userLogin());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <ForgotPasswordEmailVerification openModal={openModal} setOpenModal={setOpenModal}/>
      <div className="w-full justify-center ">
        <h1 className="text-center mt-5 text-3xl mb-4 text-black leading-loose font-serif">
          User Login
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <div className="mt-5 w-80">
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                onChange: (e) => setValue("email", e.target.value.trim()),
              })}
            />
            {errors.email?.type == "required" && (
              <h1 className="text-red-600">This field is required</h1>
            )}
            {!errors.email && error.emailErr && (
              <h1 className="text-red-600">{error.emailErr}</h1>
            )}
          </div>
          <div className="mt-5 w-80">
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full"
              {...register("password", {
                required: true,
                onChange: (e) => setValue("password", e.target.value.trim()),
              })}
            />
            {errors.password?.type == "required" && (
              <h1 className="text-red-600">This field is required</h1>
            )}
            {error.passwordErr && (
              <h1 className="text-red-600">{error.passwordErr}</h1>
            )}
          </div>
          <div className="mt-2 w-80 flex justify-start">
            <span className="text-blue-500 cursor-pointer" onClick={()=> setOpenModal(true)}>
              Forgot password ?
            </span>
          </div>
          <div className="mt-5 w-80 ">
            <button className="w-full bg-blue-500 py-3 text-center text-white rounded-lg shadow-md">
              Login
            </button>
          </div>
          <div className="pt-4">
            <GoogleLogin
              onSuccess={googleLogin}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
