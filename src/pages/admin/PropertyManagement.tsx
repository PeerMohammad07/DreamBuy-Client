import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from "@mui/system";
import { getRentProperty, getSaleProperty } from '../../api/userApi';
import { PropertyRentData, PropertySaleData } from '../../components/common/PropertyCard';
import Swal from 'sweetalert2';
import { blockProperty } from '../../api/adminApi';


const PropertyManagement = () => {

  const [value, setValue] = useState(0);
  const [rentProperty, setRentProperty] = useState<PropertyRentData[]>([])
  const [saleProperty, setSaletProperty] = useState<PropertySaleData[]>([])
  const [property, setProperty] = useState<PropertyRentData[] | PropertySaleData[]>([])

  useEffect(() => {
    getProduct()
  }, [])

  async function getProduct() {
    try {
      const rentPropertyy = await getRentProperty()
      setRentProperty(rentPropertyy.data)
      const salePropertyy = await getSaleProperty()
      setSaletProperty(salePropertyy.data)
      setProperty(value === 0 ? rentPropertyy.data : salePropertyy.data); 
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue == 0) {
      setProperty(rentProperty)
    } else if (newValue == 1) {
      setProperty(saleProperty)
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
        console.log(response.data === `${action.toLowerCase()}ed successfully`);
                     
        if (response.data === `${action.toLowerCase()}ed successfully`) {
          Swal.fire(`${action}ed!`, `The property has been ${action.toLowerCase()}ed.`, "success");
          getProduct()
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
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
                {/* Add more columns as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Add table rows here */}
              {
                 property.map((prop, index) => (
                  <>
                    <TableRow>
                      <TableCell style={{ textAlign: 'center' }}>{index + 1}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{prop.propertyName}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{prop.propertyFor}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{prop.Price}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                      {prop.propertyStatus ? (
                      <button
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br shadow-md shadow-red-500/50 dark:shadow-md dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
                        onClick={() => handleBlock(prop._id,prop.propertyStatus)}
                      >
                        Blocked
                      </button>
                      ) : (
                      <button
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br shadow-md shadow-red-500/50 dark:shadow-md dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
                        onClick={() => handleBlock(prop._id,prop.propertyStatus)}
                      >
                        Block
                      </button>
                  )}
                  </TableCell>
                    </TableRow>
                  </>
                ))
              }
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Paper>
    </>
  )
}

export default PropertyManagement
