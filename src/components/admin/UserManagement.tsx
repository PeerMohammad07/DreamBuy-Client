import { useEffect, useState } from "react";
import { blockUser, getUsers } from "../../api/adminApi";
import UserTable from "../common/Table";
import Swal from "sweetalert2";
import { Skeleton, TableCell, TableRow } from "@mui/material";

const UserManagement =() => {
  
  const [users,setUsers] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  const fetchUser = async ()=> {
    try {
      setIsLoading(true)
      const response = await getUsers();        
      setUsers(response.data.users); 
      setIsLoading(false)       
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchUser()
  },[])
  
  const handleBlock = async (_id: string, status: boolean) => {
    try {
      const action = status ? "Unblock" : "Block";
      const confirmation = await Swal.fire({
        title: `${action} User?`,
        text: `Are you sure you want to ${action.toLowerCase()} this user?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: `Yes, ${action.toLowerCase()} it!`,
        cancelButtonText: "Cancel",
      });

      if (confirmation.isConfirmed) {
        const response = await blockUser(_id, status);        
        if (response.data === `${action.toLowerCase()}ed successfully`) {
          Swal.fire(`${action}ed!`, `The user has been ${action.toLowerCase()}ed.`, "success");
          fetchUser()
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
        ))}</> : <UserTable onEdit={()=>{}} handleBlock={handleBlock} data={users} role={"user"}  acceptOrDecline={()=>{}}/>

      }
    </div>
    </>
  )
}

export default UserManagement
