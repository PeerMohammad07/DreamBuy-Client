import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import {persistor, store} from './Redux/store/store.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';


const clientId = "544672401773-qsqp4tob7m79v4bcl633i1jsqjo8ij2h.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Toaster position="top-center" reverseOrder={false} />
      <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}></PersistGate>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </React.StrictMode>
)
