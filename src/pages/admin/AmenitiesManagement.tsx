import { useEffect, useState } from 'react';
import { addAmenitites, blockAmenitie, editAmenities, getAmenities } from '../../api/adminApi';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { styled } from '@mui/system';

import { ImBlocked } from "react-icons/im";
import { CgUnblock } from "react-icons/cg";
import { IoMdAddCircle } from 'react-icons/io';
import { FaEdit } from "react-icons/fa";
import AddAndEditAmenity, { AmenityFormData } from '../../components/admin/AddAndEditAmenity';
import Swal from 'sweetalert2';
import {toast} from "react-hot-toast"

export interface Iaminities {
  _id: string;
  name: string;
  isBlocked: boolean;
  createdAt: Date;
}

const AmenitiesManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [amenities, setAmenities] = useState<Iaminities[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<'add' | 'edit'>('add');
  const [initialData, setInitialData] = useState<AmenityFormData>({ name: '' });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      setIsLoading(true);
      const response = await getAmenities();
      setAmenities(response.data.amenities);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const openModal = (status: 'add' | 'edit', initialData: AmenityFormData = { id: '', name: '' }) => {
    setStatus(status);
    setInitialData(initialData);
    setIsModalOpen(true);
  };

  const handleBlock = async (_id: string, status: boolean) => {
    try {
      const action = status ? "Unblock" : "Block";
      const confirmation = await Swal.fire({
        title: `${action} Amenity?`,
        text: `Are you sure you want to ${action.toLowerCase()} this amenity?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: `Yes, ${action.toLowerCase()} it!`,
        cancelButtonText: "Cancel",
      });

      if (confirmation.isConfirmed) {
        const response = await blockAmenitie(_id, status);
        if (response.data === `${action.toLowerCase()}ed successfully`) {
          Swal.fire(`${action}ed!`, `The amenity has been ${action.toLowerCase()}ed.`, "success");
          fetchCategory();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = (state: { state: boolean; role: string }) => {
    setIsModalOpen(false);
  };

  const submitHandler = async (data: AmenityFormData) => {
    try {
      if (status === 'add') {
        const checkExist = amenities.some((ame:{name:string}) =>  ame.name.toLowerCase() === data.name.toLowerCase());
        console.log(checkExist,"checkexist")
        if(checkExist){
          toast.error("Ameniti already exist with this name")
          return
        }
        const response = await addAmenitites(data.name);
        if(response.data.amenity){
          toast.success("ameniti added successfully")
        }
      } else {
        const checkExist = amenities.some((ame:{_id:string,name:string}) => ame._id != data.id && ame.name.toLowerCase() === data.name.toLowerCase());
        if(checkExist){
          toast.error("Ameniti already exist with this name")
          return
        }   
        const response = await editAmenities(initialData?.id, data.name);
        console.log(response);
      }
      fetchCategory(); 
      closeModal({ state: false, role: '' });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = amenities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    minWidth: 650,
    overflowX: "auto",
  }));

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => openModal('add')}
          className="flex items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Add
          <IoMdAddCircle className="text-white ml-2" size={20} />
        </button>
      </div>
      <Paper>
        <StyledTableContainer>
          <Table aria-label="table template">
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: 'center' }}>No</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Amenity Name</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((prop, index) => (
                <TableRow key={prop._id}>
                  <TableCell style={{ textAlign: 'center' }}>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{prop.name}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <div className='flex justify-center items-center'>
                      {prop.isBlocked ? (
                        <ImBlocked onClick={() => handleBlock(prop._id, prop.isBlocked)} size={25} color='red' />
                      ) : (
                        <CgUnblock onClick={() => handleBlock(prop._id, prop.isBlocked)} size={30} color='green' />
                      )}
                      <FaEdit size={25} className='ms-5' onClick={() => openModal('edit', { id: prop._id, name: prop.name })} />
                    </div>
                    <AddAndEditAmenity
                      isOpen={isModalOpen}
                      onClose={closeModal}
                      status={status}
                      submitHandler={submitHandler}
                      initialData={initialData}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <TablePagination
          component="div"
          count={amenities.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default AmenitiesManagement;
