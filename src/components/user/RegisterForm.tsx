// import React from 'react'
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const validateConfirmPassword = (value:string) => {
    if (value === password) {
      return true; 
    } else {
      return "Passwords do not match"; 
    }
  };

  const onSubmit = (data: object) => {
    console.log(data);
    
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
              placeholder="username"
              className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full"
              {...register("userName", {
                required: true,
                onChange: (e) => setValue("userName", e.target.value.trim()),
              })}
            />
            {errors.userName?.type == "required" ? (
              <h1 className="text-red-600">This field is required</h1>
            ) : (
              <></>
            )}
          </div>

          <div className="mt-5 w-80">
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full"
              {...register("email", {
                required: true,
                onChange: (e) => setValue("email", e.target.value.trim()),
              })}
            />
            {errors.email?.type == "required" ? (
              <h1 className="text-red-600">This field is required</h1>
            ) : (
              <></>
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
            {errors.password?.type == "pattern" ? (
              <>
                <ul>
                  <li className="text-red-600">
                    * Minimum 8 characters, Maximum 15
                  </li>
                  <li className="text-red-600">* Must Start with Alpha</li>
                  <li className="text-red-600">
                    * Must have mixed Alpha-Numeric
                  </li>
                </ul>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="mt-5 w-80">
            <input
              type="password"
              placeholder="Confirm Password"
              className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full"
              {...register("confirmPassword", {
                required: true,
                validate: validateConfirmPassword,
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/,
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
