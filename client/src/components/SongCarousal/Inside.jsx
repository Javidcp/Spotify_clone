import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Plus, MoreHorizontal, Menu, LayoutList, List, Clock } from 'lucide-react';
import { usePlayer } from '../../hooks/redux';
import BottomPlayer from '../Player';
import VideoPlayer from './VideoPlayer';
import Dropdown from "../Dot"

const SongRowList = React.memo(({ song, index, currentTrackId, isPlaying, onPlay }) => (
    <div
        className={`grid grid-cols-12 gap-4 py-2 px-2 rounded-md hover:bg-[#1d1d1d] transition-colors group cursor-pointer ${
            currentTrackId === song.id ? 'bg-[#1d1d1d]' : ''
        }`}
        onClick={() => onPlay(song.id)}
    >
        <div className="col-span-1 flex items-center">
            {currentTrackId === song.id && isPlaying ? (
                <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-green-400 animate-pulse"></div>
                    <div className="w-1 h-4 bg-green-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-4 bg-green-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
            ) : (
                <>
                    <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                    <Play className="w-4 h-4 text-white hidden group-hover:block" />
                </>
            )}
        </div>

        <div className="col-span-5 flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-700 rounded flex-shrink-0 overflow-hidden">
                <img src={song.image} alt={song.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="min-w-0">
                <div className={`font-medium truncate ${currentTrackId === song.id ? 'text-green-400' : 'text-white'}`}>
                    {song.title}
                </div>
                <div className="text-sm text-gray-400 truncate">{song.artists}</div>
            </div>
        </div>

        <div className="col-span-4 hidden sm:flex items-center">
            <span className="text-gray-400 text-sm truncate hover:underline cursor-pointer">
                {song.album}
            </span>
        </div>

        <div className="col-span-1 md:flex items-center hidden">
            <span className="text-gray-400 text-sm">{song.dateAdded}</span>
        </div>

        <div className="col-span-1 flex items-center gap-2 justify-end">
            <span className="text-gray-400 text-sm">{song.duration}</span>
            <button  className="w-6 h-6 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100     transition-opacity">
                <MoreHorizontal className="w-full h-full" />
            </button>
        </div>
    </div>
));

const SongRowCompact = React.memo(({ song, index, currentTrackId, isPlaying, onPlay }) => (
    <div
        className={`grid grid-cols-12 gap-4 py-2 rounded-md hover:bg-[#1d1d1d] transition-colors group cursor-pointer ${
            currentTrackId === song.id ? 'bg-[#1d1d1d]' : ''
        }`}
        onClick={() => onPlay(song.id)}
    >
        <div className="col-span-1 flex items-center px-8">
            {currentTrackId === song.id && isPlaying ? (
                <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-green-400 animate-pulse"></div>
                    <div className="w-1 h-4 bg-green-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-4 bg-green-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
            ) : (
                <>
                    <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                    <Play className="w-4 h-4 text-white hidden group-hover:block" />
                </>
            )}
        </div>

        <div className="col-span-3 flex items-center">
            <div className={`font-medium truncate text-sm ${currentTrackId === song.id ? 'text-green-400' : 'text-white'}`}>
                {song.title}
            </div>
        </div>

        <div className="col-span-3 flex items-center">
            <span className="text-gray-400 text-sm truncate">{song.artists}</span>
        </div>

        <div className="col-span-2 flex items-center">
            <span className="text-gray-400 text-sm truncate">{song.album}</span>
        </div>

        <div className="col-span-2 flex items-center">
            <span className="text-gray-400 text-sm">{song.dateAdded}</span>
        </div>

        <div className="col-span-1 flex items-center gap-2 justify-end">
            <span className="text-gray-400 text-sm">{song.duration}</span>
            <button  className="w-6 h-6 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100     transition-opacity">
                <MoreHorizontal className="w-full h-full" />
            </button>
        </div>
    </div>
));

SongRowList.displayName = 'SongRowList';
SongRowCompact.displayName = 'SongRowCompact';

const Inside = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [viewMode, setViewMode] = useState('List');
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const {
        currentTrackId,
        currentTrackIndex,
        isPlaying,
        showVideoComponent,
        songs,
        currentSong,
        playTrack,
        playPause,
        setShowVideo,
        audioRef,
        videoRef
    } = usePlayer();

    const playlists = useMemo(() => [
        {
            id: 1,
            title: "BOLLYWOOD CENTRAL",
            subtitle: "Bollywood Central, jab baje toh seedha dil ke",
            image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop",
            color: "bg-gradient-to-br from-pink-500 to-red-500"
        }
    ], []);

    const handleScroll = useCallback(() => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            const shouldBeScrolled = scrollContainer.scrollTop > 100;
            if (shouldBeScrolled !== isScrolled) {
                setIsScrolled(shouldBeScrolled);
            }
        }
    }, [isScrolled]);

    useEffect(() => {
        const scrollContainer = scrollRef.current;

        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", handleScroll);
            }
        };
    }, [handleScroll]);

    const handlePlay = useCallback((actionOrId) => {
        if (typeof actionOrId === 'number') {
            if (currentTrackId === actionOrId) {
                playPause();
            } else {
                playTrack(actionOrId);
            }
        } else {
            playPause();
        }
        setShowVideo(true);
    }, [currentTrackId, playPause, playTrack, setShowVideo]);

    const handleViewChange = useCallback((mode) => {
        setViewMode(mode);
        setShowDropdown(false);
    }, []);

    const toggleDropdown = useCallback(() => {
        setShowDropdown(prev => !prev);
    }, []);

    const MainPlayButton = useMemo(() => (
        <button
            className="bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center w-12 h-12 transition-all hover:scale-105"
            onClick={() => handlePlay(currentTrackId)}
        >
            {isPlaying ?
                <Pause className="w-5 h-5 text-black fill-black" /> :
                <Play className="w-5 h-5 text-black fill-black ml-1" />
            }
        </button>
    ), [isPlaying, currentTrackId, handlePlay]);

    const HeaderSection = useMemo(() => (
        <div className="flex items-center justify-between p-4 bg-[#141414]">
            <div className="flex items-center space-x-4">
                {MainPlayButton}
                {!isScrolled && (
                    <>
                        <button className="border-2 border-zinc-500 text-zinc-500 hover:border-white hover:text-white rounded-full p-2 transition-colors">
                            <Plus className="w-5 h-5" />
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <MoreHorizontal className="w-6 h-6" />
                        </button>
                    </>
                )}
            </div>
            <div className="relative">
                <button
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    onClick={toggleDropdown}
                >
                    <span className="text-sm">{viewMode}</span>
                    <Menu className="w-4 h-4" />
                </button>

                {showDropdown && (
                    <div className="absolute right-0 top-full mt-2 bg-[#1a1a1a] rounded-md shadow-lg z-10 min-w-[150px]">
                        <div className="py-1">
                            <span className="flex items-center space-x-3 px-4 py-2 text-sm font-semibold text-gray-300">View as</span>
                            <button
                                className={`flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left transition-colors ${viewMode === 'Compact' ? 'text-green-400' : ''}`}
                                onClick={() => handleViewChange('Compact')}
                            >
                                <LayoutList className="w-4 h-4" />
                                <span>Compact</span>
                                {viewMode === 'Compact' && <div className="w-1 h-1 bg-green-400 rounded-full ml-auto"></div>}
                            </button>
                            <button
                                className={`flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left transition-colors ${viewMode === 'List' ? 'text-green-400' : ''}`}
                                onClick={() => handleViewChange('List')}
                            >
                                <List className="w-4 h-4" />
                                <span>List</span>
                                {viewMode === 'List' && <div className="w-1 h-1 bg-green-400 rounded-full ml-auto"></div>}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    ), [MainPlayButton, isScrolled, showDropdown, viewMode, toggleDropdown, handleViewChange]);

    const SongList = useMemo(() => {
        if (viewMode === 'List') {
            return (
                <>
                    <div className="grid grid-cols-12 gap-4 px-8 py-3 sticky top-[-5px] bg-[#121212] text-gray-400 text-sm font-medium border-b border-[#1d1d1d]">
                        <div className="col-span-1 pl-2">#</div>
                        <div className="col-span-5">Title</div>
                        <div className="col-span-4 hidden sm:block">Album</div>
                        <div className="col-span-1 hidden md:block">Date added</div>
                        <div className="col-span-1 flex justify-center">
                            <Clock className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="px-6">
                        {songs.map((song, index) => (
                            <SongRowList
                                key={song.id}
                                song={song}
                                index={index}
                                currentTrackId={currentTrackId}
                                isPlaying={isPlaying}
                                onPlay={handlePlay}
                                setDropdownOpen={setDropdownOpen}
                                dropdownOpen={dropdownOpen}
                            />
                        ))}
                    </div>
                </>
            );
        } else {
            return (
                <div className="px-4">
                    <div className="grid grid-cols-12 gap-4 py-2 border-b border-[#1d1d1d] sticky top-[-5px] bg-[#121212] text-gray-400 text-sm font-medium">
                        <div className="col-span-1 pl-8">#</div>
                        <div className="col-span-3">Title</div>
                        <div className="col-span-3">Artist</div>
                        <div className="col-span-2">Album</div>
                        <div className="col-span-2">Date added</div>
                        <div className="col-span-1 flex justify-center">
                            <Clock className="w-4 h-4" />
                        </div>
                    </div>

                    {songs.map((song, index) => (
                        <SongRowCompact
                            key={song.id}
                            song={song}
                            index={index}
                            currentTrackId={currentTrackId}
                            isPlaying={isPlaying}
                            onPlay={handlePlay}
                        />
                    ))}
                </div>
            );
        }
    }, [viewMode, songs, currentTrackId, isPlaying, handlePlay]);

    return (
        <div className="flex bg-[#121212] text-white min-h-screen">
            <div className="flex-1 rounded-lg" ref={scrollRef}>
                {playlists.map(item => (
                    <div key={item.id} className="p-7 relative" style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${item.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}>
                        <h4 className="text-sm opacity-80">Public Playlist</h4>
                        <h1 className="text-3xl md:text-8xl font-bold mb-3">{item.title}</h1>
                        <p className="text-gray-300 mb-2">{item.subtitle}</p>
                        <div className="flex mt-1 gap-1 items-center text-sm">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-black font-bold text-xs">S</span>
                            </div>
                            <p className="font-bold">Spotify</p>
                            <span className="w-1 rounded-full bg-gray-300 h-1"></span>
                            <div className="font-semibold text-gray-300">1,523,558 saves</div>
                            <span className="w-1 rounded-full bg-gray-300 h-1"></span>
                            <div className="font-semibold text-gray-300">50 songs, about 3 hr</div>
                        </div>
                    </div>
                ))}

                <div className="bg-[#121212]">
                    {HeaderSection}
                    {SongList}
                </div>
            </div>

            {showVideoComponent && (
                <VideoPlayer 
                    currentTrackId={currentTrackId}
                    showVideoComponent={showVideoComponent}
                    currentSong={currentSong}
                    isPlaying={isPlaying}
                    handlePlay={handlePlay}
                    navigate={navigate}
                    videoRef={videoRef}
                    onClose={() => setShowVideo(false)}
                />
            )}

            <BottomPlayer
                songs={songs}
                currentTrackId={currentTrackId}
                currentTrackIndex={currentTrackIndex}
                isPlaying={isPlaying}
                handlePlay={handlePlay}
                audioRef={audioRef}
                videoRef={videoRef}
            />
        </div>
    );
};

export default Inside;