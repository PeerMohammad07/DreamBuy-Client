import { useEffect, useState } from 'react';
import DashboardCount from '../../components/admin/DashboardCount';
import DashboardTable from '../../components/admin/DashboardTable';
import { getAllDashboardData, getMonthlyrevenue } from '../../api/adminApi';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';

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

  const monthlyRevenueData = monthlyRevenue.map(rev => rev.totalRevenue);
  const monthlyRevenueLabels = monthlyRevenue.map(rev => rev.month);
  const newUsers = userSellerGrowth.map((data)=> data.newUsers)
  const newSellers = userSellerGrowth.map((data)=> data.newSellers)
  newUsers.push(30)
  newUsers.push(10)
  newSellers.push(38)
  newSellers.push(28)
  monthlyRevenueData.push(300)
  monthlyRevenueLabels.push(7)

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

  return (
    <div className='bg-gray-50'>
      <div className='ps-10 pt-5'>
        <h1 className="text-3xl text-gray-700 font-extrabold font-rounded">Dashboard</h1>
        <p className='text-sm pt-2'>Whole data about your business here</p>
      </div>
      <DashboardCount countData={countData} />
      <div className='flex justify-center gap-10 pt-5'>
        <div className='w-1/3 pt-10'>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: countData.noOfUsers, label: 'Users' },
                  { id: 1, value: countData.noOfSellers, label: 'Sellers' },
                  { id: 2, value: countData.noOfPremiumUsers, label: 'Premium' },
                ],
              },
            ]}
            width={400}
            height={200}
            colors={['#e82e2e', '#35e6d4', '#058515']}
          />
          <div className="flex gap-8 pt-4 justify-center ps-5">
            <span className="flex items-center gap-2">
              <span style={{ backgroundColor: '#e82e2e' }} className='block w-3 h-3 rounded-full'></span>
               Users
            </span>
            <span className="flex items-center gap-2">
              <span style={{ backgroundColor: '#35e6d4' }} className='block w-3 h-3 rounded-full'></span>
              Sellers
            </span>
            <span className="flex items-center gap-2">
              <span style={{ backgroundColor: '#42eb42' }} className='block w-3 h-3 rounded-full'></span>
               Users
            </span>
          </div>
        </div>

        {/* Monthly Revenue Line Chart */}
        <div className='w-2/3 flex justify-center'>
          <LineChart
            xAxis={[{ data: monthlyRevenueLabels }]}
            series={[
              {
                data: monthlyRevenueData,
                area: true,
                label: 'Total Revenue',
                color: '#058515',
              },
            ]}
            width={500}
            height={300}
            margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
          />
        </div>
      </div>

      {/* User and Seller Growth Line Chart */}
      <h1 className='font-rounded text-center text-2xl py-10'>Users and Sellers Growth Rate</h1>
      <div className='flex justify-center pt-5'>
        <LineChart
          xAxis={[{ data: [1,2,3,4,5]}]}
          series={[
            {
              data: newUsers,
              label: 'New Users',
              color: '#e82e2e',
            },
            {
              data: newSellers,
              label: 'New Sellers',
              color: '#35e6d4',
            },
          ]}
          width={800}
          height={300}
          margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
        />
      </div>

      <div className='flex justify-around pt-5'>
        <DashboardTable data={countData.mostUsedAmenities} role={"amenities"} />
        <DashboardTable data={countData.mostUsedCategorys} role={"categories"} />
      </div>
    </div>
  );
};

export default Dashboard;
