// import React from 'react'


const LoginForm = () => {

  return (
    <>
      <div className='w-full justify-center '>
        <h1 className='text-center mt-5 text-3xl mb-4 text-black leading-loose font-serif'>User Login</h1>
        <form action="#" className='flex flex-col items-center'>
          <div className='mt-5 w-80'> 
            <input
            type="email"
            placeholder="Email"
            name="email"
            className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full"
            />
          </div>
        
        <div className='mt-5 w-80'>
          <input
          type="password"
          placeholder="Password"
          name="password"
          className="border border-gray-400 rounded-lg shadow py-2 px-4 w-full"
          />
        </div>
        <div className='mt-2 w-80 flex justify-start'> 
          <span className='text-blue-500 cursor-pointer'>Forgot password ?</span>
        </div>


        <div className='mt-5 w-80'>
          <button className='w-full bg-blue-500 py-3 text-center text-white rounded-lg shadow-md'>Login</button>
        </div>

 
        </form>
      </div>
    </>
  )
}

export default LoginForm
