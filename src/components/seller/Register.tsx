import { SubmitHandler, useForm } from "react-hook-form"
import { sellerSignUp } from "../../api/sellerApi";
import OtpComponent, { OtpComponentProps } from "./OtpComponent";
import axios from "axios";
import { toast } from "react-toastify";
import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa6";
import { useState } from "react";

interface formData {
  name: string,
  email: string,
  phone: number,
  password: string,
  confirmPassword: string
}

const register = ({ showModal, setShowModal }: OtpComponentProps) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<formData>()

  const [closeEye, setCloseEye] = useState(true)

  const onSubmit: SubmitHandler<formData> = async (data: formData) => {
    try {
      const { name, email, phone, password } = data
      const value = {
        name,
        email,
        phone,
        password
      }
      const response = await sellerSignUp(value)
      if (response?.data.status && response.data.message == "seller created and otp sended successfully") {
        localStorage.setItem("otpTimer", "60")
        setShowModal(true)
      }
      console.log(response)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("cav");

        if (error.response?.data.message == "seller already exist with this email") {
          toast.error(error.response.data.message)
        }
      }
    }
  }

  const password = watch("password")

  const validateConfirmPassword = (value: string) => {
    if (value == password) {
      return true
    } else {
      return "Password is not match"
    }
  }


  return (
    <>
      <OtpComponent showModal={showModal} setShowModal={setShowModal} />
      <div className="min-h-screen pt-3 pd-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-11/12 lg:w-7/12 bg-gray-200 rounded-xl mx-auto shadow-lg overflow-hidden">
            <div className="w-full lg:w-1/2 bg-[url('/Home-selling.jpg')] flex flex-col justify-center p-10 bg-no-repeat bg-cover bg-center items-center">
              {/* <h1 className="text-white">Welcome</h1> */}
            </div>
            <div className="w-full lg:w-1/2 py-12 px-10">
              <h2 className="text-3xl mb-4">Seller Signup</h2>
              <p className="mb-4">Create Your account its free</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="name"
                    className="border border-gray-400 py-1 px-2 w-full rounded-md"
                    {...register("name", {
                      required: "name field is required",
                      minLength: {
                        value: 4,
                        message: "Name must be at least 4 characters long",
                      },
                      onChange: (e) => setValue("name", e.target.value.trim())
                    })
                    }
                  />
                  {errors.name?.type == "required" && (
                    <h1 className="text-red-600">{errors.name.message}</h1>
                  )}
                  {
                    errors.name?.message == "Name must be at least 4 characters long" && <h1 className="text-red-600">{errors.name.message}</h1>
                  }
                </div>
                <div className="mt-3">
                  <input
                    type="email"
                    placeholder="email"
                    className="border border-gray-400 py-1 px-2 w-full rounded-md"
                    {...register("email", {
                      required: "email field is required",
                      pattern: {
                        value: /^[^@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Enter a valid email address",
                      },
                      onChange: (e) => setValue("email", e.target.value.trim())
                    })
                    }
                  />
                  {errors.email && (
                    <h1 className="text-red-600">{errors.email.message}</h1>
                  )}
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="phone"
                    className="border border-gray-400 py-1 px-2 w-full rounded-md"
                    {...register("phone", {
                      required: true,
                      onChange: (e) => setValue("phone", e.target.value.trim())
                    })
                    }
                  />
                  {
                    errors.phone && <h1 className="text-red-600">{" Invalid"}</h1>
                  }
                </div>

                <div className="mt-5 w-full">
                  <div className="relative flex items-center">
                    <input
                      type={closeEye ? "password" : "text"}
                      placeholder="Password"
                      className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full pr-10"
                      {...register("password", {
                        required: true,
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/,
                        onChange: (e) => setValue("password", e.target.value.trim()),
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
                  {errors.password?.type == "required" ? (
                    <h1 className="text-red-600">This field is required</h1>
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

                <div className="mt-3">
                  <input
                    type="password"
                    placeholder="confirm password"
                    className="border border-gray-400 py-1 px-2 w-full rounded-md"
                    {...register("confirmPassword", {
                      required: true,
                      validate: validateConfirmPassword,
                      onChange: (e) => setValue("confirmPassword", e.target.value.trim()),
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
                  <button className="w-full bg-blue-500 py-3 text-center text-white">
                    Sign Up
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

export default register;
