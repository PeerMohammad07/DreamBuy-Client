import { useState } from "react"
import { useForm } from "react-hook-form"
import { updateUser } from "../../api/userApi";
import { Buffer } from "buffer";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/slice/userAuthSlice";
import LoadingSkelton from "../../components/common/LoadingSkelton/LoadingSkelton";

export interface editFormData {
  name: string
  image?: string | undefined
  id?: string | undefined
}


interface EditProfileProps {
  setProfileImage: (file: File) => void;
  profileImage: File | null
  user: { _id: string, name: string, email: string ,image?:string} | null
}

const EditProfile = ({ user, setProfileImage, profileImage }: EditProfileProps) => {
  const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm<editFormData>()
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const fileToBuffer = async (file: File): Promise<Uint8Array> => {
    const arrayBuffer = await file.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  };


  const onSubmit = async (data: editFormData) => {
    try {
      let base64Image: string | undefined;
      setIsLoading(true)
      if (profileImage) {
        const buffer = await fileToBuffer(profileImage);
        base64Image = Buffer.from(buffer).toString('base64');
      }
      base64Image = base64Image ? base64Image : user?.image      
      const formData = { name: data.name, image: base64Image, id: user?._id, type: profileImage?.type }
      reset()
      const response = await updateUser(formData)
      if (response.data.status) {
        console.log(response.data.user);
        dispatch(userLogin(response.data.user))
        setIsLoading(false)
        toast.success(response.data.message)
      }


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {isLoading ? <LoadingSkelton /> : <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative z-0 w-full mb-3 group">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Username:
            </label>
            <input
              type="text"
              defaultValue={user?.name}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Name..."
              {...register('name', {
                required: "name field is required",
                minLength: {
                  value: 4,
                  message: "Name must be at least 4 characters long",
                },
                onChange: (e) => setValue("name", e.target.value.trim())
              })}
            />
            {errors.name?.type == "required" && (
              <h1 className="text-red-600">{errors.name.message}</h1>
            )}
            {
              errors.name?.message == "Name must be at least 4 characters long" && <h1 className="text-red-600">{errors.name.message}</h1>
            }
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <label
              htmlFor="email"
              className="flex items-center text-sm font-medium text-gray-900 dark:text-white"
            >
              Email:
              <div
                className="relative ml-2"
                onMouseEnter={() => setIsTooltipVisible(true)}
                onMouseLeave={() => setIsTooltipVisible(false)}
              >
                {isTooltipVisible && (
                  <div
                    className="absolute z-10 w-48 inline-block px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg shadow-sm opacity-100 transition-opacity duration-300"
                    style={{ bottom: '100%', left: '50%', transform: 'translateX(-50%) translateY(-8px)' }}
                  >
                    Email cannot be edited
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"
                      style={{ bottom: '-4px' }}
                    ></div>
                  </div>
                )}
                <button
                  className="text-white font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    id="information"
                  >
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
              defaultValue={user?.email}
              readOnly
              className="block py-2.5 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Email..."
            />
          </div>

          <div className="relative z-0 w-full mb-3 group">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              choose image:
            </label>
            <input
              type="file"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={(e) => {
                if (e.target.files) {
                  setProfileImage(e.target.files[0])
                }
              }}
              placeholder="Name..."
            />
            <div className="flex justify-center pt-5">
              <button className="text-white bg-gradient-to-r  from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-8 py-2  text-center me-2 mb-2">
                Edit
              </button>
            </div>
          </div>
        </form>
      </div>}
    </>
  )
}

export default EditProfile
