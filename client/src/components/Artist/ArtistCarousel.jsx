import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/axios';
import { toast } from 'react-toastify';

const SpotifyArtistCarousel = () => {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const navigate = useNavigate()

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

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollAmount = 320;
        const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;

        container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
        });
    };

    const handleScroll = () => {
        const container = scrollRef.current;
        if (!container) return;

        setShowLeftArrow(container.scrollLeft > 0);
        setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
    };

    return (
        <div className="bg-[#121212] text-white p-6">
        <div className="w-full mx-auto">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Popular Artists</h1>
                    <p className="text-gray-400">Artists you might like</p>
                </div>
                <button
                    onClick={() => navigate('/artist')}
                    className='text-xs text-zinc-400 font-semibold hover:border-b border-white h-fit hover:text-xs'
                >
                    Show all
                </button>
            </div>

            <div className="relative group">
            {showLeftArrow && (
                <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                <ChevronLeft size={24} />
                </button>
            )}

            {showRightArrow && (
                <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                <ChevronRight size={24} />
                </button>
            )}

            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 "
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {artists.map((artist) => (
                <Link
                    to={`/artist/${artist._id}`}
                    key={artist._id}
                    className="flex-shrink-0 w-52 hover:bg-[#1d1d1d] rounded-lg p-4 transition-all duration-300 cursor-pointer group/card"
                >
                    <div className="relative mb-4">
                    <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-full aspect-square object-cover rounded-full"
                    />
                    </div>
                    
                    <div className="">
                    <h3 className="text-md mb-2 truncate">{artist.name}</h3>
                    <p className="text-gray-400 text-sm">Artist</p>
                    </div>
                </Link>
                ))}
            </div>
            </div>

            
        </div>
        </div>
    );
};

export default SpotifyArtistCarousel;