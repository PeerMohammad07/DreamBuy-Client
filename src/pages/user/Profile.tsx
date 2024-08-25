import { useState } from "react"
import EditProfile from "./EditProfile"
import { useSelector } from "react-redux"
import { rootState } from "../../Redux/store/store"
import { GiDiamonds } from "react-icons/gi";
import Plan from "./Plan";


const Profile = () => {

  const [activeTab,handleTabClick] = useState('profile')
  const [profileImage,setProfileImage] = useState<File|null>(null)
  const user = useSelector((prevState:rootState)=> prevState.user.userData)

  return (
    <>
      <div>
        <div className='rounded w-auto flex-col flex items-center justify-center py-10'>
        <img
              src={profileImage ? URL.createObjectURL(profileImage) : user?.image ? user.image :"/avatar-4.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-4 md:mb-4"
            />
          <div className=''>
            <h1 className='font-serif text-4xl'><span className="font-bold">Hello 👋 </span>{user?.name}</h1>
            <h3 className='text-xl py-2 text-center'>{user?.email}</h3>
          </div>

          <div className="border-b border-gray-50 dark:border-gray-700 pt-5">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="me-2 px-5">
                <a
                  onClick={() => handleTabClick("profile")}
                  className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${activeTab === "profile" ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"}`}
                >
                  <svg
                    className={`w-4 h-4 me-2 ${activeTab === "profile" ? "text-blue-600 dark:text-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                  Profile
                </a>
              </li>
              <li className="me-2 px-5">
                <a
                  onClick={() => handleTabClick("plan")}
                  className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${activeTab === "plan" ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"}`}
                >
                 <GiDiamonds />
                 Current Plan
                </a>
              </li>
              {/* <li className="me-2 px-5">
                <a
                  onClick={() => handleTabClick("settings")}
                  className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${activeTab === "settings" ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"}`}
                >
                  <svg
                    className={`w-4 h-4 me-2 ${activeTab === "settings" ? "text-blue-600 dark:text-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
                  </svg>
                  Purchase History
                </a>
              </li> */}
              {/* <li className="me-2 px-5">
                <a
                  onClick={() => handleTabClick("contacts")}
                  className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${activeTab === "contacts" ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"}`}
                >
                  <svg
                    className={`w-4 h-4 me-2 ${activeTab === "contacts" ? "text-blue-600 dark:text-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M14.563 2.175A6.7 6.7 0 0 0 10 0a6.694 6.694 0 0 0-4.563 2.175A7.318 7.318 0 0 0 3 6.5c0 1.942.375 3.662 1.117 5.025a9.87 9.87 0 0 0 2.817 3.238A14.303 14.303 0 0 0 10 16.873a14.303 14.303 0 0 0 3.066-2.11 9.87 9.87 0 0 0 2.817-3.238C16.625 10.162 17 8.442 17 6.5a7.318 7.318 0 0 0-1.563-4.325ZM10 10.5a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm5 6.17c0 .5-3 2.33-5 2.33s-5-1.83-5-2.33v-.67c0-.47.14-.93.4-1.32a6.707 6.707 0 0 0 9.2 0c.26.39.4.85.4 1.32v.67Z" />
                  </svg>
                  Contacts
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      <div>
        {
          activeTab == 'profile' && <EditProfile user={user} setProfileImage={setProfileImage} profileImage={profileImage}/>||
          activeTab == 'plan' && <Plan user={user}/>
        }
      </div>
    </>
  )
}

export default Profile
