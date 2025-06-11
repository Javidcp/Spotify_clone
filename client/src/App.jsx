import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sigup from './components/Login/Sigup'
import { createHashRouter, RouterProvider } from "react-router-dom"
import RootLayout from './pages/RootLayout'
import Home from './pages/Home'
import Login from './components/Login/Login'
import Account from './pages/Account'

import { setAuth, setUser } from './redux/authSlice'
import { useEffect } from 'react'
import api from "./utils/axios"
import { useDispatch } from 'react-redux'
import Premium from './pages/Premium'
import Download from './pages/Download'
import Notification from './pages/Notification'




const router = createHashRouter([
  { path: '', element: <RootLayout/>, children: [
    { path: '/', element: <Home/> },
    { path: '/account', element: <Account  /> },
    { path: '/premium', element: <Premium  /> },
    { path: '/download', element: <Download /> },
    { path: '/notification', element: <Notification /> },
  ]},
  { path: '/signup', element: <Sigup /> },
  { path: '/login', element: <Login /> },

])

const App = () => {

  const dispatch = useDispatch();

useEffect(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    dispatch(setUser(JSON.parse(savedUser)));
    dispatch(setAuth(true));
  }

  const fetchUser = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      const res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch(setUser(res.data));
      dispatch(setAuth(true));
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (error) {
      console.error("Auth failed:", error.response?.data?.message);
      dispatch(setAuth(false));
      localStorage.removeItem('user');
    }
  };

  fetchUser();
}, []);



  return (
    <div className='bg-black'>
        <RouterProvider router={router} />
        <ToastContainer />
    </div>
  )
}

export default App