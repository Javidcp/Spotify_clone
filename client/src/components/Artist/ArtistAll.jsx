import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import api from '../../utils/axios';
import { toast } from 'react-toastify';

const SpotifyArtist = () => {
    const [artists, setArtist] = useState([])

    useEffect(() => {
    const handleArtists = async () => {
      try {
          const res = await api.get('/artist')
          setArtist(res.data)
          console.log(res.data);
          
      } catch (err) {
        toast.error("Error in fetching Playlist:", err)
      }
    }
    handleArtists()
  }, [])

    return (
        <div className="bg-[#121212] text-white p-6">
            <div className="w-full mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">Popular Artists</h1>
                    <p className="text-gray-400">Artists you might like</p>
                </div>
                <div
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4  scroll-smooth pb-4 "
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {artists.map((artist) => (
                    <div
                        key={artist.id}
                        className="flex-shrink-0 w-52 hover:bg-[#1d1d1d] rounded-lg p-4 transition-all duration-300 cursor-pointer group/card"
                    >
                        <div className="relative mb-4">
                            <img
                                src={artist.image}
                                alt={artist.name}
                                className="w-full aspect-square object-cover rounded-full"
                            />
                            <button className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-400 rounded-full p-3 shadow-lg transition-all duration-200 opacity-0 group-hover/card:opacity-100 transform translate-y-2 group-hover/card:translate-y-0">
                                <Play size={20} fill="black" className="text-black ml-0.5" />
                            </button>
                        </div>
                        
                        <div className="">
                            <h3 className="text-md mb-2 truncate">{artist.name}</h3>
                            <p className="text-gray-400 text-sm">Artist</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpotifyArtist;