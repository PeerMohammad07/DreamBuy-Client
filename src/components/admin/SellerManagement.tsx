import UserTable from '../common/Table'
import { blockSeller, kycStatusUpdate } from '../../api/sellerApi'
import { useEffect, useState } from 'react'
import { Skeleton, TableCell, TableRow } from '@mui/material'
import Swal from 'sweetalert2'
import { sellerLogin } from '../../Redux/slice/sellerAuthSlice'
import { useDispatch } from 'react-redux'
import { getSeller } from '../../api/adminApi'

const SellerManagement = () => {

  const [sellers,setSellers] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const fetchSeller =async ()=>{
    try {
      setIsLoading(true)
      let val = await getSeller()
      setIsLoading(false)
      setSellers(val.data.sellers)  
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=> {
     fetchSeller()    
  },[])


  const acceptOrDecline = async (id:string,status:string)=> {
    try {      
      const response = await kycStatusUpdate(id,status)
      if(response){
        dispatch(sellerLogin(response.data.response))
      }
      fetchSeller()
    } catch (error) {
      console.log(error);
    }
  }

  const handleBlock = async (_id: string, status: boolean) => {
    try {
      const action = status ? "Unblock" : "Block";
      const confirmation = await Swal.fire({
        title: `${action} Seller?`,
        text: `Are you sure you want to ${action.toLowerCase()} this seller?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: `Yes, ${action.toLowerCase()} it!`,
        cancelButtonText: "Cancel",
      });

      if (confirmation.isConfirmed) {
        const response = await blockSeller(_id, status);        
        console.log(response)
        if (response&&response.data === `${action.toLowerCase()}ed successfully`) {
          Swal.fire(`${action}ed!`, `The seller has been ${action.toLowerCase()}ed.`, "success");
          setSellers((prevState:any) =>
            prevState.map((seller:any) =>
              seller._id === _id
                ? { ...seller, isBlocked: !status }
                : seller
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-gray-100">
        {
          isLoading ? <>{Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton variant="text" width={40} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={100} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={150} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={120} />
              </TableCell>
              <TableCell>
                <Skeleton variant="rectangular" width={100} height={40} />
              </TableCell>
            </TableRow>
          ))}</> : <UserTable onEdit={()=>{}} handleBlock={handleBlock} data={sellers} role={"seller"} acceptOrDecline={acceptOrDecline}/>  
        }
    </div>
    </>
  )
}

export default SellerManagement
