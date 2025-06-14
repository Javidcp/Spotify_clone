import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const SpotifyArtist = () => {
    const scrollRef = useRef(null);

    const artists = [
        {
        id: 1,
        name: "Taylor Swift",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
        followers: "92.1M followers"
        },
        {
        id: 2,
        name: "The Weeknd",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=face",
        followers: "88.5M followers"
        },
        {
        id: 3,
        name: "Ariana Grande",
        image: "https://images.unsplash.com/photo-1494790108755-2616c898834e?w=300&h=300&fit=crop&crop=face",
        followers: "82.3M followers"
        },
        {
        id: 4,
        name: "Drake",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
        followers: "89.7M followers"
        },
        {
        id: 5,
        name: "Billie Eilish",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
        followers: "73.2M followers"
        },
        {
        id: 6,
        name: "Ed Sheeran",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
        followers: "87.1M followers"
        },
        {
        id: 7,
        name: "Dua Lipa",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
        followers: "68.4M followers"
        },
        {
        id: 8,
        name: "Post Malone",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
        followers: "64.8M followers"
        }
    ];
    

    return (
        <div className="bg-[#121212] text-white p-6">
        <div className="w-full mx-auto">
            <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Popular Artists</h1>
            <p className="text-gray-400">Artists you might like</p>
            </div>
            <div
                ref={scrollRef}
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