import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './Redux/store/store.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { SocketProvider } from './Context/SocketContext.tsx'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}


const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <SocketProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}></PersistGate>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </SocketProvider>
  </React.StrictMode>
)
