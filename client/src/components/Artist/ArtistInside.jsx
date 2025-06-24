import React, { useState } from 'react';
import { Play, Heart, MoreHorizontal, CheckCircle } from 'lucide-react';
import VerifyTick from "../../assets/tick.png"
import Dropdown from '../Dot';
import ArtistDropdown from './ArtistDropdown';

export default function ArtistPage() {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const popularSongs = [
        {
        id: 1,
        title: 'Raanjhanaa',
        album: 'From "Raanjhanaa"',
        plays: '174,117,682',
        duration: '4:14',
        image: ''
        },
        {
        id: 2,
        title: 'Yedi',
        album: 'From "Nilavuku En Mel Ennadi Kobam"',
        plays: '25,074,910',
        duration: '3:21',
        image: ''
        },
        {
        id: 3,
        title: 'Maiyya Mainu',
        album: 'From "Jersey"',
        plays: '18,234,567',
        duration: '3:45',
        image: ''
        },
        {
        id: 4,
        title: 'Gulabi 2.0',
        album: 'From "Noor"',
        plays: '12,456,789',
        duration: '4:02',
        image: ''
        },
        {
        id: 5,
        title: 'Tu Mera',
        album: 'From "Bangistan"',
        plays: '9,876,543',
        duration: '3:28',
        image: ''
        }
    ];

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            <div className="relative h-80">
                <div className="absolute inset-0 bg-emerald-950"></div>
                <div className="absolute inset-0 flex items-end p-8">
                <div className="flex items-center space-x-6">
                    <div className="w-48 h-48 bg-gray-950 rounded-full overflow-hidden shadow-2xl">
                        <img 
                            src="" 
                            alt="D" 
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

            <div className="px-8 py-6 bg-gradient-to-b from-emerald-950 to-emerald-900/10">
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
                
                    <div className="w-8 h-12 bg-amber-100 hover:text-white transition-colors"></div>
                
                    <button 
                        onClick={handleFollow}
                        className={`px-3 py-1 text-sm font-bold rounded-full border-1 transition-all duration-200 ${ isFollowing ? 'border-[#696969] text-white hover:border-white' : 'border-[#696969] text-white hover:border-white'}`}
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                
                    <button onClick={() => setDropdownOpen(prev => !prev)} className="w-8 h-8 text-white transition-colors">
                        <MoreHorizontal className="w-full h-full" />
                    </button>
                    {dropdownOpen && (
                            <div className="relative z-50">
                                <ArtistDropdown
                                    isOpen={true}
                                    setIsOpen={() => setDropdownOpen(null)}
                                    position="right"
                                    onItemClick={(item) => {
                                        console.log('Clicked:', item.label);
                                        setDropdownOpen(null);
                                    }}
                                />
                            </div>
                        )}
                </div>
            </div>

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
                    
                        <button onClick={() => setDropdownOpen(dropdownOpen === song.id ? null : song.id)}  className="w-6 h-6 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-full h-full" />
                        </button>
                        {dropdownOpen === song.id && (
                            <div className="relative z-50">
                                <Dropdown
                                    isOpen={true}
                                    setIsOpen={() => setDropdownOpen(null)}
                                    position="right"
                                    onItemClick={(item) => {
                                        console.log('Clicked:', item.label);
                                        setDropdownOpen(null);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}
            </div>
        </div>

        <div className="px-8 pb-8">
            <button className="text-gray-400 hover:text-white transition-colors font-medium">
            Show all
            </button>

        </div>
        </div>
    );
}