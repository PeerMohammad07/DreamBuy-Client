import { useEffect, useState } from 'react';
import DashboardCount from '../../components/admin/DashboardCount';
import DashboardTable from '../../components/admin/DashboardTable';
import { getAllDashboardData, getMonthlyrevenue } from '../../api/adminApi';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

interface Counts {
  noOfAmenities: number;
  noOfCategories: number;
  noOfRentProperties: number;
  noOfSaleProperties: number;
  noOfSellers: number;
  noOfUsers: number;
  mostUsedCategorys: { _id: string; count: number }[];
  mostUsedAmenities: { _id: string; count: number }[];
  noOfPremiumUsers: number;
  totalRevenue: [{ sum: number }];
}

interface GrowthData {
  year: number;
  month: number;
  newUsers: number;
  newSellers: number;
}

interface MonthlyRevenueData {
  year: number;
  month: number;
  totalRevenue: number;
}

const Dashboard = () => {
  const [countData, setCountData] = useState<Counts>({
    noOfAmenities: 0,
    noOfCategories: 0,
    noOfRentProperties: 0,
    noOfSaleProperties: 0,
    noOfSellers: 0,
    noOfUsers: 0,
    mostUsedCategorys: [],
    mostUsedAmenities: [],
    noOfPremiumUsers: 0,
    totalRevenue: [{ sum: 0 }]
  });

  const [userSellerGrowth, setUserSellerGrowth] = useState<GrowthData[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenueData[]>([]);

  const monthlyRevenueData = [0,0,0,0,0,0,0,0,0,0,0,0];
  monthlyRevenue.forEach((eachMonth) => {
    monthlyRevenueData[eachMonth.month] = eachMonth.totalRevenue;
  });
  monthlyRevenueData[7] = 500

  const monthlyRevenueLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const newUsers = [0,0,0,0,0,0,0,0,0,0,0,0];
  const newSellers = [0,0,0,0,0,0,0,0,0,0,0,0];
  userSellerGrowth.forEach((eachMonth) => {
    newUsers[eachMonth.month] = eachMonth.newUsers;
    newSellers[eachMonth.month] = eachMonth.newSellers;
  });
  newUsers[7] = 8
  newSellers[7] =1

  useEffect(() => {
    async function getData() {
      const response = await getAllDashboardData();
      const getMonthlyResponse = await getMonthlyrevenue();

      const validGrowthData = getMonthlyResponse.data.combinedGrowth.filter(
        (data: GrowthData) => data.year !== null && data.month !== null
      );

      const validRevenueData = getMonthlyResponse.data.monthlyRevenue.filter(
        (data: MonthlyRevenueData) => data.year !== null && data.month !== null
      );

      setUserSellerGrowth(validGrowthData);
      setMonthlyRevenue(validRevenueData);
      setCountData(response.data);
    }
    getData();
  }, []);

  const pieData = {
    labels: ['Users', 'Sellers', 'Premium'],
    datasets: [{
      data: [countData.noOfUsers, countData.noOfSellers, countData.noOfPremiumUsers],
      backgroundColor: ['#e82e2e', '#35e6d4', '#058515'],
    }],
  };

  const revenueData = {
    labels: monthlyRevenueLabels,
    datasets: [{
      label: 'Total Revenue',
      data: monthlyRevenueData,
      backgroundColor: 'rgba(5, 133, 21, 0.2)',
      borderColor: '#058515',
      borderWidth: 1,
      fill: true,
    }],
  };

  const growthData = {
    labels: monthlyRevenueLabels,
    datasets: [
      {
        label: 'New Users',
        data: newUsers,
        borderColor: '#e82e2e',
        backgroundColor: 'rgba(232, 46, 46, 0.2)',
        fill: true,
      },
      {
        label: 'New Sellers',
        data: newSellers,
        borderColor: '#35e6d4',
        backgroundColor: 'rgba(53, 230, 212, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className='bg-gray-50'>
  <div className='ps-4 pt-5 md:ps-10'>
    <h1 className="text-2xl md:text-3xl text-gray-700 font-extrabold font-rounded">Dashboard</h1>
    <p className='text-xs md:text-sm pt-2'>Whole data about your business here</p>
  </div>

  <DashboardCount countData={countData} />

  <div className='flex flex-col md:flex-row justify-center gap-10 pt-5'>
    {/* Pie Chart */}
    <div className='w-full md:w-1/3 pt-10 flex justify-center'>
      <div>
        <Pie data={pieData} width={250} height={120} />
        <div className="flex gap-6 pt-4 justify-center ps-5">
          <span className="flex items-center gap-2">
            <span style={{ backgroundColor: '#e82e2e' }} className='block w-3 h-3 rounded-full'></span>
            Users
          </span>
          <span className="flex items-center gap-2">
            <span style={{ backgroundColor: '#35e6d4' }} className='block w-3 h-3 rounded-full'></span>
            Sellers
          </span>
          <span className="flex items-center gap-2">
            <span style={{ backgroundColor: '#058515' }} className='block w-3 h-3 rounded-full'></span>
            Premium
          </span>
        </div>
      </div>
    </div>

    {/* Monthly Revenue Line Chart */}
    <div className='w-full md:w-2/3 flex justify-center'>
      <Line data={revenueData} width={300} height={150} />
    </div>
  </div>

  {/* Users and Sellers Growth Line Chart */}
  <h1 className='font-rounded text-center text-xl md:text-2xl pb-5 pt-8'>Users and Sellers Growth Rate</h1>
  <div className='flex justify-center pt-5'>
    <Line data={growthData} width={500} height={200} />
  </div>

  {/* Tables */}
  <div className='flex flex-col md:flex-row justify-around pt-5'>
    <div className='w-full md:w-1/2 px-4'>
      <DashboardTable data={countData.mostUsedAmenities} role={"amenities"} />
    </div>
    <div className='w-full md:w-1/2 px-4 mt-4 md:mt-0'>
      <DashboardTable data={countData.mostUsedCategorys} role={"categories"} />
    </div>
  </div>
</div>

  );
};

export default Dashboard;
