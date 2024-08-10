// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getMessaging,getToken} from "firebase/messaging"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq6Gxp-26rKAc6sphoy03nNMbbDbGIA5I",
  authDomain: "dream-buy-6afd3.firebaseapp.com",
  projectId: "dream-buy-6afd3",
  storageBucket: "dream-buy-6afd3.appspot.com",
  messagingSenderId: "143090540570",
  appId: "1:143090540570:web:046ad08ddd72240f6a71a3",
  measurementId: "G-JSP9MNEG85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

const VAPID_KEY = 'BM71iVdhyKWiZwCUReZHNptUnZfo7NDMk8DmWOEIHDuiyG7ruVLj3zPdk7uyxZoy_QmK9GgRvme366wNGubsNVo'


export const getNotificationToken = async () => {
  const permission = await Notification.requestPermission();
  if(permission == "granted"){
    const token = await getToken(messaging, { vapidKey: VAPID_KEY })
    .then(async (currentToken) => {
      if (currentToken) {
        return currentToken;
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        return null;
      }
    })
    .catch((err) => {
      return null;
    });
    return token
  }
}
