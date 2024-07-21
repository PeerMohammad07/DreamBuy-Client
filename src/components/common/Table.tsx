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
import MoreDetails, { ISeller } from "../seller/MoreDetails";
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

const UserTable: React.FC<TableData> = ({ data, handleBlock, role ,acceptOrDecline}) => {
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
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
              {role === "seller" && <TableCell>More</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell className="whitespace-nowrap sm:hidden md:table-cell">
                  {index + 1}
                </TableCell>
                <TableCell className="whitespace-nowrap">{user.name}</TableCell>
                <TableCell className="whitespace-nowrap hidden sm:table-cell">
                  {user.email}
                </TableCell>
                <TableCell className="whitespace-nowrap">
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
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {user.isBlocked ? (
                    <button
                      className="bg-red-600 hover:bg-red-400 text-white w-16 p-1 rounded-lg"
                      onClick={() => handleBlock(user._id, user.isBlocked)}
                    >
                      Blocked
                    </button>
                  ) : (
                    <button
                      className="bg-red-600 hover:bg-red-400 text-white w-16 p-1 rounded-lg"
                      onClick={() => handleBlock(user._id, user.isBlocked)}
                    >
                      Block
                    </button>
                  )}
                </TableCell>
                {role === "seller" && (
                  <TableCell>
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
