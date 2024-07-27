const DetailLogin = () => {
  return (
    <>
      <div className="hero h-screen  w-full flex flex-col md:flex-row justify-center items-center bg-blue-900">
        {/* Hero text */}
        <div className="flex flex-col md:flex-row md:justify-start md:items-start p-4 md:p-8 text-center md:text-left">
          <div className="md:py-44 md:pl-30 py-14">
            <h1 className="mb-5 text-2xl md:text-5xl font-bold decoration-double text-white">
              Hello there...
            </h1>
            <p className="text-lg md:text-5xl font-light text-white">
              List your property on DreamBuy
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="flex justify-center items-center w-full md:w-auto">
          <div className="text-gray-700 bg-white shadow-md lg:w-96 w-full max-w-md rounded-xl p-6 md:p-10">
            <h5 className="mb-4 font-sans text-xl font-semibold text-blue-gray-900">
              Let's partner to unlock a world of opportunities and growth
            </h5>
            <p className="font-sans text-base font-light leading-relaxed mb-2">
              ✓ Full control over the Property and finance
            </p>
            <p className="font-sans text-base font-light leading-relaxed mb-2">
              ✓ Registration is free
            </p>
            <p className="font-sans text-base font-light leading-relaxed mb-4">
              ✓ Anytime cancel the property
            </p>
            <div className="flex justify-center">
              <a href="/seller/register">
                <button className="w-full md:w-40 h-14 px-4 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-md focus:outline-none transform hover:scale-105 transition-transform">
                  Get Started
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailLogin
