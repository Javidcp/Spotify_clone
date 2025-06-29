import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Play, Pause, Plus, MoreHorizontal, Menu, LayoutList, List, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from "../../assets/Spotify logo.png"
import { 
    fetchPlaylistSongs,
    setCurrentPlaylist,
    setSongsForPlaylist,
    playTrackFromPlaylist,
    togglePlay,
    setShowVideoComponent,
    clearCurrentTrack,
    setSelectedPlaylist,
    setIsPlaying,
    selectCurrentTrackId,
    selectCurrentTrackIndex,
    selectCurrentTrack,
    selectIsPlaying,
    selectShowVideoComponent,
    selectSongsForPlaylist,
    selectIsLoadingForPlaylist,
    selectErrorForPlaylist,
    selectCurrentPlaylistId
} from '../../redux/playerSlice';
import BottomPlayer from '../Player';
import VideoPlayer from './VideoPlayer';
import api from '../../utils/axios';
import Dot from "../Dot"
import { toast } from 'react-toastify';

const SongRowList = React.memo(({ song, index, currentTrackId, isPlaying, onPlay, setDropdownOpen, dropdownOpen, isCurrentPlaylist }) => (
    <div
        className={`grid grid-cols-12 gap-4 py-2 px-2 rounded-md hover:bg-[#1d1d1d] transition-colors group cursor-pointer ${
            currentTrackId === song.id ? 'bg-[#1d1d1d]' : ''
        }`}
    >
        <div className="col-span-1 flex items-center">
            {currentTrackId === song.id && isPlaying && isCurrentPlaylist ? (
                <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-green-400 animate-pulse"></div>
                    <div className="w-1 h-4 bg-green-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-4 bg-green-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
            ) : (
                <>
                    <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                    <Play className="w-4 h-4 text-white hidden group-hover:block" onClick={() => onPlay(song, index)}/>
                </>
            )}
        </div>

        <div className="col-span-5 flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-700 rounded flex-shrink-0 overflow-hidden">
                <img src={song.coverImage} alt={song.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="min-w-0">
                <div className={`font-medium truncate ${currentTrackId === song.id ? 'text-green-400' : 'text-white'}`}>
                    {song.title}
                </div>
                <div className="text-sm text-gray-400 truncate">{song.artist?.map(a => a.name).join(", ") || 'Unknown'}</div>
            </div>
        </div>

        <div className="col-span-4 hidden sm:flex items-center">
            <span className="text-gray-400 text-sm truncate hover:underline cursor-pointer">
                {song.genre?.name || "Unknown"}
            </span>
        </div>

        <div className="col-span-1 md:flex items-center hidden">
            <span className="text-gray-400 text-sm">{song.createdAt.slice(0, 10)}</span>
        </div>

        <div className="col-span-1 flex items-center gap-2 justify-end">
            <span className="text-gray-400 text-sm">{song.duration}</span>
            <button 
                onClick={() => setDropdownOpen(dropdownOpen === song.id ? null : song.id)}  
                className="w-6 h-6 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <MoreHorizontal className="w-full h-full" />
            </button>
            {dropdownOpen === song.id && (
                <div className="relative z-50">
                    <Dot
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
));

const SongRowCompact = React.memo(({ song, index, currentTrackId, isPlaying, onPlay, isCurrentPlaylist }) => (
    <div
        className={`grid grid-cols-12 gap-4 py-2 rounded-md hover:bg-[#1d1d1d] transition-colors group cursor-pointer ${
            currentTrackId === song.id ? 'bg-[#1d1d1d]' : ''
        }`}
        onClick={() => onPlay(song, index)}
    >
        <div className="col-span-1 flex items-center px-8">
            {currentTrackId === song.id && isPlaying && isCurrentPlaylist ? (
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
            <span className="text-gray-400 text-sm truncate">{song.artist?.map(a => a.name).join(", ") || 'Unknown'}</span>
        </div>

        <div className="col-span-2 flex items-center">
            <span className="text-gray-400 text-sm">{song.genre?.name || "Unknown"}</span>
        </div>

        <div className="col-span-2 flex items-center">
            <span className="text-gray-400 text-sm">{song.createdAt.slice(0, 10)}</span>
        </div>

        <div className="col-span-1 flex items-center gap-2 justify-end">
            <span className="text-gray-400 text-sm">{song.duration}</span>
            <button className="w-6 h-6 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
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
    const [genrePlaylist, setGenrePlaylist] = useState(null);
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const { playlistId } = useParams();
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const currentTrackId = useSelector(selectCurrentTrackId);
    const currentTrackIndex = useSelector(selectCurrentTrackIndex);
    const currentTrack = useSelector(selectCurrentTrack);
    const isPlaying = useSelector(selectIsPlaying);
    const showVideoComponent = useSelector(selectShowVideoComponent);
    const currentPlaylistId = useSelector(selectCurrentPlaylistId);
    
    const isLoadingPlaylist = useSelector(selectIsLoadingForPlaylist(playlistId));
    const playlistError = useSelector(selectErrorForPlaylist(playlistId));
    
    // Check if this playlist is the currently playing playlist
    const isCurrentPlaylist = currentPlaylistId === playlistId;
    
    useEffect(() => {
        dispatch(setSelectedPlaylist(playlistId)); // just for viewing
        dispatch(fetchPlaylistSongs(playlistId));  // fetch if not already
    }, [playlistId, dispatch]);

    const songs = useSelector((state) =>
        state.player.playlists[playlistId]?.songs || []
    );

    // REMOVED: The effect that pauses music when switching playlists
    // This allows music to continue playing when browsing other playlists

    useEffect(() => {
        const fetchGenrePlaylist = async () => {
            try {
                console.log('Fetching playlist:', playlistId);
                const result = await dispatch(fetchPlaylistSongs(playlistId));

                if (fetchPlaylistSongs.fulfilled.match(result)) {
                    console.log('Playlist songs fetched via Redux:', result.payload);
                } else {
                    console.warn('Redux fetch failed, trying direct API call');

                    const { data } = await api.get(`/genre-playlists/${playlistId}`);
                    console.log('Fetched playlist data directly:', data);

                    setGenrePlaylist(data);

                    if (data.songs && Array.isArray(data.songs)) {
                        const processedSongs = data.songs.map(song => ({
                            ...song,
                            id: song._id,
                            audioUrl: song.audioUrl || song.url || song.src || song.audio || song.file,
                            video: song.video || song.videoUrl || null
                        }));

                        console.log('Processed songs:', processedSongs);
                        // Only update playlist state, not player queue
                        dispatch(setSongsForPlaylist({ playlistId, songs: processedSongs }));
                    }
                }

                // Only update current playlist if no music is currently playing
                // or if this is the first playlist being loaded
                if (!currentPlaylistId || !currentTrack) {
                    dispatch(setCurrentPlaylist(playlistId));
                }

            } catch (error) {
                console.error("Error fetching genre playlist:", error);
            }
        };

        if (playlistId) fetchGenrePlaylist();
    }, [playlistId, dispatch, currentPlaylistId, currentTrack]);

    useEffect(() => {
        const fetchPlaylistMetadata = async () => {
            if (!genrePlaylist && playlistId) {
                try {
                    const { data } = await api.get(`/genre-playlists/${playlistId}`);
                    setGenrePlaylist(data);
                } catch (error) {
                    console.error("Error fetching playlist metadata:", error);
                }
            }
        };

        fetchPlaylistMetadata();
    }, [genrePlaylist, playlistId]);

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

    const handlePlay = useCallback((song = null, index = null) => {
        // If clicking on the currently playing song from the same playlist, just toggle play/pause
        if (song && song.id === currentTrackId && isCurrentPlaylist) {
            dispatch(togglePlay());
            return;
        }

        // Play new song from this playlist
        if (song && typeof song === "object") {
            dispatch(
                playTrackFromPlaylist({
                    playlistId,
                    trackId: song.id,
                    trackIndex: index !== null ? index : 0,
                })
            );
        } else {
            // If no song specified, just toggle the current playback
            dispatch(togglePlay());
        }
    }, [currentTrackId, isCurrentPlaylist, playlistId, dispatch]);

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
            onClick={() => {
                // If this playlist is not the current playing playlist, start playing from this playlist
                if (!isCurrentPlaylist || !currentTrack) {
                    if (songs && songs.length > 0) {
                        handlePlay(songs[0], 0);
                    }
                } else {
                    // If this is the current playlist, just toggle play/pause
                    dispatch(togglePlay());
                }
            }}
        >
            {isPlaying && isCurrentPlaylist ?
                <Pause className="w-5 h-5 text-black fill-black" /> :
                <Play className="w-5 h-5 text-black fill-black ml-1" />
            }
        </button>
    ), [isPlaying, currentTrack, isCurrentPlaylist, songs, handlePlay, dispatch]);

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
                        {songs?.length > 0 ? (
                            songs.map((song, index) => (
                                <SongRowList
                                    key={song.id || index}
                                    song={song}
                                    index={index}
                                    currentTrackId={currentTrackId}
                                    isPlaying={isPlaying}
                                    isCurrentPlaylist={isCurrentPlaylist}
                                    onPlay={handlePlay}
                                    dropdownOpen={dropdownOpen}
                                    setDropdownOpen={setDropdownOpen}
                                />
                            ))
                        ) : (
                            <div className="text-center text-gray-400 py-6">
                                {isLoadingPlaylist ? 'Loading songs...' : 'No songs found'}
                            </div>
                        )}
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

                    <div>
                        {songs?.length > 0 ? (
                            songs.map((song, index) => (
                                <SongRowCompact
                                    key={song.id || index}
                                    song={song}
                                    index={index}
                                    currentTrackId={currentTrackId}
                                    isPlaying={isPlaying}
                                    isCurrentPlaylist={isCurrentPlaylist}
                                    onPlay={handlePlay}
                                    dropdownOpen={dropdownOpen}
                                    setDropdownOpen={setDropdownOpen}
                                />
                            ))
                        ) : (
                            <div className="text-center text-gray-400 py-6">
                                {isLoadingPlaylist ? 'Loading songs...' : 'No songs found'}
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    }, [viewMode, currentTrackId, isCurrentPlaylist, isPlaying, handlePlay, songs, isLoadingPlaylist, dropdownOpen]);

    const getTotalDuration = (songs) => {
        let totalSeconds = 0;

        songs.forEach(song => {
            if (song.duration) {
                const [mins, secs] = song.duration.split(":").map(Number);
                totalSeconds += (mins * 60 + secs);
            }
        });

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        let formatted = "";
        if (hours > 0) {
            formatted += `${String(hours).padStart(2, '0')} hrs `;
        }
        if (minutes > 0 || hours > 0) {
            formatted += `${String(minutes).padStart(2, '0')} min `;
        }
        formatted += `${String(seconds).padStart(2, '0')} sec`;
        return formatted.trim();
    };

    const totalDuration = useMemo(() => getTotalDuration(songs), [songs]);

    if (isLoadingPlaylist && !genrePlaylist) {
        return <div className="text-white p-4">Loading playlist...</div>;
    }

    if (playlistError) {
        return <div className="text-white p-4">Error loading playlist: {playlistError}</div>;
    }

    if (!genrePlaylist && !isLoadingPlaylist) {
        return <div className="text-white p-4">Playlist not found</div>;
    }

    return (
        <div className="flex bg-[#121212] text-white min-h-screen">
            <div className="flex-1 rounded-lg" ref={scrollRef}>
                {genrePlaylist && (
                    <div
                        className="p-7 relative"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${genrePlaylist.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <h4 className="text-sm opacity-80">Public Playlist</h4>
                        <h1 className="text-3xl md:text-8xl font-bold mb-3">{genrePlaylist.name}</h1>
                        <p className="text-gray-300 mb-2">{genrePlaylist.description}</p>
                        <div className="flex mt-1 gap-1 items-center text-sm">
                            <img src={Logo} className='w-6 mr-1' alt="" />
                            <p className="font-bold">Spotify</p>
                            <span className="w-1 rounded-full bg-gray-300 h-1"></span>
                            <div className="font-semibold text-gray-300">{songs.length} songs, about {totalDuration}</div>
                        </div>
                    </div>
                )}

                <div className="bg-[#121212]">
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
                    {SongList}
                </div>
            </div>
            {showVideoComponent && (
                <VideoPlayer 
                    navigate={navigate}
                    onClose={() => dispatch(setShowVideoComponent(false))}
                />
            )}
            {currentTrack && (
                <BottomPlayer
                    songs={songs}
                    currentTrackId={currentTrackId}
                    currentTrackIndex={currentTrackIndex}
                    isPlaying={isPlaying}
                    handlePlay={handlePlay}
                />
            )}
        </div>
    );
};

export default Inside;