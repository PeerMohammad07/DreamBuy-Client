import { useEffect, useState } from "react";
import { getAllDashboardData } from "../../api/adminApi";

const Dashboard = () => {

  const [countData,setCountData] = useState()

  useEffect(()=>{
    async function getData(){
      const response = await getAllDashboardData()
      setCountData(response.data)
    }
    getData()
  },[])

  console.log(countData)

  return (
    <>
      <div>
        <h1>Dashbaord</h1>
        {/* <h1>{countData.noOfUsers}</h1>
        <h1>{countData.noOfSellers}</h1>
        <h1>{countData.noOfAmenities}</h1>
        <h1>{countData.noOfRentProperties}</h1> */}
      </div>
    </>
  );
};

export default Dashboard;
