import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react';

// Define interfaces for props
interface TableData {
  _id: string;
  count: number;
}

interface DashboardTableProps {
  data: TableData[];
  role: string;
}

const DashboardTable: React.FC<DashboardTableProps> = ({ data, role }) => {
  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8">
      <h1 className='font-rounded text-lg text-center pb-5'>Most used {role}</h1>
      <div className="overflow-x-auto">
        <TableContainer component={Paper} sx={{ maxWidth: 460, maxHeight: 250, overflow: 'auto' }}>
          <Table aria-label={`Most used ${role} table`}>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>{item.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DashboardTable;
