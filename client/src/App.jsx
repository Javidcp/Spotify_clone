import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sigup from './components/Login/Sigup'
import { createHashRouter, RouterProvider } from "react-router-dom"
import RootLayout from './pages/RootLayout'
import Home from './pages/Home'
import Login from './components/Login/Login'
import Password from './components/Login/Password'

import { setAuth, setUser } from './redux/authSlice'
import { useEffect } from 'react'
import api from "./utils/axios"
import { useDispatch } from 'react-redux'


const router = createHashRouter([
  { path: '', element: <RootLayout/>, children: [
    { path: '/', element: <Home/> }
  ]},
  { path: '/signup', element: <Sigup  /> },
  { path: '/login', element: <Login  /> },
  { path: '/password', element: <Password/> }
])

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me'); // This will get user info from cookie
        dispatch(setUser(res.data));
        dispatch(setAuth(true));
      } catch (err) {
        dispatch(setAuth(false));
        console.log(err);
        
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}

export default App