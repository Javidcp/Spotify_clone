import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sigup from './components/Login/Sigup'
import { createHashRouter, RouterProvider } from "react-router-dom"
import RootLayout from './pages/RootLayout'
import Home from './pages/Home'
import Login from './components/Login/Login'
import Account from './pages/Account'

import { setAuth, setUser, setLoading } from './redux/authSlice'
import { useEffect } from 'react'
import api from "./utils/axios"
import { useDispatch, useSelector } from 'react-redux'
import Premium from './pages/Premium'
import Download from './pages/Download'
import Notification from './pages/Notification'
import IndiaBestAll from './components/SongCarousal/IndiaBestAll';
import Inside from './components/SongCarousal/Inside';
import Dashboard from './admin/Dashboard';
import AdminPanel from './admin/AdminPanel';
import AdminRoute from './components/Auth/AdminRoute';
import Unauthorized from './pages/Unauthorized';
import BottomPlayer from './components/Player';
import SpotifyArtist from './components/Artist/ArtistAll';
import ArtistPage from './components/Artist/ArtistInside';
import User from './admin/User';
import Songs from './admin/Songs';
import Artist from './admin/Artist';
import AddSong from './admin/AddSong';
import AdminCreateArtist from './admin/AddArtist';
import FullSong from './components/FullSong';
import GlobalAudioManager from './components/GlobalAudioPlayer';
import LikedSong from './components/LikedSong';
import BrowseInterface from './components/Navbar/Browser';
import CreatePlaylist from './components/CreatePlaylist';
import ProtectedRoute from './components/Auth/ProtectedRoute';




const router = createHashRouter([
  { path: '', element: <><RootLayout/> <GlobalAudioManager/> </>, children: [
    { path: '/', element: <Home/> },
    { path: '/search', element: <BrowseInterface/> },
    { path: '/account', element: <Account  /> },
    { path: '/premium', element: <Premium  /> },
    { path: '/download', element: <Download /> },
    { path: '/notification', element: <Notification /> },
    { path: '/indiabest', element: <IndiaBestAll /> },
    { path: '/playlist', element: <ProtectedRoute><Inside /></ProtectedRoute> },
    { path: '/artist', element: <SpotifyArtist /> },
    { path: '/artistperson', element: <ProtectedRoute><ArtistPage /></ProtectedRoute> },
    {path: '/full', element: <ProtectedRoute><FullSong/></ProtectedRoute>},
    { path: '/liked', element: <ProtectedRoute><LikedSong/></ProtectedRoute> },
    { path: '/createplaylist', element: <ProtectedRoute><CreatePlaylist/></ProtectedRoute> }
  ]},
  { path: '/signup', element: <Sigup /> },
  { path: '/login', element: <Login /> },
  { path: '/player', element: <ProtectedRoute><BottomPlayer/></ProtectedRoute> },

  { path: '/unauthorized', element: <Unauthorized /> },
  { path: '/admin', element: <AdminRoute><AdminPanel /></AdminRoute>, children: [
    { path: 'dashboard', element: <Dashboard /> },
    { path: 'users', element: <User/> },
    { path: 'songs', element: <Songs/> },
    { path: 'addSong', element: <AddSong/> },
    { path: 'artist', element: <Artist/> },
    { path: 'addArtist', element: <AdminCreateArtist/> },
  ] }

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
      dispatch(setLoading(true));
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
    }finally {
      dispatch(setLoading(false));
    }
  };

  fetchUser();
}, []);

const { isLoading } = useSelector((state) => state.auth);

if (isLoading) {
  return <div className="text-white h-screen flex items-center justify-center">Loading...</div>;
}


  return (
    <div className='bg-black'>
        <RouterProvider router={router} />
        <ToastContainer />
    </div>
  )
}

export default App