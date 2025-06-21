import React from 'react'
import BottomPlayer from '../components/Player';
import useAuth from '../hooks/useAuth';

const MainHome = () => {
  const { isAuthenticated } = useAuth()

    return (
        <div className='bg-[#1a1a1a] text-white  h-[100%] overflow-hidden'>
            <MyComponent/>
            {isAuthenticated &&<BottomPlayer/>}
        </div>
    )
}

import { useSelector } from "react-redux";
import Footer from './Footer';
import SongCarousel from '../components/SongCarousal/IndiaBest';
import SpotifyArtistCarousel from '../components/Artist/ArtistCarousel';

const MyComponent = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  console.log("Redux user:", user);
  console.log("Authenticated:", isAuthenticated);

  return (
    <div>
      <SongCarousel/>
      <SpotifyArtistCarousel/>
    </div>
  );
};


export default MainHome