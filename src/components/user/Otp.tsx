// import React from 'react'
import React, { useRef, useState } from "react";
import Welcome from "./Welcome";


const Otp = () => {

  const otpInputRef = useRef<HTMLInputElement[]>([])
  const [otp,setOtp] = useState({
    otp1 : "",
    otp2 : "",
    otp3 : "",
    otp4 : ""
  })

  // Handling OTP input value
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>,index:number)=>{
    const {name,value} = e.target
    setOtp((prevState)=>({
      ...prevState,
      [name]:value
    }))

    if(value && index < 3){
      otpInputRef.current[index+1].focus()
    }
  }

  // Handling OTP input value when enter backspace
  const handleInputKeyUp = (e:React.KeyboardEvent<HTMLInputElement>,index:number)=>{
    if (e.key === "Backspace" && index > 0) {
      otpInputRef.current[index - 1].focus();
    }
  }
  
  // OTP input boxes
  let render = Object.keys(otp).map((value,index)=> {
    return <input
    key={index}
    name={value}
    type="text"
    className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
    pattern="\d*"
    onChange={(e)=>handleInputValue(e,index)}
    maxLength={1}
    ref={(element) => {
      if (element) otpInputRef.current[index] = element;
    }}
    onKeyUp={(e)=> handleInputKeyUp(e,index)}
  />
  })


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
        <form id="otp-form">
          <div className="flex items-center justify-center gap-3">
           {render}
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
            >
              Verify Account
            </button>
          </div>
        </form>
        <div className="text-sm text-slate-500 mt-4">
          Didn't receive code?{" "}
          <a
            className="font-medium text-indigo-500 hover:text-indigo-600"
            href="#0"
          >
            Resend
          </a>
        </div>
      </div>
    </>
  );
};

export default Otp;
