import { useLocation, useNavigate } from 'react-router-dom'

const FourNotFourPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location.pathname.includes('/seller'))
  return (
    <div className='flex flex-col justify-center items-center h-screen text-white'>
        {
          location.pathname.includes('/seller')  &&
          <img src="/dreambuylogo.png" alt="Logo" className='h-12 mb-16' /> 
        }      
      <h1 className='text-9xl font-extrabold text-blue-400 mb-4 animate-bounce'>
        404
      </h1>
      <p className='text-xl text-black mb-6'>Sorry! Page Not Found</p>
      <button 
        onClick={() => 
          location.pathname.includes('seller') ? navigate('/seller') : location.pathname.includes('admin') ? navigate('/admin') : navigate('/')
          }
        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-300'
      >
        Go Back
      </button>
    </div>
  )
}

export default FourNotFourPage
