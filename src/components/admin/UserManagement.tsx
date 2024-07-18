import { useEffect, useState } from "react";
import { blockUser, getUsers } from "../../api/adminApi";
import UserTable from "../common/Table";
import Swal from "sweetalert2";

const UserManagement =() => {
  
  const [users,setUsers] = useState([])

  const fetchUser = async ()=> {
    try {
      const response = await getUsers();        
      setUsers(response.data.users);        
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
        console.log(response.data,`${action.toLowerCase()}ed successfully`);
        
        if (response.data === `${action.toLowerCase()}ed successfully`) {
          console.log("eneter");
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
      <UserTable handleBlock={handleBlock} data={users}/>
    </div>
    </>
  )
}

export default UserManagement
