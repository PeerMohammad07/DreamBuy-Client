import React from 'react';
import { Link } from 'react-router-dom';

interface IPremiumSubscription {
  subscriptionType?: 'weekly' | 'monthly' | 'three_months';
  startDate?: Date;
  expiryDate?: Date;
}

interface User {
  _id: string
  name: string;
  email: string;
  password: string;
  isBlocked: boolean;
  otpVerified: boolean;
  image?: string;
  isPremium: boolean;
  premiumSubscription?: IPremiumSubscription;
}

interface PlanProps {
  user: User | null;
}

const Plan: React.FC<PlanProps> = ({ user }) => {
  function subscriptionPrice(plan: string | undefined): number {
    switch (plan) {
      case 'weekly':
        return 199;
      case 'monthly':
        return 299;
      case 'three_months':
        return 799;
      default:
        return 0;
    }
  }

  const formatDate = (date: Date | undefined): string => {
    return date ? new Date(date).toLocaleDateString() : 'N/A';
  };

  return (
    <div className="max-w-sm mx-auto my-2">
      <div className="bg-white shadow-lg rounded-lg p-6">
        {user && user.premiumSubscription ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Plan Details</h2>
            <div className="mb-4 flex justify-around">
              <div>
              <p className="text-gray-600">Validity:</p>
              <p className="text-lg font-semibold">{user.premiumSubscription.subscriptionType}</p>
              </div>
              <div>
              <p className="text-gray-600">Price:</p>
              <p className="text-lg font-semibold">₹{subscriptionPrice(user.premiumSubscription.subscriptionType)}</p>
              </div>
            </div>
            <div className="flex justify-around">
            <div className="mb-4">
              <p className="text-gray-600">Start Date:</p>
              <p className="text-lg font-semibold">{formatDate(user.premiumSubscription.startDate)}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">Expiry Date:</p>
              <p className="text-lg font-semibold">{formatDate(user.premiumSubscription.expiryDate)}</p>
            </div>
            </div>
            <Link to="/premium">
              <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                Upgrade
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className='flex flex-col items-center justify-center h-full'>
              <p className='text-center text-xl font-bold mb-4'>No Plans available</p>
              <Link to={'/premium'}>
                <button className="bg-orange-500 rounded-xl h-10 px-4 text-white hover:shadow-lg hover:bg-orange-500 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center">
                  Get Premium
                </button>
              </Link>
            </div>

          </>
        )}
      </div>
    </div>
  );
}

export default Plan;
