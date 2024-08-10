// Import the Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

// Initialize Firebase with your configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq6Gxp-26rKAc6sphoy03nNMbbDbGIA5I",
  authDomain: "dream-buy-6afd3.firebaseapp.com",
  projectId: "dream-buy-6afd3",
  storageBucket: "dream-buy-6afd3.appspot.com",
  messagingSenderId: "143090540570",
  appId: "1:143090540570:web:046ad08ddd72240f6a71a3",
  measurementId: "G-JSP9MNEG85"
};

// Initialize Firebase App
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  // Customize notification here
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(payload.notification.title, notificationOptions);
});
