import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Plus, Download, Menu,Heart, LayoutList, List, Clock } from 'lucide-react';
import { usePlayer } from '../hooks/redux';
import BottomPlayer from './Player';
import VideoPlayer from './SongCarousal/VideoPlayer';

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

        <div className="col-span-1 flex items-center justify-end">
            <span className="text-gray-400 text-sm">{song.duration}</span>
        </div>
    </div>
));

const SongRowCompact = React.memo(({ song, index, currentTrackId, isPlaying, onPlay }) => (
    <div className={`grid grid-cols-12 gap-4 py-2 rounded-md hover:bg-[#1d1d1d] transition-colors group cursor-pointer ${currentTrackId === song.id ? 'bg-[#1d1d1d]' : ''}`} onClick={() => onPlay(song.id)}>
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

        <div className="col-span-1 flex items-center justify-center">
            <span className="text-gray-400 text-sm">{song.duration}</span>
        </div>
    </div>
));

SongRowList.displayName = 'SongRowList';
SongRowCompact.displayName = 'SongRowCompact';

const LikedSong = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [viewMode, setViewMode] = useState('List');
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollRef = useRef(null);
    const navigate = useNavigate();

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
                        
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <Download className="w-6 h-6" />
                        </button>
                    </>
                )}
            </div>
            <div className="relative">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors" onClick={toggleDropdown}>
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
                        <div className="col-span-1 flex justify-end">
                            <Clock className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="px-6">
                        {/* {songs.map((song, index) => (
                            <SongRowList
                                key={song.id}
                                song={song}
                                index={index}
                                currentTrackId={currentTrackId}
                                isPlaying={isPlaying}
                                onPlay={handlePlay}
                            />
                        ))} */}
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

                    {/* {songs.map((song, index) => (
                        <SongRowCompact
                            key={song.id}
                            song={song}
                            index={index}
                            currentTrackId={currentTrackId}
                            isPlaying={isPlaying}
                            onPlay={handlePlay}
                        />
                    ))} */}
                </div>
            );
        }
    }, [viewMode]);

    return (
        <div className="flex bg-[#121212] text-white min-h-screen">
            <div className="flex-1 rounded-lg" ref={scrollRef}>
                
                    <div className="bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950 font-inter text-gray-100 p-4 sm:p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-8 ">
                            <div className="relative w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-indigo-700 to-purple-700 rounded-lg flex items-center justify-center shadow-2xl">
                            <Heart className="w-24 h-24 text-white" fill="white" />
                            </div>

                            <div className="flex flex-col text-center sm:text-left">
                            <span className="text-sm font-semibold text-gray-300">Playlist</span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-2 mb-4">
                                Liked Songs
                            </h1>
                            <p className="text-sm text-gray-200">
                                Javid - <span className="font-semibold">1 song</span>
                            </p>
                            </div>
                        </div>
                    </div>

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

export default LikedSong;