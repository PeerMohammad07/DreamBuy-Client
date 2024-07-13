// import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/userApi";

const RegisterForm = () => {

  interface formData {
    name : string
    email:string
    password:string
    confirmPassword : string
  }

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<formData>();

  const password = watch("password");

  // validating the confirm password field
  const validateConfirmPassword = (value:string) => {    
    if (value === password) {
      return true; 
    } else {
      return "Passwords do not match"; 
    }
  };


  // Handling Form submiting
  const onSubmit:SubmitHandler<formData> = async (data:formData) => {
      try {
        const {name,email,password} = data

        const res = await signUp({
          name,
          email,
          password,
        })

        if(res.data.message == "User created and otp sended successfully"&& res.data.status){
          localStorage.setItem("otpTimer","60")
          navigate('/verifyOtp')
        }

      } catch (error) {
        
      } 
  };
 
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
                required: true,
                minLength: {
                  value: 4,
                  message: "Name must be at least 4 characters long",
                },
                onChange: (e) => setValue("name", e.target.value.trim()),
              })}
            />
            {errors.name?.type == "required" &&(
              <h1 className="text-red-600">This field is required</h1>
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
                required: true,
                pattern: {
                  value: /^[^@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
                onChange: (e) => setValue("email", e.target.value.trim()),
              })}
            />
            {errors.email?.type == "required" &&(
              <h1 className="text-red-600">This field is required</h1>
            )}
            {errors.email &&(
              <h1 className="text-red-600">{errors.email.message}</h1>
            )}
          </div>

          <div className="mt-5 w-80">
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full"
              {...register("password", {
                required: true,
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/,
                onChange: (e) => setValue("password", e.target.value.trim()),
              })}
            />
            {errors.password?.type == "required" ? (
              <h1 className="text-red-600">This field is required</h1>
            ) : (
              <></>
            )}
            {errors.password?.type == "pattern" && 
              <ul>
                {password.length<8&&<li className="text-red-600">* Minimum 8 characters required</li>}
                {password.length>15&&<li className="text-red-600">* Maximum 15 characters allowed</li>}
                {!/[A-Za-z]/.test(password)?<li className="text-red-600">* Must contain letters</li> : ''}
              </ul> 
            }
          </div>

          <div className="mt-5 w-80">
            <input
              type="password"
              placeholder="Confirm Password"
              className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full"
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

          <div className="mt-5 w-80">
            <button className="w-full bg-blue-500 py-3 text-center text-white rounded-lg shadow-md">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
