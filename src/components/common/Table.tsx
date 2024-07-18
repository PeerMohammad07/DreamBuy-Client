import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { SiTicktick } from "react-icons/si";
import { MdDoNotDisturbAlt } from "react-icons/md";


export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  isBlocked: boolean;
  otpVerified: boolean;
  __v: number;
}

interface tableData {
  data: User[];
  handleBlock: (id: string, status: boolean) => void;
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  minWidth: 650,
}));



const UserTable: React.FC<tableData> = ({ data, handleBlock }) => {
  return (
    <StyledTableContainer>  
      <Table aria-label="user details table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.otpVerified ? (
                  <span className="inline-flex items-center px-2 py-1 bg-green-100 rounded-full text-sm font-medium text-green-800">
                    <SiTicktick />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 bg-red-100 rounded-full text-sm font-medium text-red-800">
                    <MdDoNotDisturbAlt />
                    Not Verified
                  </span>
                )}
              </TableCell>
              <TableCell>
                {user.isBlocked ? (
                  <button
                    className="bg-red-600 w-16 p-1 rounded-lg"
                    onClick={() => handleBlock(user._id,user.isBlocked)}
                  >
                    Blocked
                  </button>
                ) : (
                  <button
                    className="bg-red-600 w-16 p-1 rounded-lg"
                    onClick={() => handleBlock(user._id,user.isBlocked)}
                  >
                    Block
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default UserTable;
