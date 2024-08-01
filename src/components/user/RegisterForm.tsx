// import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { googleAuthRegister, signUp } from "../../api/userApi";
import axios from "axios";
import { toast } from "react-toastify";
import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa6";
import { useState } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { userLogin } from "../../Redux/slice/userAuthSlice";
import { useDispatch } from "react-redux";


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


const RegisterForm = () => {

  interface formData {
    name: string
    email: string
    password: string
    confirmPassword: string
  }

  const [closeEye, setCloseEye] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<formData>();

  const password = watch("password");

  // validating the confirm password field
  const validateConfirmPassword = (value: string) => {
    if (value === password) {
      return true;
    } else {
      return "Passwords do not match";
    }
  };

  // goggleregister 
  const googleRegister = async (response: CredentialResponse) => {
    try {
      const credentails: CredentialPayload = jwtDecode(
        response.credential as string
      );
      const googleRegisterResponse = await googleAuthRegister(
        credentails.name,
        credentails.email,
        credentails.picture
      );
      if (
        googleRegisterResponse.data.message == "google register succesfull" &&
        googleRegisterResponse.data.status
      ) {
        console.log(googleRegisterResponse);

        dispatch(userLogin(googleRegisterResponse.data.newUser));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (!error.response?.data.status) {
          toast.error(error.response?.data.message)
        }
      }
    }
  }

  // Handling Form submiting
  const onSubmit: SubmitHandler<formData> = async (data: formData) => {
    try {
      const { name, email, password } = data

      const res = await signUp({
        name,
        email,
        password,
      })

      if (res.data.message == "User created and otp sended successfully" && res.data.status) {
        localStorage.setItem("otpTimer", "60")
        navigate('/verifyOtp')
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message == "user already exist with this email") {
          toast.error(error.response.data.message)
        }
      }
    }
  }

  return (
    <>
      <div className="w-full justify-center ">
        <h1 className="text-center mt-5 text-3xl mb-4 text-black font-serif ">
          User Registeration
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <div className="mt-5 w-80">
            <input
              type="text"
              placeholder="name"
              className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full"
              {...register("name", {
                required: "name field is required",
                minLength: {
                  value: 4,
                  message: "Name must be at least 4 characters long",
                },
                onChange: (e) => setValue("name", e.target.value.trim()),
              })}
            />
            {errors.name?.type == "required" && (
              <h1 className="text-red-600">{errors.name.message}</h1>
            )}
            {
              errors.name?.message == "Name must be at least 4 characters long" && <h1 className="text-red-600">{errors.name.message}</h1>
            }
          </div>

          <div className="mt-5 w-80">
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
                onChange: (e) => setValue("email", e.target.value.trim()),
              })}
            />
            {errors.email?.type == "required" && (
              <h1 className="text-red-600">{errors.email.message}</h1>
            )}
            {errors.email && errors.email.type != "required" && (
              <h1 className="text-red-600">{errors.email.message}</h1>
            )}
          </div>

          <div className="mt-5 w-80">
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full"
              {...register("password", {
                required: "password is required",
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/,
                onChange: (e) => setValue("password", e.target.value.trim()),
              })}
            />
            {errors.password?.type == "required" ? (
              <h1 className="text-red-600">{errors.password.message}</h1>
            ) : (
              <></>
            )}
            {errors.password?.type == "pattern" &&
              <ul>
                {password.length < 8 && <li className="text-red-600">* Minimum 8 characters required</li>}
                {password.length > 15 && <li className="text-red-600">* Maximum 15 characters allowed</li>}
                {!/[A-Za-z]/.test(password) ? <li className="text-red-600">* Must contain letters</li> : ''}
              </ul>
            }
          </div>

          <div className="mt-5 w-80 relative">
            <div className="relative flex items-center">
              <input
                type={closeEye ? "password" : "text"}
                placeholder="Confirm Password"
                className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full pr-10"
                {...register("confirmPassword", {
                  required: "confirm Password is required",
                  validate: validateConfirmPassword,
                  onChange: (e) => setValue("confirmPassword", e.target.value.trim()),
                })}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer h-full">
                {closeEye ? (
                  <RiEyeCloseFill onClick={() => setCloseEye(false)} />
                ) : (
                  <FaEye onClick={() => setCloseEye(true)} />
                )}
              </div>
            </div>
            {errors.confirmPassword?.type === "required" && (
              <h1 className="text-red-600 mt-2">{errors.confirmPassword.message}</h1>
            )}
            {errors.confirmPassword?.type === "validate" && (
              <h1 className="text-red-600 mt-2">{errors.confirmPassword.message}</h1>
            )}
          </div>


          <div className="mt-5 w-80">
            <button className="w-full bg-blue-500 py-3 text-center text-white rounded-lg shadow-md">
              Sign Up
            </button>
          </div>
          <div className="pt-4">
            <GoogleLogin
              onSuccess={googleRegister}
              onError={() => {
                console.log("google register Failed");
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
