import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material';
import { styled } from "@mui/system";
import { getRentProperty, getSaleProperty } from '../../api/userApi';
import { PropertyRentData, PropertySaleData } from '../../components/common/Carousel';
import Swal from 'sweetalert2';
import { blockProperty } from '../../api/adminApi';

const PropertyManagement = () => {
  const [value, setValue] = useState(0);
  const [rentProperty, setRentProperty] = useState<PropertyRentData[]>([]);
  const [saleProperty, setSaleProperty] = useState<PropertySaleData[]>([]);
  const [property, setProperty] = useState<PropertyRentData[] | PropertySaleData[]>([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    try {
      const rentPropertyy = await getRentProperty();
      setRentProperty(rentPropertyy.data);
      const salePropertyy = await getSaleProperty();
      setSaleProperty(salePropertyy.data);
      setProperty(value === 0 ? rentPropertyy.data : salePropertyy.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      setProperty(rentProperty);
    } else if (newValue === 1) {
      setProperty(saleProperty);
    }
    setValue(newValue);
  };

  const handleBlock = async (id: string, status: boolean) => {
    try {
      const action = status ? "Unblock" : "Block";
      const confirmation = await Swal.fire({
        title: `${action} Property?`,
        text: `Are you sure you want to ${action.toLowerCase()} this property?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: `Yes, ${action.toLowerCase()} it!`,
        cancelButtonText: "Cancel",
      });

      if (confirmation.isConfirmed) {
        const response = await blockProperty(id, status);
        if (response.data === `${action.toLowerCase()}ed successfully`) {
          Swal.fire(`${action}ed!`, `The property has been ${action.toLowerCase()}ed.`, "success");
          if (value === 0) { 
            setProperty((prevProperties) =>
              (prevProperties as PropertyRentData[]).map((prop) =>
                prop._id === id ? { ...prop, propertyStatus: !status } : prop
              )
            );
          } else { 
            setProperty((prevProperties) =>
              (prevProperties as PropertySaleData[]).map((prop) =>
                prop._id === id ? { ...prop, propertyStatus: !status } : prop
              )
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = property.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const StyledTableContainer = styled(TableContainer)(() => ({
    minWidth: 650,
    overflowX: "auto",
  }));

  return (
    <>
      <div>
        <Box
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            sx={{
              '& .Mui-selected': {
                color: 'ActiveBorder',
              },
              '& .MuiTabs-indicator': {
                bgcolor: 'ActiveBorder',
              },
            }}
          >
            <Tab label="Rent property" />
            <Tab label="Sale property" />
          </Tabs>
        </Box>
      </div>

      <Paper>
        <StyledTableContainer>
          <Table aria-label="table template">
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: 'center' }}>No</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Property Name</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Type</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Price</TableCell>
                <TableCell style={{ textAlign: 'center' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((prop, index) => (
                <TableRow key={prop._id}>
                  <TableCell style={{ textAlign: 'center' }}>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{prop.propertyName}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{prop.propertyFor}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{prop.Price}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <button
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br shadow-md shadow-red-500/50 dark:shadow-md dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
                      onClick={() => handleBlock(prop._id, prop.propertyStatus)}
                    >
                      {prop.propertyStatus ? "Blocked" : "Block"}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <TablePagination
          component="div"
          count={property.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default PropertyManagement;
