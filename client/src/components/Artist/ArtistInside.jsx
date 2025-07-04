import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { usePlayer } from "../../hooks/redux";
import api from "../../utils/axios";
import { Play, Pause, MoreHorizontal, Clock } from "lucide-react";
import BottomPlayer from "../Player";
import { useDispatch } from "react-redux";
import { addRecentlyPlayedArtist  } from "../../redux/recentlyPlayedPlaylistsSlice";
import Verify from '../../assets/tick.png'

const SongRowList = React.memo(({ song, index, currentTrackId, isPlaying, onPlay, setDropdownOpen, dropdownOpen }) => (
    <div
        className={`grid grid-cols-12 gap-4 py-2 px-2 rounded-md hover:bg-[#1d1d1d] transition-colors group cursor-pointer ${
            currentTrackId === song.id ? 'bg-[#1d1d1d]' : ''
        }`}
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
                <div className="text-sm text-gray-400 truncate">{song.artist.map(a => a.name).join(", ") || 'Unknown'}</div>
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

const ArtistPage = () => {
    const { artistId } = useParams();
    const [artist, setArtist] = useState(null);
    const [artistSongs, setArtistSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const dispatch = useDispatch()

    const {
        currentTrackId,
        currentPlaylistId,
        currentTrackIndex,
        isPlaying,
        playTrack,
        playPause,
        switchPlaylist,
    } = usePlayer();

    useEffect(() => {
        const fetchArtistAndSongs = async () => {
            try {
                const { data: artistData } = await api.get(`/artist/${artistId}`);
                setArtist(artistData);

                const formattedSongs = artistData.songs.map(song => ({
                    ...song,
                    id: song._id,
                    audioUrl: song.audioUrl || song.url,
                }));
                setArtistSongs(formattedSongs);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchArtistAndSongs();
    }, [artistId]);

    useEffect(() => {
        if (artist && artist._id && artist.name) {
            dispatch(addRecentlyPlayedArtist({
                id: artist._id,
                name: artist.name,
                photo: artist.photo || artist.image || artist.profileImage
            }));
        }
    }, [artist, dispatch]);

    const handlePlay = useCallback((song, index) => {
        if (currentPlaylistId !== artistId) {
            switchPlaylist(artistId, artistSongs);
        }
        
        if (song.id === currentTrackId && currentPlaylistId === artistId) {
            playPause();
        } else {
            playTrack(song.id, index);
        }
    }, [currentTrackId, currentPlaylistId, artistId, playPause, playTrack, switchPlaylist, artistSongs]);

    const isArtistPlaylist = currentPlaylistId === artistId;

    const MainPlayButton = (
        <button
            className="bg-green-500 hover:bg-green-400 rounded-full w-12 h-12 flex items-center justify-center"
            onClick={() => {
                if (!artistSongs.length) return;

                if (currentPlaylistId !== artistId) {
                    switchPlaylist(artistId, artistSongs);
                }

                if (!isArtistPlaylist || !currentTrackId) {
                    playTrack(artistSongs[0].id, 0);
                } else {
                    playPause();
                }
            }}
        >
            {isPlaying && isArtistPlaylist ? (
                <Pause className="w-5 h-5 text-black fill-black" />
            ) : (
                <Play className="w-5 h-5 text-black fill-black ml-[1px]" />
            )}
        </button>
    );

    if (loading) return <div className="text-white p-4">Loading artist...</div>;

    return (
        <div className="bg-[#121212] text-white min-h-screen">
            <div>
                <div className="flex items-center space-x-4 bg-emerald-950 p-5">
                    <div className="w-48 h-48 bg-emerald-950 rounded-full overflow-hidden shadow-2xl">
                        <img 
                            src={artist.image} 
                            alt={artist.name} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <img src={Verify} className="w-4" alt="" />
                            <span className="text-sm text-gray-300">Verified Artist</span>
                        </div>
                        <h1 className="text-6xl font-bold">{artist.name}</h1>
                        {/* <p className="text-gray-300 text-lg">{artist.monthlyListeners} monthly listeners</p> */}
                    </div>
                </div>
            </div>

            <div className="p-6 bg-gradient-to-b from-emerald-950 to-emerald-900/10">
                {MainPlayButton}
            </div>

            <div>
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
                    {artistSongs.length > 0 ? (
                        artistSongs.map((song, index) => (
                            <SongRowList
                                key={song.id}
                                song={song}
                                index={index}
                                currentTrackId={currentTrackId}
                                isPlaying={isPlaying && isArtistPlaylist}
                                onPlay={handlePlay}
                                dropdownOpen={dropdownOpen}
                                setDropdownOpen={setDropdownOpen}
                            />
                        ))
                    ) : (
                        <p className="text-gray-400">No songs found for this artist.</p>
                    )}
                </div>
            </div>

            {currentTrackId && (
                <BottomPlayer
                    songs={artistSongs}
                    currentTrackId={currentTrackId}
                    currentTrackIndex={currentTrackIndex}
                    isPlaying={isPlaying}
                    handlePlay={handlePlay}
                />
            )}
        </div>
    );
};

export default ArtistPage;