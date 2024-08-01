import { FlipWords } from '../../components/aceternity/FlipWord'
import BasicDemo from '../../components/common/PropertyCard'

const UserHome = () => {

  const words = ['HOUSES','APARTMENTS','FLATS']

  return (
    <>
      <div className="relative">
        <img src="/hero.webp" alt="Hero Image" className="w-full h-auto" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center">
          <div className="text-white font-bold p-4 rounded-lg mb-2 sm:mb-3 md:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            <p>BUY. SELL.</p>
          </div>
          <div className="text-white font-bold p-4 rounded-lg mb-2 sm:mb-3 md:mb-4 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            <p>WE ARE PROVIDING <FlipWords words={words}/></p>
          </div>
          <div className="text-white p-4 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            <p>Find your place with an immersive photo experience and the most listings.</p>
          </div>
        </div>
      </div>


      <div className='px-10 py-10'>
        <BasicDemo />
      </div>
    </>
  )
}

export default UserHome
