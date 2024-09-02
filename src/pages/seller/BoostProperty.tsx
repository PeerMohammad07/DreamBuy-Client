import { useState,useEffect } from 'react';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { getBoostProperty } from '../../api/sellerApi';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useExpandContext } from '../../Context/ExpandContext';
import { useMediaQuery } from '@mui/system';


const BoostProperty = () => {
  const [selectedPlan, setSelectedPlan] = useState<number|null>(null);
  const [paymentButton, setPaymentButton] = useState(localStorage.getItem('PaymentButton') || 'false');
  const { id } = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'PaymentButton') {
        setPaymentButton(event.newValue || 'false');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      if (paymentButton === 'true') {
        localStorage.setItem('PaymentButton', 'false');
        setPaymentButton('false');
      }
    };
  }, [paymentButton]);

  const { setExpanded } = useExpandContext();


  const matches = useMediaQuery('(max-width:768px)');
  useEffect(() => {
    if (matches) {
      setExpanded(false);
    }
    return () => {
      setExpanded(true);
    };
  }, [setExpanded,matches]);

  const boostPlan = async ()=>{
    const stripeId = import.meta.env.VITE_STRIPE_SECRET_KEY
    if(paymentButton=="true"){
      return toast.error("Already payment is proceeding")
    }
    if(selectedPlan!=null&&selectedPlan>=0&&plans[selectedPlan]){
      const str = await loadStripe(stripeId);
      const response = await getBoostProperty(plans[selectedPlan].id,plans[selectedPlan].duration,id,dispatch);
      if (response.data.session.status) {
        localStorage.setItem("PaymentButton","true")
        str?.redirectToCheckout({ sessionId: response.data.session.id });
      }else{
        toast.error(response.data.session.message)
      }
    }
  }

  const plans = [
    {
      id: 'price_1PqdDxE8SQUFEEKn2COJUaHX',
      duration: "1 Week",
      price: "₹99",
      features: [
        { icon: <MdOutlineRemoveRedEye className="text-green-400 text-2xl" />, text: "Increase Visibility" },
        { icon: <BsGraphUpArrow className="text-green-400 text-2xl" />, text: "Attract More Buyers" },
        { icon: <FaRegStar className="text-green-400 text-2xl" />, text: "Stand Out" }
      ]
    },
    {
      id: 'price_1PqdEME8SQUFEEKn2BqNWkcQ',
      duration: "1 Month",
      price: "₹299",
      features: [
        { icon: <MdOutlineRemoveRedEye className="text-orange-400 text-2xl" />, text: "Increase Visibility" },
        { icon: <BsGraphUpArrow className="text-orange-400 text-2xl" />, text: "Attract More Buyers" },
        { icon: <FaRegStar className="text-orange-400 text-2xl" />, text: "Stand Out" }
      ]
    },
    {
      id : 'price_1PqdEyE8SQUFEEKnBqhWTHAC',
      duration: "3 Months",
      price: "₹999",
      features: [
        { icon: <MdOutlineRemoveRedEye className="text-blue-400 text-2xl" />, text: "Increase Visibility" },
        { icon: <BsGraphUpArrow className="text-blue-400 text-2xl" />, text: "Attract More Buyers" },
        { icon: <FaRegStar className="text-blue-400 text-2xl" />, text: "Stand Out" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6">
      <h1 className="text-3xl text-gray-400 font-bold mb-4 text-center">
        Why Boost Your Property
      </h1>
      <p className="text-gray-200 text-base text-center leading-relaxed max-w-4xl mb-8">
        Boost your property’s visibility with prominent home page placement, priority listing with a standout border, and a featured spot in a rotating premium carousel, ensuring maximum exposure and attention.
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-6 p-5">
        {plans.map((plan, index) => (
          <div
            key={index}
            onClick={() => 
              selectedPlan == index ? setSelectedPlan(null):
              setSelectedPlan(index)}
            className={`w-full rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-110 ${selectedPlan === index ? 'border-4 border-blue-400' : ''}`}
          >
            <div className={`p-6 ${index === 0 ? 'bg-green-800' : index === 1 ? 'bg-orange-800' : 'bg-blue-800'} text-white`}>
              <h2 className="text-2xl font-bold">{plan.duration}</h2>
              <p className="text-3xl">{plan.price}</p>
            </div>
            <div className="p-6 bg-gray-800 text-gray-200">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center space-x-4 mb-4">
                  {feature.icon}
                  <p className="text-lg">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
      onClick={()=>{
        if(selectedPlan==null||selectedPlan<0){
          toast.error("Please select a plan")
        }else{
          boostPlan()
        }
      }}
        className="mt-5 bg-gradient-to-b from-[#e87b37] to-[#E62C03] rounded-lg shadow-md text-white cursor-pointer  font-sans h-10 leading-10 outline-none overflow-hidden px-8 py-0 relative text-center touch-manipulation user-select-none transition-shadow duration-200 hover:shadow-lg flex items-center justify-center space-x-2"
      >
        <span className="flex-1 text-center">Boost</span>
      </button>
    </div>
  );
}

export default BoostProperty;
