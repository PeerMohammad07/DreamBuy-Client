// import React from 'react'
import React, { useEffect, useRef, useState } from "react";
import Welcome from "./Welcome";
import { resendOtp, verifyOtp } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/slice/userAuthSlice";
import axios from "axios";

const Otp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const otpInputRef = useRef<HTMLInputElement[]>([]);
  const [otpFieldErr, setOtpFieldErr] = useState(false);
  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  });
  const [timer, setTimer] = useState(() => {
    let timer = localStorage.getItem("otpTimer");
    return timer ? parseInt(timer) : 60;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime > 0) {
          const updateTime = prevTime - 1;
          localStorage.setItem("otpTimer", JSON.stringify(updateTime));
          return updateTime;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Format OTP timer
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Handling OTP input value
  const handleInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setOtp((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (value && index < 3) {
      otpInputRef.current[index + 1].focus();
    }
  };

  // Handling OTP input value when enter backspace
  const handleInputKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0) {
      otpInputRef.current[index - 1].focus();
    }
  };

  // OTP input boxes
  let render = Object.keys(otp).map((value, index) => {
    return (
      <input
        key={index}
        name={value}
        type="text"
        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-200 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        pattern="\d*"
        onChange={(e) => handleInputValue(e, index)}
        maxLength={1}
        ref={(element) => {
          if (element) otpInputRef.current[index] = element;
        }}
        onKeyUp={(e) => handleInputKeyUp(e, index)}
      />
    );
  });

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (
        otp.otp1 == "" ||
        otp.otp2 == "" ||
        otp.otp3 == "" ||
        otp.otp4 == ""
      ) {
        setOtpFieldErr(true);
        return null;
      }

      // otp converting object to string
      let array = Object.values(otp);
      let value: string = "";
      array.map((_, i) => {
        value += array[i];
      });

      let response = await verifyOtp(Number(value));

      if (response.data.message == "Otp verification done") {
        dispatch(userLogin(response.data.user));
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response?.data.status) {
          setError(error.response?.data.message);
        }
      }
    }
  };

  const handleResendOtp = async () => {
    try {      
      const response = await resendOtp();
      if(response.status){
        setTimer(60)
        localStorage.setItem("otpTimer","60")
      }
    } catch (error) {}
  };

  return (
    <>
      <Welcome />
      <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow-lg mt-10">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">OTP Verification</h1>
          <p className="text-[15px] text-slate-500">
            Enter the 4-digit verification code that was sent to email
          </p>
        </header>
        <form id="otp-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex items-center justify-center gap-3">{render}</div>
          {error && <h1 className="text-red-500">{error}</h1>}
          {otpFieldErr && (
            <h1 className="text-red-500">All fields are required</h1>
          )}
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-blue-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
            >
              Verify Account
            </button>
          </div>
        </form>
        <div className="text-sm text-slate-500 mt-4">
          <p className="mb-2 text-xs">
            Your OTP will expire in:{" "}
            <span className="text-lg *: text-red-600 text-">
              {formatTime(timer)}
            </span>
          </p>
          Didn't receive code ?{" "}
          <button
            className={`text-underline-offset: 1px; font-medium ${
              timer === 0
                ? "text-blue-500 hover:text-blue-600"
                : "text-gray-500 cursor-not-allowed"
            }`}
            onClick={timer === 0 ? handleResendOtp : (e) => e.preventDefault()}
            style={{ pointerEvents: timer === 0 ? "auto" : "none" }}
          >
            Resend
          </button>
        </div>
      </div>
    </>
  );
};

export default Otp;
