import { useState } from 'react';
import { CardItem, CardContainer } from '../../components/aceternity/CardEffect';
import { loadStripe } from '@stripe/stripe-js';
import { getPremium } from '../../api/userApi';
import { useSelector } from 'react-redux';
import { rootState } from '../../Redux/store/store';

interface PremiumCardProps {
  theme: 'light' | 'dark';
  amount: number;
  month: string;
  index: number;
  onMakePayment: (index: number) => void;
}

const PremiumCard: React.FC<PremiumCardProps> = ({ theme, amount, month, index, onMakePayment }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDark = isHovered || theme === 'dark';

  const user = useSelector((prevState: rootState) => prevState.user.userData);

  return (
    <CardContainer className={`relative px-5 ${isDark ? 'shadow-lg transform translate-z-10 z-20 px-2' : 'z-10'}`}>
      <CardItem
        translateZ="100"
        className={`rounded-2xl px-5 py-10 shadow ${isDark ? 'bg-slate-900' : 'bg-white'} transition-transform transform ${isHovered ? 'scale-105' : 'scale-100'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`mt-5 flex justify-center ${isDark ? 'text-white' : 'text-black'}`}>
          <div className="text-6xl font-medium">{amount}</div>
          <div className="ml-2 flex flex-col">
            <p className="text-lg font-bold">₹</p>
            <p>{month}</p>
          </div>
        </div>
        <div className="ml-3 mt-8">
          <ul className="grid gap-4">
            {[
              "Chat",
              "Video Call",
              "Send images",
              "Get Owner Details"
            ].map((item, index) => (
              <li key={index} className={`flex items-center ${isDark ? 'text-white' : 'text-black'}`}>
                <svg className={`mr-3 h-4 w-4 fill-current ${index < 3 ? 'text-gray-400' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63 10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0 10.94 10.94 10.94 28.69 0 39.63z" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          {user?.isPremium ? (
            <button onClick={() => onMakePayment(index)} className={`w-full rounded-lg px-3 py-2 text-base font-medium ${isDark ? 'bg-white text-black hover:bg-gray-300' : 'bg-black text-white hover:bg-gray-800'}`}>
              Upgrade Plan
            </button>
          ) : (
            <button onClick={() => onMakePayment(index)} className={`w-full rounded-lg px-3 py-2 text-base font-medium ${isDark ? 'bg-white text-black hover:bg-gray-300' : 'bg-black text-white hover:bg-gray-800'}`}>
              Get Premium
            </button>
          )}
        </div>
      </CardItem>
    </CardContainer>
  );
};

const Premium = () => {
  const plan = [
    { id: 'price_1Phqj2E8SQUFEEKnKX69eHd5', price: "199", interval: 'weekly' },
    { id: 'price_1Phqk4E8SQUFEEKnmyG63CVk', price: "299", interval: 'monthly ' },
    { id: 'price_1PhqrfE8SQUFEEKnMGSgFef3', price: "799", interval: 'three_months' }
  ];

  const makePayment = async (index: number) => {
    const stripeId = import.meta.env.VITE_STRIPE_SECRET_KEY;
    const str = await loadStripe(stripeId);
    const response = await getPremium(plan[index]);
    if (response.status) {
      str?.redirectToCheckout({ sessionId: response.data.session.id });
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-8">
      {plan.map((p, index) => (
        <PremiumCard
          key={index}
          theme="light"
          amount={Number(p.price)}
          month={p.interval}
          index={index}
          onMakePayment={makePayment}
        />
      ))}
    </div>
  );
};

export default Premium;
