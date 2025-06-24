import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { usePlayer } from '../../hooks/redux';
import useAuth from '../../hooks/useAuth';

const SongCarousel = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { playTrack } = usePlayer()

  const playlists = [
    {
      id: 1,
      title: "I-POP ICONS",
      subtitle: "Hottest tracks from your favourite I-Pop Icons....",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
      color: "bg-gradient-to-br from-blue-600 to-purple-800"
    },
    {
      id: 2,
      title: "BOLLYWOOD CENTRAL",
      subtitle: "Bollywood Central, jab baje toh seedha dil ke...",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
      color: "bg-gradient-to-br from-pink-500 to-red-500"
    },
    {
      id: 3,
      title: "RAP 91",
      subtitle: "India's Rap Scene. Cover - KR$NA",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
      color: "bg-gradient-to-br from-yellow-600 to-green-700"
    },
    {
      id: 4,
      title: "KOLLYWOOD CREAM",
      subtitle: "Finest collection of Tamil Music from the past 10...",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      color: "bg-gradient-to-br from-cyan-400 to-blue-600"
    },
    {
      id: 5,
      title: "RADAR INDIA",
      subtitle: "Most exciting artists from the Indian Indie...",
      image: "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300&h=300&fit=crop",
      color: "bg-gradient-to-br from-orange-500 to-red-600"
    },
    {
      id: 6,
      title: "Yo Hai Haryanvi",
      subtitle: "Biggest Haryanvi hits from the last 10 years...",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
      color: "bg-gradient-to-br from-yellow-500 to-orange-600"
    },
    {
      id: 7,
      title: "DESI TRAP",
      subtitle: "Fusion of Indian beats with trap vibes – raw and lit!",
      image: "https://images.unsplash.com/photo-1532634896-26909d0dbe9f?w=300&h=300&fit=crop",
      color: "bg-gradient-to-br from-purple-700 to-indigo-900"
    },
    {
      id: 8,
      title: "PUNJABI POWER",
      subtitle: "High-energy Punjabi hits that’ll get you moving!",
      image: "https://images.unsplash.com/photo-1588167056540-67d4f86b9d79?w=300&h=300&fit=crop",
      color: "bg-gradient-to-br from-red-600 to-yellow-400"
    },
    {
      id: 9,
      title: "MELODY MALAYALAM",
      subtitle: "Heart-touching Malayalam songs from timeless voices...",
      image: "https://images.unsplash.com/photo-1602526216436-d88fadd9d202?w=300&h=300&fit=crop",
      color: "bg-gradient-to-br from-green-600 to-emerald-400"
    },
    {
      id: 10,
      title: "BENGALI BEATS",
      subtitle: "Soulful and rhythmic Bengali songs curated for you...",
      image: "https://images.unsplash.com/photo-1553775282-20af80779df7?w=300&h=300&fit=crop",
      color: "bg-gradient-to-br from-rose-400 to-fuchsia-600"
    },
    {
      id: 11,
      title: "CHILL CARNATIC",
      subtitle: "Carnatic tunes reimagined for your chill sessions...",
      image: "https://images.unsplash.com/photo-1532979583011-c4bcb979e8c9?w=300&h=300&fit=crop",
      color: "bg-gradient-to-br from-teal-500 to-indigo-600"
    }
  ];

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
    <div className="bg-[#121212] text-white pb-15 p-8">
      <div className="w-full mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">India's Best</h2>
          <button onClick={() => navigate('/indiabest')} className="text-xs text-zinc-400 font-semibold hover:border-b border-white h-fit hover:text-xs">
            Show all
          </button>
        </div>

        <div className="relative group">
            {showLeftArrow && (
              <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100">
                <ChevronLeft size={24} />
              </button>
            )}

            {showRightArrow && (
              <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100" >
                <ChevronRight size={24} />
              </button>
            )}

            <div 
              ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 "
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {playlists.map((playlist) => (
                <Link 
                  key={playlist.id}
                  to='/playlist'
                  className="flex-shrink-0 w-52 hover:bg-[#1d1d1d] rounded-lg p-4 transition-all duration-300 cursor-pointer group/card"
                >
                  <div className="rounded-lg hover:bg-[#1d1d1d]">
                    <div className="relative mb-4 overflow-hidden rounded-lg">
                      <div className={`aspect-square ${playlist.color} relative`}>
                        <div className="absolute top-3 left-3 w-6 h-6 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                          </svg>
                        </div>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <h3 className="text-white font-bold text-sm sm:text-lg text-center px-4 drop-shadow-lg">
                            {playlist.title}
                          </h3>
                        </div>

                      <button onClick={(e) => {e.preventDefault(); {isAuthenticated && playTrack(playlist.id)}}} className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/card:translate-y-0 shadow-lg">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 relative text-black fill-current ml-1">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-1 group-hover/card:text-green-400 transition-colors">
                        {playlist.title}
                      </h4>
                      <p className="text-gray-400 text-sm line-clamp-2 leading-tight">
                        {playlist.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default SongCarousel;