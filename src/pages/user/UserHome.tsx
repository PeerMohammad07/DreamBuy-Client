import { FlipWords } from '../../components/aceternity/FlipWord'
import BasicDemo from '../../components/common/Carousel'

const UserHome = () => {

  const words = ['HOUSES', 'APARTMENTS', 'FLATS']

  return (
    <>
      <div className="relative bg-[url('/homeImage.jpg')] bg-cover bg-center" style={{height:'500px'}}>
        {/* <img src="/homeImage.jpg" alt="Hero Image" className="w-full h-full object-cover" /> */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <div className="text-white font-bold p-4 rounded-lg mb-2 sm:mb-3 md:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center">
            <p>BUY. SELL.</p>
          </div>
          <div className="text-white font-bold p-4 rounded-lg mb-2 sm:mb-3 md:mb-4 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center">
            <p>WE ARE PROVIDING <FlipWords words={words} /></p>
          </div>
          <div className="text-white p-4 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center">
            <p>Find your place with an immersive photo experience and the most listings.</p>
          </div>
        </div>
      </div>



      {/* Card Part */}
      <div className='bg-gray-100'>
        <h1 className='font-openSans text-3xl text-center pt-5'>
          See How Dream Buy Can Help You
        </h1>

        <div className="flex justify-center items-center gap-8 py-10 flex-wrap">
          <div className="card1 rounded-md bg-white py-8 px-6 flex flex-col items-center w-80 h-96">
            <img src="/homepage-spot-agent-lg-1.webp" className='rounded w-40 h-40' alt="Buy a Home" />
            <div className='pt-5 text-center'>
              Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else.
            </div>
            <div className='pt-5 mt-auto'>
              <button className="bg-white text-blue-600 border border-blue-600 rounded-lg p-2  hover:bg-blue-600 hover:text-white transition-colors duration-300">
                <span className='font-bold'>Browse Home</span>
              </button>
            </div>
          </div>

          <div className="card3 rounded-md bg-white py-8 px-6 flex flex-col items-center w-80 h-96">
            <img src="/homepage-spot-sell-lg.jpg" className='rounded w-40 h-40' alt="Buy a Home" />
            <div className='pt-5 text-center'>
              No matter what path you take to sell your home, we can help you navigate a successful sale.
            </div>
            <div className='pt-10 mt-auto'>
              <button className="bg-white text-blue-600 border border-blue-600 rounded-lg p-2  hover:bg-blue-600 hover:text-white transition-colors duration-300">
                <span className='font-bold'>See Your Options</span>
              </button>
            </div>
          </div>

          <div className="card3 rounded-md bg-white py-8 px-6 flex flex-col items-center w-80 h-96">
            <img src="/rent.webp" className='rounded w-40 h-40' alt="Buy a Home" />
            <div className='pt-5 text-center'>
              We’re creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.
            </div>
            <div className='pt-5 mt-auto'>
              <button className="bg-white text-blue-600 border border-blue-600 rounded-lg p-2  hover:bg-blue-600 hover:text-white transition-colors duration-300">
                <span className='font-bold'>Find Rentals</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Showing Properties */}
      <div className='px-10 py-10'>
        <BasicDemo />
      </div>


    </>
  )
}

export default UserHome
