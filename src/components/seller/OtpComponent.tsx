import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resendOtp, verifyOtp } from "../../api/sellerApi";
import { sellerLogin } from "../../Redux/slice/sellerAuthSlice";
import "@fortawesome/fontawesome-free/css/all.css";
import axios from "axios";
import { toast } from "react-toastify";

export interface OtpComponentProps {
  showModal: boolean;
  setShowModal: (isOpen: boolean) => void;
}

const OtpComponent = ({ showModal, setShowModal }: OtpComponentProps) => {
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
    console.log(timer);

    return timer ? parseInt(timer) : 60;
  });

  useEffect(()=> {
    setTimer(60)
  },[])

  useEffect(() => {
    if (showModal) {
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
    }
  }, [showModal, timer]);

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
        className="w-14 mt-6 mx-3 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-200 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
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

  // handling resend otp
  const handleResendOtp = async () => {
    try {
      const response = await resendOtp();
      if (response&&response.status) {
        setTimer(60);
        localStorage.setItem("otpTimer", "60");
      }
    } catch (error) {}
  };

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

  // HandleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setShowModal(true);
      if (
        otp.otp1 == "" ||
        otp.otp2 == "" ||
        otp.otp3 == "" ||
        otp.otp4 == ""
      ) {
        setOtpFieldErr(true);
        setShowModal(true);
        return null;
      }

      // otp converting object to string
      let array = Object.values(otp);
      let value: string = "";
      array.map((_, i) => {
        value += array[i];
      });

      const response = await verifyOtp(Number(value));

      if (response?.data.message == "Otp verification done") {        
        dispatch(sellerLogin(response.data.sellerData))
        navigate("/seller/");
        setShowModal(false);
      }      

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message == "invalid Otp") {
            toast.error(error.response?.data.message);
        }
      }
    }
  };

  return (
    <>
      <Modal isOpen={showModal} style={customStyles}>
        <div className="relative max-w-[90vw] sm:max-w-lg mx-auto p-4 bg-white rounded-lg ">
          <button
            className="absolute top-2 right-2 bg-transparent text-black text-lg font-semibold"
            onClick={() => setShowModal(false)}
          >
            <i className="fa fa-window-close" aria-hidden="true"></i>
          </button>
          <form onSubmit={(e) => handleSubmit(e)}>
            <h1 className="text-2xl font-bold mb-1 text-center">
              OTP Verification
            </h1>
            <p className="text-[15px] text-slate-500">
              Enter the 4-digit verification code that was sent to your email
            </p>
            <div className="flex items-center justify-center gap-3">
              {render}
            </div>
            {otpFieldErr && (
              <h1 className="text-red-500 text-center">
                All fields are required
              </h1>
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
          <div className="text-sm text-slate-500 mt-4 text-center">
            <p className="mb-2 text-xs">
              Your OTP will expire in:{" "}
              <span className="text-lg text-red-600">{formatTime(timer)}</span>
            </p>
            Didn't receive the code?{" "}
            <button
              className={`font-medium ${
                timer === 0
                  ? "text-blue-500 hover:text-blue-600"
                  : "text-gray-500 cursor-not-allowed"
              }`}
              onClick={
                timer === 0 ? handleResendOtp : (e) => e.preventDefault()
              }
              style={{ pointerEvents: timer === 0 ? "auto" : "none" }}
            >
              Resend
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OtpComponent;
