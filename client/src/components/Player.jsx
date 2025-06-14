import React, { useState, useRef, useEffect } from 'react';
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Shuffle,
    Repeat,
    Volume2,
    Expand,
    ListMusic,
    Plus,
    MicVocal,
    SquarePlay
} from 'lucide-react';

const BottomPlayer = ({ songs, currentTrackId, currentTrackIndex, isPlaying, setIsPlaying, handlePlay, audioRef, videoRef }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(80); // Initial volume
    const [showPlayer, setShowPlayer] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one

    const currentSong = songs.find(song => song.id === currentTrackId);

    const formatTime = (seconds) => {
        if (isNaN(seconds) || seconds < 0) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handlePlayPause = () => {
        setIsPlaying(prev => {
            const newState = !prev;
            if (audioRef.current) {
                newState ? audioRef.current.play().catch(e => console.error("Audio playback error:", e)) : audioRef.current.pause();
            }
            if (videoRef.current) {
                newState ? videoRef.current.play().catch(e => console.error("Video playback error:", e)) : videoRef.current.pause();
            }
            if (!showPlayer) setShowPlayer(true); // Ensure player is visible on play
            return newState;
        });
    };

    const handleProgressChange = (e) => {
        if (!audioRef.current || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = percent * duration;
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
    };

    const handleVolumeChange = (e) => {
        if (!audioRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newVolume = Math.max(0, Math.min(100, Math.floor(percent * 100))); // Ensure volume is between 0-100
        setVolume(newVolume);
        audioRef.current.volume = newVolume / 100;
    };

    const toggleRepeat = () => {
        setRepeatMode((prev) => {
            const newMode = (prev + 1) % 3;
            if (audioRef.current) {
                audioRef.current.loop = newMode === 2; // Loop only for repeat one (mode 2)
            }
            return newMode;
        });
    };

    const handleSkipBack = () => {
        if (currentTrackIndex !== null) {
            handlePlay('previous'); // Call handlePlay from parent
        }
    };

    const handleSkipForward = () => {
        if (currentTrackIndex !== null) {
            handlePlay('next'); // Call handlePlay from parent
        }
    };

    // Effect to handle song change and start playback
    useEffect(() => {
        if (currentSong && audioRef.current) {
            audioRef.current.src = currentSong.audioUrl;
            audioRef.current.load(); // Load the new audio source

            if (isPlaying) {
                audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
            }

            // Set duration initially if available, otherwise it will update from 'loadedmetadata'
            setDuration(0); // Reset duration on new song
            setCurrentTime(0); // Reset current time on new song
            setShowPlayer(true);
        } else if (!currentSong) {
            setShowPlayer(false);
            setCurrentTime(0);
            setDuration(0);
        }
    }, [currentSong]); // Only re-run when currentSong changes

    // Effect for handling time updates and metadata
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const updateTime = () => setCurrentTime(Math.floor(audio.currentTime));
            const updateDuration = () => {
                if (audio.duration && isFinite(audio.duration)) {
                    setDuration(Math.floor(audio.duration));
                }
            };
            const handleEnded = () => {
                if (repeatMode === 1) { // Repeat all
                    handlePlay('next');
                } else if (repeatMode === 2) { // Repeat one
                    audio.play().catch(e => console.error("Replay failed:", e));
                } else { // No repeat
                    setIsPlaying(false);
                }
            };

            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', updateDuration);
            audio.addEventListener('ended', handleEnded);

            return () => {
                audio.removeEventListener('timeupdate', updateTime);
                audio.removeEventListener('loadedmetadata', updateDuration);
                audio.removeEventListener('ended', handleEnded);
            };
        }
    }, [audioRef, repeatMode, handlePlay]);

    // Sync isPlaying state changes from external sources (e.g., Inside component's video player)
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Playback failed due to external sync:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, audioRef]); // Depend on isPlaying and audioRef


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative">
            <audio ref={audioRef} /> {/* Audio element for playback */}
            <div
                className={`fixed bottom-0 left-0 right-0 bg-black border-t border-[#191919] transition-transform duration-300 z-50 ${ // z-index to ensure it's on top
                    showPlayer ? "translate-y-0" : "translate-y-full"
                }`}
            >
                <div className="px-4 py-1">
                    <div className="flex justify-between items-center h-20"> {/* Adjusted height for better alignment */}
                        {/* Left Section: Song Info & Like Button */}
                        <div className="flex items-center min-w-0 flex-1">
                            <img
                                src={currentSong?.image || "https://via.placeholder.com/64"}
                                alt={currentSong?.title || "No Song"}
                                className="w-14 h-14 rounded-lg mr-4 shadow-lg flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1 mr-4">
                                <h4 className="font-medium text-white truncate">
                                    {currentSong?.title || "No Song Selected"}
                                </h4>
                                <p className="text-xs text-gray-400 truncate">
                                    {currentSong?.artists || "Unknown Artist"}
                                </p>
                            </div>
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className="p-2 hover:bg-gray-700 rounded-full transition-colors flex-shrink-0"
                            >
                                <Plus
                                    size={20}
                                    className={
                                        isLiked
                                            ? "text-green-500 fill-current border-2 rounded-full"
                                            : "text-gray-400 border-2 rounded-full"
                                    }
                                />
                            </button>
                        </div>

                        {/* Middle Section: Playback Controls & Progress Bar */}
                        <div className="flex flex-col justify-center items-center flex-grow max-w-2xl mx-8">
                            <div className="flex items-center space-x-4 mb-1"> {/* Adjusted margin-bottom */}
                                <button
                                    onClick={() => setIsShuffled(!isShuffled)}
                                    className={`p-2 rounded-full transition-colors ${
                                        isShuffled
                                            ? "text-green-500 bg-gray-700"
                                            : "text-gray-400 hover:text-white"
                                    }`}
                                >
                                    <Shuffle size={15} />
                                </button>
                                <button
                                    onClick={handleSkipBack}
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <SkipBack size={20} />
                                </button>
                                <button
                                    onClick={handlePlayPause}
                                    className="bg-white text-black rounded-full p-2.5 hover:scale-105 transition-transform"
                                >
                                    {isPlaying ? (
                                        <Pause size={15} fill="black" />
                                    ) : (
                                        <Play size={15} fill="black" />
                                    )}
                                </button>
                                <button
                                    onClick={handleSkipForward}
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <SkipForward size={20} />
                                </button>
                                <button
                                    onClick={toggleRepeat}
                                    className={`p-2 rounded-full transition-colors relative ${
                                        repeatMode > 0
                                            ? "text-green-500"
                                            : "text-gray-400 hover:text-white"
                                    }`}
                                >
                                    <Repeat size={15} />
                                    {repeatMode === 2 && (
                                        <span className="absolute -top-1 -right-1 text-xs bg-green-500 text-black rounded-full w-3 h-3 flex items-center justify-center font-bold">
                                            1
                                        </span>
                                    )}
                                </button>
                            </div>
                            <div className="flex items-center gap-1.5 w-full">
                                <span className="text-xs text-[#bcb8b8] min-w-[30px] text-right">{formatTime(currentTime)}</span>
                                <div
                                    className="flex-grow h-1 bg-[#2b2b2b] rounded-full cursor-pointer hover:h-2 transition-all group relative"
                                    onClick={handleProgressChange}
                                >
                                    <div
                                        className="h-full bg-green-500 rounded-full relative group-hover:bg-green-400"
                                        style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                                    >
                                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                </div>
                                <span className="text-xs text-[#bcb8b8] min-w-[30px] text-left">{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Right Section: Additional Controls */}
                        <div className="flex items-center flex-1 justify-end space-x-2 min-w-0"> {/* Use flex-1 and justify-end */}
                            <button className="p-1 text-gray-400 hover:text-white transition-colors">
                                <SquarePlay size={20} />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-white transition-colors">
                                <ListMusic size={20} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-white transition-colors">
                                <MicVocal size={20} />
                            </button>
                            <div className="flex items-center space-x-2">
                                <Volume2 size={20} className="text-gray-400" />
                                <div
                                    className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer hover:h-2 transition-all group"
                                    onClick={handleVolumeChange}
                                >
                                    <div
                                        className="h-full bg-white rounded-full relative group-hover:bg-gray-300"
                                        style={{ width: `${volume}%` }}
                                    >
                                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                </div>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-white transition-colors">
                                <Expand size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BottomPlayer;