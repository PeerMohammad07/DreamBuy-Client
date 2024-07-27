import React, { useState } from "react";
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
import { MdCancel, MdDoNotDisturbAlt, MdOutlineHourglassEmpty, MdVerified } from "react-icons/md";
import { CgMore } from "react-icons/cg";
import MoreDetails, { ISeller } from "../admin/MoreDetails";
import { AiOutlineCloseCircle } from "react-icons/ai";


export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  isBlocked: boolean;
  otpVerified: boolean;
  __v: number;
  phone?: number;
  kycVerified?:
  | "Not Verified"
  | "Verification Pending"
  | "Verified"
  | "Cancelled";
  verificationImage?: string;
  verificationImageUrl?: string;
  description?: string
}

interface TableData {
  data: User[];
  handleBlock: (id: string, status: boolean) => void;
  role: string;
  acceptOrDecline: (id: string, status: string) => void;
}


const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  minWidth: 650,
  overflowX: "auto",
}));

const UserTable: React.FC<TableData> = ({ data, handleBlock, role, acceptOrDecline }) => {
  const [moreDetails, setMoreDetails] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<ISeller | null>(null);

  const handleMoreDetails = (user: User) => {
    const seller: ISeller = {
      ...user,
      phone: user.phone ?? 0,
      kycVerified: user.kycVerified ?? "Verification Pending",
      verificationImage: user.verificationImage ?? "image_path",
      verificationImageUrl: user.verificationImageUrl ?? "image_url",
    };
    setSelectedSeller(seller);
    setMoreDetails(true);
  };



  return (
    <Paper>
      <StyledTableContainer>
        <Table aria-label="user details table">
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: 'center' }}>ID</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Name</TableCell>
              {role !== "category" && <TableCell style={{ textAlign: 'center' }}>Email</TableCell>}
              {role === "category" && <TableCell style={{ textAlign: 'center' }}>Description</TableCell>}
              {role !== "category" && <TableCell style={{ textAlign: 'center' }}>Status</TableCell>}
              <TableCell style={{ textAlign: 'center' }}>Action</TableCell>
              {role === "seller" && <TableCell style={{ textAlign: 'center' }}>More</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell style={{ textAlign: 'center' }}className="whitespace-nowrap sm:hidden md:table-cell">
                  {index + 1}
                </TableCell>
                <TableCell style={{ textAlign: 'center' }} className="whitespace-nowrap">{user.name}</TableCell>
                <TableCell style={{ textAlign: 'center' }} className="whitespace-nowrap hidden sm:table-cell">
                  {role == "category" ? user.description : user.email}
                </TableCell>
                {role != "category" && <TableCell style={{ textAlign: 'center' }}className="whitespace-nowrap">
                  {role == "seller" ? (
                    (user.kycVerified == "Cancelled" && (
                      <span className="inline-flex items-center px-2 py-1 bg-red-200 rounded-full text-sm font-medium text-red-900">
                        <MdCancel className="mr-1" />
                        Cancelled
                      </span>
                    )) ||
                    (user.kycVerified == "Not Verified" && (
                      <span className="inline-flex items-center px-2 py-1 bg-red-100 rounded-full text-sm font-medium text-red-800">
                        <AiOutlineCloseCircle className="mr-1" />
                        Not Verified
                      </span>
                    )) ||
                    (user.kycVerified == "Verification Pending" && (
                      <span className="inline-flex items-center px-2 py-1 bg-yellow-100 rounded-full text-sm font-medium text-yellow-800">
                        <MdOutlineHourglassEmpty className="mr-1" />
                        Verification Pending
                      </span>
                    )) ||
                    (user.kycVerified == "Verified" && (
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 rounded-full text-sm font-medium text-green-800">
                        <MdVerified className="mr-1" />
                        Verified
                      </span>
                    ))
                  ) : user.otpVerified ? (
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
                </TableCell>}
                <TableCell style={{ textAlign: 'center' }} className="whitespace-nowrap">
                  {
                    role == "category" &&
                    <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 ">
                      Edit
                    </button>
                  }

                  {user.isBlocked ? (
                    <button
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br shadow-md shadow-red-500/50 dark:shadow-md dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
                      onClick={() => handleBlock(user._id, user.isBlocked)}
                    >
                      Blocked
                    </button>
                  ) : (
                    <button
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br shadow-md shadow-red-500/50 dark:shadow-md dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
                      onClick={() => handleBlock(user._id, user.isBlocked)}
                    >
                      Block
                    </button>
                  )}
                </TableCell>
                {role === "seller" && (
                  <TableCell style={{ textAlign: 'center' }}>
                    <CgMore
                      style={{ fontSize: "32px" }}
                      onClick={() => handleMoreDetails(user)}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      {selectedSeller && (
        <MoreDetails
          onClose={() => setMoreDetails(false)}
          open={moreDetails}
          onAccept={acceptOrDecline}
          seller={selectedSeller}
        />
      )}
    </Paper>
  );
};

export default UserTable;
