import { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AllApplicationSkelton from './components/common/LoadingSkelton/AllApplicationSkelton';
import FourNotFourPage from './components/common/404page';

// Lazy loading the route components
const UserRoutes = lazy(() => import('./Routes/UserRoutes'));
const SellerRoutes = lazy(() => import('./Routes/SellerRoutes'));
const AdminRoutes = lazy(() => import('./Routes/AdminRoutes'));

function App() {
  const router = createBrowserRouter([
    { path: "/*", element: <UserRoutes /> },
    { path: "/seller/*", element: <SellerRoutes /> },
    { path: "/admin/*", element: <AdminRoutes /> },
  ]);

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<><AllApplicationSkelton/></>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
