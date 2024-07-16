import { SubmitHandler, useForm } from "react-hook-form";
import { SignIn } from "../../api/sellerApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OtpComponent, { OtpComponentProps } from "./OtpComponent";
import { toast } from "react-toastify";

export interface loginData {
  email: string;
  password: string;
}

const Login = ({ showModal, setShowModal }: OtpComponentProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>();
  const navigate = useNavigate();


  // Handle Form Submit
  const onSubmit: SubmitHandler<loginData> = async (data: loginData) => {
    try {
      const response = await SignIn(data.email, data.password);
      if (
        response?.data.message == "login succesfully" &&
        response.data.status
      ) {
        navigate("/seller/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        if (error.response?.data.otpVerified === "false") {
          localStorage.setItem("otpTimer", "60");
          setShowModal(true);
        } else if (
          error.response?.data.message === "Kyc verification in progresss"
        ) {
          toast.warning("Kyc verification in progress");
        } else if (error.response?.data.message === "incorrect password") {
          toast.error("incorrect password");
        } else if (error.response?.data.message === "no verification image") {
          navigate("/seller/kycVerification");
        } else {
          toast.error(error.response?.data.message);
        }
      } else {
        console.error("Non-Axios error or non-403 error:", error);
      }
    }
  };

  return (
    <>
      <OtpComponent showModal={showModal} setShowModal={setShowModal} />
      <div className="min-h-screen pt-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-6/12 bg-gray-200 rounded-xl mx-auto shadow-lg overflow-hidden">
            <div className="w-full lg:w-2/3 py-12 px-10">
              <h2 className="text-2xl lg:text-3xl mb-4">Seller Sign In</h2>
              <p className="mb-4">Login with your account</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-3">
                  <input
                    type="email"
                    placeholder="email"
                    className="border border-gray-400 py-1 px-2 w-full rounded-md"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      onChange: (e) => setValue("email", e.target.value.trim()),
                    })}
                  />
                  {errors.email?.type == "required" && (
                    <h1 className="text-red-600">This field is required</h1>
                  )}
                </div>
                <div className="mt-3">
                  <input
                    type="password"
                    placeholder="password"
                    className="border border-gray-400 py-1 px-2 w-full rounded-md"
                    {...register("password", {
                      required: true,
                      onChange: (e) =>
                        setValue("password", e.target.value.trim()),
                    })}
                  />
                  {errors.password?.type == "required" && (
                    <h1 className="text-red-600">This field is required</h1>
                  )}
                </div>
                <div className="mt-5">
                  <button className="w-full bg-blue-500 py-3 text-center text-white">
                    Login
                  </button>
                </div>
                <div className="mt-2 w-80 flex justify-start">
                  <span className="text-blue-500 cursor-pointer">
                    Forgot password ?
                  </span>
                </div>
              </form>
            </div>
            <div className="w-full lg:w-1/3 bg-[url('/Home-selling-login.jpg')] flex flex-col justify-center p-10 bg-no-repeat bg-cover bg-center items-center">
              {/* <h1 className="text-white">Welcome</h1> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
