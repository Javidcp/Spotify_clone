import React, { useState } from 'react';
import { Play, Heart, MoreHorizontal, CheckCircle } from 'lucide-react';
import VerifyTick from "../../assets/tick.png"

export default function ArtistPage() {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const popularSongs = [
        {
        id: 1,
        title: 'Raanjhanaa',
        album: 'From "Raanjhanaa"',
        plays: '174,117,682',
        duration: '4:14',
        image: '/api/placeholder/56/56'
        },
        {
        id: 2,
        title: 'Yedi',
        album: 'From "Nilavuku En Mel Ennadi Kobam"',
        plays: '25,074,910',
        duration: '3:21',
        image: '/api/placeholder/56/56'
        },
        {
        id: 3,
        title: 'Maiyya Mainu',
        album: 'From "Jersey"',
        plays: '18,234,567',
        duration: '3:45',
        image: '/api/placeholder/56/56'
        },
        {
        id: 4,
        title: 'Gulabi 2.0',
        album: 'From "Noor"',
        plays: '12,456,789',
        duration: '4:02',
        image: '/api/placeholder/56/56'
        },
        {
        id: 5,
        title: 'Tu Mera',
        album: 'From "Bangistan"',
        plays: '9,876,543',
        duration: '3:28',
        image: '/api/placeholder/56/56'
        }
    ];

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <div className="relative h-80">
            <div className="absolute inset-0 bg-red-400"></div>
            <div className="absolute inset-0 flex items-end p-8">
            <div className="flex items-center space-x-6">
                <div className="w-48 h-48 bg-gray-950 rounded-full overflow-hidden shadow-2xl">
                <img 
                    src="" 
                    alt="Dhanush" 
                    className="w-full h-full object-cover"
                />
                </div>
                <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <img src={VerifyTick} className='w-6 h-6' alt="" />
                    <span className="text-sm text-gray-300">Verified Artist</span>
                </div>
                <h1 className="text-6xl font-bold">Dhanush</h1>
                <p className="text-gray-300 text-lg">9,765,817 monthly listeners</p>
                </div>
            </div>
            </div>
        </div>

        {/* Control Section */}
        <div className="px-8 py-6 bg-gradient-to-b from-black/60 to-black">
            <div className="flex items-center space-x-4">
            <button 
                onClick={handlePlayPause}
                className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-all duration-200 hover:scale-105"
            >
                <Play className={`w-6 h-6 text-black ${isPlaying ? 'hidden' : 'block'} ml-1`} />
                <div className={`w-6 h-6 ${isPlaying ? 'block' : 'hidden'}`}>
                <div className="flex space-x-1">
                    <div className="w-1 h-6 bg-black rounded animate-pulse"></div>
                    <div className="w-1 h-6 bg-black rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-1 h-6 bg-black rounded animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                </div>
            </button>
            
            <button className="w-8 h-8 text-gray-400 hover:text-white transition-colors">
                <Heart className="w-full h-full" />
            </button>
            
            <button 
                onClick={handleFollow}
                className={`px-6 py-2 rounded-full border transition-all duration-200 ${
                isFollowing 
                    ? 'border-white text-white hover:bg-white hover:text-black' 
                    : 'border-gray-400 text-gray-400 hover:border-white hover:text-white'
                }`}
            >
                {isFollowing ? 'Following' : 'Follow'}
            </button>
            
            <button className="w-8 h-8 text-gray-400 hover:text-white transition-colors">
                <MoreHorizontal className="w-full h-full" />
            </button>
            </div>
        </div>

        {/* Popular Songs Section */}
        <div className="px-8 py-6">
            <h2 className="text-2xl font-bold mb-6">Popular</h2>
            <div className="space-y-2">
            {popularSongs.map((song, index) => (
                <div 
                key={song.id} 
                className="grid grid-cols-3 items-center w-full p-2 rounded-lg hover:bg-[#1d1d1d] group transition-colors cursor-pointer"
                >
                <div className='flex items-center  gap-2 '>
                <div className="w-8 text-gray-400 text-center group-hover:hidden">
                    <span className="text-lg">{index + 1}</span>
                </div>
                <div className="w-8 hidden group-hover:flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                </div>
                
                <div className="w-10 h-10 bg-gray-700 rounded overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                        {song.title.charAt(0)}
                    </span>
                    </div>
                </div>
                
                <div className=" ">
                    <h3 className="text-white font-medium truncate">{song.title}</h3>
                </div>
                </div>

                
                    <div className="text-gray-400 text-end text-sm hidden md:block">
                    {song.plays}
                </div>

                <div className='flex gap-4 justify-end'>
                
                <div className="text-gray-400 text-sm">
                    {song.duration}
                </div>
                
                <button className="w-6 h-6 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-full h-full" />
                </button>
                </div>
                </div>
            ))}
            </div>
        </div>

        {/* Show More Button */}
        <div className="px-8 pb-8">
            <button className="text-gray-400 hover:text-white transition-colors font-medium">
            Show all
            </button>
        </div>
        </div>
    );
}