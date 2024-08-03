import { Skeleton, TableCell, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import UserTable from '../common/Table';
import { addCategory, blockCategory, editCategory, getCategory } from '../../api/adminApi';
import Swal from 'sweetalert2';
import { IoMdAddCircle } from "react-icons/io";
import AddAndEditCategory from './AddAndEditCategory';
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";


const CategoryManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [addEditModalOpen, setAddEditModalOpen] = useState({
    state: false,
    role: '',
    initialData: { id: '', name: '', description: '' }
  });

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      setIsLoading(true);
      const response = await getCategory();
      setCategory(response.data.category);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleBlock = async (_id: string, status: boolean) => {
    try {
      const action = status ? "Unblock" : "Block";
      const confirmation = await Swal.fire({
        title: `${action} Category?`,
        text: `Are you sure you want to ${action.toLowerCase()} this category?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: `Yes, ${action.toLowerCase()} it!`,
        cancelButtonText: "Cancel",
      });

      if (confirmation.isConfirmed) {
        const response = await blockCategory(_id, status);
        if (response.data === `${action.toLowerCase()}ed successfully`) {
          Swal.fire(`${action}ed!`, `The user has been ${action.toLowerCase()}ed.`, "success");
          fetchCategory();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = () => {
    setAddEditModalOpen({ state: false, role: '', initialData: { id: '', name: '', description: '' } });
  };

  const editModal = (id: string, name: string, description: string | undefined) => {
    setAddEditModalOpen({
      state: true,
      role: 'edit',
      initialData: { id: id, name, description: description || '' }
    });
  };


  return (
    <>
      <div className="bg-gray-100">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
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
          ))
        ) : (
          <>
            <div className="container bg-white">
              <div className="flex justify-end ">
                <button
                  onClick={() => setAddEditModalOpen({ state: true, role: 'add', initialData: { id: '', name: '', description: '' } })}
                  className="flex items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Add
                  <IoMdAddCircle className="text-white ml-2" size={20} />
                </button>
              </div>
            </div>
            <UserTable onEdit={editModal} handleBlock={handleBlock} data={category} role={"category"} acceptOrDecline={() => { }} />
          </>
        )}
      </div>

      {addEditModalOpen.state && (
        <AddAndEditCategory
          isOpen={addEditModalOpen.state}
          onClose={handleModalClose}
          status={addEditModalOpen.role}
          submitHandler={async (data) => {            
            if (data?.id == '') {
              const response = await addCategory(data)
              if (response) {
                setAddEditModalOpen({
                  state: false,
                  role: '',
                  initialData: { id: '', name: '', description: '' }
                })
                toast.success("category added successfully")
                fetchCategory()
              }
            } else {
              const response = await editCategory(data)
              if (response) {
                setAddEditModalOpen({
                  state: false,
                  role: '',
                  initialData: { id: '', name: '', description: '' }
                })
                fetchCategory()
                toast.success("edit category successfully")
              }
            }
          }}
          initialData={addEditModalOpen.initialData}
        />
      )}
    </>
  );
};

export default CategoryManagement;
