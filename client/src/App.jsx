import React from 'react'
import Navbar from './components/Navbar/Navbar'
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



const router = createHashRouter([
  { path: '', element: <RootLayout/>, children: [
    { path: '/', element: <Home/> },
    { path: '/account', element: <Account  /> },
  ]},
  { path: '/signup', element: <Sigup  /> },
  { path: '/login', element: <Login  /> },

])

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
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
        } catch (error) {
            console.error("Auth failed:", error.response?.data?.message);
            dispatch(setAuth(false));
        }
    };

    fetchUser();
  }, []);


  return (
    <div className='bg-black'>
        <RouterProvider router={router} />
    </div>
  )
}

export default App