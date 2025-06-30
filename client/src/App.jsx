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
import ErrorPage from './pages/ErrorPage';
import AuthProtected from './components/Auth/AuthProtected';
import EditArtist from './admin/EditArtist';
import GenrePlaylistForm from './admin/GenrePlaylistForm';
import GenreInside from './admin/GenreInside';
import EditSong from './admin/EditSong';

// Import the user-specific actions (remove the old ones)
import { setCurrentUser as setCurrentUserArtists } from './redux/recentlyPlayedArtistsSlice';
import { setCurrentUser as setCurrentUserPlaylists } from './redux/recentlyPlayedPlaylistsSlice';
import { clearUserSession as clearArtistsSession } from './redux/recentlyPlayedArtistsSlice';
import { clearUserSession as clearPlaylistsSession } from './redux/recentlyPlayedPlaylistsSlice';
import SingleSong from './components/SingleSong';

const router = createHashRouter([
  { path: '', element: <><RootLayout/> <GlobalAudioManager/> </>, errorElement: <ErrorPage/> , children: [
    { path: '/', element: <Home/> },
    { path: '/search', element: <BrowseInterface/> },
    { path: '/account', element: <Account  /> },
    { path: '/premium', element: <Premium  /> },
    { path: '/download', element: <Download /> },
    { path: '/notification', element: <Notification /> },
    { path: '/song/:songId', element: <SingleSong/> },
    { path: '/indiabest', element: <IndiaBestAll /> },
    { path: '/playlist/:playlistId', element: <ProtectedRoute><Inside /></ProtectedRoute> },
    { path: '/artist', element: <SpotifyArtist /> },
    { path: '/artist/:artistId', element: <ProtectedRoute><ArtistPage /></ProtectedRoute> },
    {path: '/full', element: <ProtectedRoute><FullSong/></ProtectedRoute>},
    { path: '/liked', element: <ProtectedRoute><LikedSong/></ProtectedRoute> },
    { path: '/createplaylist', element: <ProtectedRoute><CreatePlaylist/></ProtectedRoute> }
  ]},
  { path: '/signup', element: <AuthProtected><Sigup /></AuthProtected> },
  { path: '/login', element: <AuthProtected><Login /></AuthProtected> },
  { path: '/player', element: <ProtectedRoute><BottomPlayer/></ProtectedRoute> },

  { path: '/unauthorized', element: <Unauthorized /> },
  { path: '/admin', element: <AdminRoute><AdminPanel /></AdminRoute>, children: [
    { path: 'dashboard', element: <Dashboard /> },
    { path: 'users', element: <User/> },
    { path: 'songs', element: <Songs/> },
    { path: 'addSong', element: <AddSong/> },
    { path: 'editSong/:songId', element: <EditSong /> },
    { path: 'artist', element: <Artist/> },
    { path: 'addArtist', element: <AdminCreateArtist/> },
    { path: 'editArtist/:artistId', element: <EditArtist /> },
    { path: 'genre', element: <GenrePlaylistForm/> },
    { path: 'genre/:id', element: <GenreInside/> }
  ] }
])

// Fixed App.js - Ensure user is set before navigation

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  // Set user context immediately when user data is available
  useEffect(() => {
    if (user && user._id) {
      console.log('Setting user for recently played slices:', user._id);
      // Set user context for both recently played slices
      dispatch(setCurrentUserPlaylists(user._id));
      dispatch(setCurrentUserArtists(user._id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    
    // Load saved user first
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        console.log('Loading saved user:', userData);
        dispatch(setUser(userData));
        dispatch(setAuth(true));
        
        // Set user context for recently played data immediately
        if (userData._id) {
          dispatch(setCurrentUserArtists(userData._id));
          dispatch(setCurrentUserPlaylists(userData._id));
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
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

        console.log('Fetched user from API:', res.data);
        dispatch(setUser(res.data));
        dispatch(setAuth(true));
        localStorage.setItem('user', JSON.stringify(res.data));
        
        // Set user context for recently played data
        if (res.data._id) {
          dispatch(setCurrentUserArtists(res.data._id));
          dispatch(setCurrentUserPlaylists(res.data._id));
        }
        
      } catch (error) {
        console.error("Auth failed:", error.response?.data?.message);
        dispatch(setAuth(false));
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        
        // Clear user context on auth failure
        dispatch(clearArtistsSession());
        dispatch(clearPlaylistsSession());
        
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch]);

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