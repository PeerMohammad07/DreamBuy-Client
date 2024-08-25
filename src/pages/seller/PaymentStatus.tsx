import {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { boostProperty } from '../../api/sellerApi';

const PaymentStatus = () => {
  const location = useLocation();
  const queryParams = location.search;

  const getQueryParam = (param:string) => {
    const params = new URLSearchParams(queryParams);
    return params.get(param);
  };


  const status = getQueryParam('status');
  const propertyId = getQueryParam('id')
  const type = getQueryParam('type')
  
  const boostPropertyPayment = async ()=>{
    if(status&&propertyId&&type){
      const response = await boostProperty(propertyId,type)
      console.log(response)
      if(response.data.response.status){
        toast.success("your property boosted ⚡")
      }
    }else if(status=='false'){
      toast.error("failed to boost your property try again")
    }
  }

  useEffect(()=>{
    if(status=='true'||status=='false'){
      boostPropertyPayment()
    }
  },[status,propertyId,type])


  return (
    <div>
      <div className="bg-gray-900 h-screen">
        <div className="bg-gray-900 p-6  md:mx-auto">
          {status ? (
            <div>
              <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                <path fill="currentColor"
                  d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                </path>
              </svg>
              <div className="text-center">
                <h3 className="md:text-2xl text-base text-white font-semibold text-center">Payment Done!</h3>
                <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                <p className='text-green-200'> Have a great day!  </p>
                <div className="py-10 text-center">
                  <Link to={'/seller/property'} className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO BACK
                  </Link>
                </div>
              </div>
            </div>) : (
            <div>
              <svg viewBox="0 0 24 24" className="text-red-600 w-16 h-16 mx-auto my-6">
                <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0ZM13,18h-2v-2h2Zm0-4h-2V6h2Z"></path>
              </svg>
              <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Canceled</h3>
                <p className="text-gray-600 my-2">Please try again later </p>

                <div className="py-10 text-center">
                  <Link to={'/seller/property'} className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO BACK
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PaymentStatus
