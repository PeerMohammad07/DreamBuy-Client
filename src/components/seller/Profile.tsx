import { AiFillFileAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../Redux/store/store";
import KycVerificationModal from "./KycVerificationModal";
import { useEffect, useState } from "react";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import ChangePassword from "../common/ChangePassword";
import { useForm } from "react-hook-form";
import { updateSeller } from "../../api/sellerApi";
import { toast } from "react-toastify";
import { sellerLogin } from "../../Redux/slice/sellerAuthSlice";
import { useExpandContext } from "../../Context/ExpandContext";
import { useMediaQuery } from "@mui/system";

interface SellerProfile {
  email: string;
  isBlocked: boolean;
  kycVerified: string;
  name: string;
  otpVerified: boolean;
  password: string;
  image: string
  phone: number;
  __v: number;
  _id: string;
}

interface editFormData {
  name: string
  phone: string
}

const Profile = () => {
  const [verificationModal, setVerificationModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const dispatch = useDispatch()

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<editFormData>()

  const seller: SellerProfile | null = useSelector(
    (state: rootState) => state.seller.sellerData
  );

  const { setExpanded } = useExpandContext();


  const matches = useMediaQuery('(max-width:768px)');
  useEffect(() => {
    if (matches) {
      setExpanded(false);
    }
    return () => {
      setExpanded(true);
    };
  }, [setExpanded, matches]);

  function handleCloseModal() {
    setVerificationModal(false);
  }

  // Function to get the color based on kycVerified status
  const getKycStatusClass = (status: string) => {
    switch (status) {
      case "Not Verified":
        return "text-red-500 bg-red-100";
      case "Verification Pending":
        return "text-yellow-500 bg-yellow-100";
      case "Verified":
        return "text-green-500 bg-green-100";
      case "Cancelled":
        return "text-blue-500 bg-blue-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };


  const onSubmit = async () => {
    try {
      const name = watch('name')
      const phone = watch('phone')
      const updateResponse = await updateSeller(name, phone, seller?._id, dispatch)
      if (updateResponse && updateResponse.data.message == "seller updated") {
        dispatch(sellerLogin(updateResponse.data.seller))
        toast.success("profile updated successfully")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center p-4 min-h-screen bg-gray-900">
        <div className="flex flex-col items-center bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 space-y-6">

          <div className="flex flex-col items-center space-y-2">
            <img
              src={seller?.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 bg-gray-200"
            />
          </div>

          <div className="w-full space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">

              <div className="relative">
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Username:</label>
                <input
                  type="text"
                  defaultValue={seller?.name}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                  placeholder="Name..."
                  {...register("name", {
                    required: "Name field is required",
                    minLength: {
                      value: 4,
                      message: "Name must be at least 4 characters long",
                    },
                    onChange: (e) => setValue("name", e.target.value.trim()),
                  })}
                />
                {errors.name && <p className="text-red-600">{errors.name.message}</p>}
              </div>

              <div className="relative">
                <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-900">
                  Email:
                  <div
                    className="relative ml-2"
                    onMouseEnter={() => setIsTooltipVisible(true)}
                    onMouseLeave={() => setIsTooltipVisible(false)}
                  >
                    {isTooltipVisible && (
                      <div className="absolute z-10 w-48 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-100 transition-opacity duration-300"
                        style={{ bottom: "100%", left: "50%", transform: "translateX(-50%) translateY(-8px)" }}>
                        Email cannot be edited
                        <div
                          className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"
                          style={{ bottom: "-4px" }}
                        ></div>
                      </div>
                    )}
                    <button className="text-white font-medium rounded-lg text-sm px-1 py-1 bg-blue-200 hover:bg-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="information">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M11 18h2v-6h-2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-10h2V6h-2z"></path>
                      </svg>
                    </button>
                  </div>
                </label>
                <input
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  defaultValue={seller?.email}
                  readOnly
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                  placeholder="Email..."
                />
              </div>

              <div className="relative">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900">Phone No:</label>
                <input
                  type="text"
                  defaultValue={seller?.phone}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                  placeholder="Phone..."
                  {...register("phone", {
                    required: "Phone field is required",
                    minLength: {
                      value: 10,
                      message: "Phone number must be exactly 10 digits",
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone number must be exactly 10 digits",
                    },
                    pattern: {
                      value: /^[1-9][0-9]{3,10}$/,
                      message: "Enter a valid phone number",
                    },
                    onChange: (e) => setValue("phone", e.target.value.trim()),
                  })}
                />
                {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
              </div>

              <div className="flex items-center space-x-3">
                <label htmlFor="kycStatus" className="block text-sm font-medium text-gray-900">KYC Status:</label>
                <input
                  type="text"
                  name="kycStatus"
                  value={seller?.kycVerified}
                  readOnly
                  className={`py-2 px-3 w-full text-sm border rounded-md ${getKycStatusClass(seller?.kycVerified || "")}`}
                  placeholder="KYC Status..."
                />
                <KycVerificationModal
                  open={verificationModal}
                  onClose={handleCloseModal}
                  id={seller?._id || ""}
                />
                {seller?.kycVerified === "Not Verified" || seller?.kycVerified === "Cancelled" ? (
                  <button
                    className="bg-green-600 text-white rounded-md p-2 flex items-center space-x-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setVerificationModal(true);
                    }}
                  >
                    <span>Add</span>
                    <AiFillFileAdd />
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-green-400 text-white rounded-md p-2 flex items-center space-x-2"
                    onClick={() => setVerificationModal(true)}
                  >
                    <span>Added</span>
                    <MdOutlineBookmarkAdded />
                  </button>
                )}
              </div>

              <div className="flex justify-center space-x-2">
                <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setChangePasswordModal(true)}
                  className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Edit Password
                </button>
              </div>
            </form>
            <ChangePassword open={changePasswordModal} close={setChangePasswordModal} sellerId={seller?._id} />
          </div>
        </div>
      </div>


    </>
  );
};

export default Profile;
