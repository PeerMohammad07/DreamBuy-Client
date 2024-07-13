const register = () => {
  return (
    <>
      <div className="flex justify-center items-center mt-20">
      <div className="flex w-full max-w-screen-md rounded-2xl bg-gray-300">
        <div className="left w-1/3">
          <img
            src="/hero.webp"
            className="mx-auto h-full rounded-2xl"
            alt="Hero Image"
          />
        </div>
        <div className="right w-2/3 flex items-center justify-center flex-col">
          <div className="text-center py-5">
            <h1 className="text-3xl font-bold mb-4">Seller Signup</h1>
            <form className="w-full max-w-md">
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  className="rounded-md mt-2 px-3 py-2 w-full max-w-sm"
                  placeholder="Seller Name"
                />
                <input
                  type="text"
                  className="rounded-md mt-2 px-3 py-2 w-full max-w-sm"
                  placeholder="Email"
                />
                <input
                  type="text"
                  className="rounded-md mt-2 px-3 py-2 w-full max-w-sm"
                  placeholder="Phone Number"
                />
                <input
                  type="password"
                  className="rounded-md mt-2 px-3 py-2 w-full max-w-sm"
                  placeholder="Password"
                />
                <input
                  type="password"
                  className="rounded-md mt-2 px-3 py-2 w-full max-w-sm"
                  placeholder="Confirm Password"
                />
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full max-w-sm">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default register;
