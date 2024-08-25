import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import { updateKycImage } from "../../api/sellerApi";
import { Buffer } from "buffer";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { sellerLogin } from "../../Redux/slice/sellerAuthSlice";
import { Grid } from "react-loader-spinner";

interface KycVerificationModalProps {
  open: boolean;
  onClose: () => void;
  id: string;
}

const KycVerificationModal: React.FC<KycVerificationModalProps> = ({
  open,
  onClose,
  id,
}) => {
  // Modal Styling
  const customStyles = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute" as "absolute",
    width: 650,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Handling image change
  const handleFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // taking the buffer of the file for storing in s3bucket
  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as ArrayBuffer);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  // Submit the KYC image
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      event.stopPropagation()
      setLoading(true);
      if (file) {
        const buffer = await readFileAsArrayBuffer(file);
        const base64String = Buffer.from(buffer).toString("base64");
        const response = await updateKycImage(base64String, file.type, id);
        if (response?.data.message == "Kyc image added") {
          console.log(response.data);
          dispatch(sellerLogin(response.data.seller));
          onClose();
          setLoading(false);
          toast.success("KYC image updated wait for verification");
        }   
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Modal open={open} onClose={onClose}>
      <Box sx={customStyles}>
        {loading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 10, 
          }}>
            <Grid
              visible={true}
              height="50"
              width="50"
              color="#4fa94d"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="grid-wrapper"
            />
          </div>
        )}
        <div>
          <h1 className="text-center text-2xl font-bold">KYC Verification</h1>
          <ul className="text-left list-disc list-inside text-gray-700 space-y-3 mb-8 px-8 md:px-16 pt-8">
            <li>Upload a clear image of your government-issued ID or passport.</li>
            <li>Ensure that the image is high-quality and all details are clearly visible.</li>
          </ul>
          <div className="text-gray-600 mb-8 text-center font-medium">
            Our team will review the uploaded document for verification purposes. This is a standard procedure to ensure the safety and security of our platform.
          </div>
          <div className="flex justify-center">
            <div className="space-y-4">
              <form
                onSubmit={onSubmit}
                encType="multipart/form-data"
                className="space-y-4"
              >
                <input
                  type="file"
                  className="file-input w-full max-w-xs text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleFileImage}
                />
                <div className="mt-4 text-center">
                  <button
                    type="submit"
                    className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-full transition duration-300"
                  >
                    Upload
                  </button>
                  <div className="text-gray-500 mt-2">
                    😊 Waiting to upload...
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
    </> 
  );
};

export default KycVerificationModal;
