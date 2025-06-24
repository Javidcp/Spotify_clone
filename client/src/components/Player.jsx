import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2,VolumeX, Expand, ListMusic, Plus, MicVocal, SquarePlay } from 'lucide-react';
import { useState } from 'react';
import { usePlayer } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';

const BottomPlayer = () => {
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const navigate = useNavigate()
    const { currentSong, isPlaying,currentTime, duration, volume, isMuted, isLoading, playPause, skipNext, skipPrevious, updateVolume, toggleMuteVolume,audioRef} = usePlayer();
    
    if (!currentSong) return null;

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };
    console.log(showVolumeSlider);
    const handleProgressChange = (e) => {
        const newTime = (e.target.value / 100) * duration;
        if (audioRef) {
            audioRef.currentTime = newTime;
        }
    };
    const handleVolumeChange = (e) => {
        const newVolume = e.target.value / 100;
        updateVolume(newVolume);
    };
    const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] px-4 py-3 flex items-center justify-between z-50">
            <div className="flex items-center space-x-3 w-1/3">
                <div className="w-14 h-14 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                    <img src={currentSong.image} alt={currentSong.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                    <div className="text-white font-medium truncate text-sm">{currentSong.title}</div>
                    <div className="text-gray-400 text-xs truncate">{currentSong.artists}</div>
                </div>
            </div>

            <div className="flex flex-col items-center w-1/3 max-w-2xl">
                <div className="flex items-center space-x-4 mb-2">
                    <button
                        onClick={skipPrevious}
                        className="text-gray-400 hover:text-white transition-colors"
                        disabled={isLoading}
                    >
                        <SkipBack className="w-5 h-5" />
                    </button>
                    
                    <button
                        onClick={playPause}
                        className="bg-white hover:bg-gray-200 rounded-full flex items-center justify-center w-8 h-8 transition-all"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        ) : isPlaying ? (
                            <Pause className="w-4 h-4 text-black fill-black" />
                        ) : (
                            <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                        )}
                    </button>
                    
                    <button
                        onClick={skipNext}
                        className="text-gray-400 hover:text-white transition-colors"
                        disabled={isLoading}
                    >
                        <SkipForward className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center space-x-3 w-full">
                    <span className="text-xs text-gray-400 w-10 text-right">
                        {formatTime(currentTime)}
                    </span>
                    <div className="flex-1 relative">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progressPercentage}
                            onChange={handleProgressChange}
                            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                            style={{
                                background: `linear-gradient(to right, #1db954 0%, #1db954 ${progressPercentage}%, #4a4a4a ${progressPercentage}%, #4a4a4a 100%)`
                            }}
                        />
                    </div>
                    <span className="text-xs text-gray-400 w-10">
                        {formatTime(duration)}
                    </span>
                </div>
            </div>

            <div className="flex items-center flex-1 justify-end space-x-3 min-w-0">
                <div className="flex items-center space-x-2 relative">
                    <button onClick={toggleMuteVolume} className="text-gray-400 hover:text-white transition-colors" onMouseEnter={() => setShowVolumeSlider(true)} >
                        {isMuted || volume === 0 ? (
                            <VolumeX size={20} />
                        ) : (
                            <Volume2 size={20} />
                        )}
                    </button>
                        
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={isMuted ? 0 : volume * 100}
                        onChange={handleVolumeChange}
                        className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        style={{ background: `linear-gradient(to right, #ffffff 0%, #fff ${isMuted ? 0 : volume * 100}%, #696969 ${isMuted ? 0 : volume * 100}%, #696969 100%)` }}
                    />
                </div>

                <button onClick={() => navigate('/full')} className="p-2 text-gray-400 hover:text-white transition-colors" title="Expand" >
                    <Expand size={20} />
                </button>
            </div>


            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #1db954;
                    cursor: pointer;
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                
                .slider:hover::-webkit-slider-thumb {
                    opacity: 1;
                }
                
                .slider::-moz-range-thumb {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #1db954;
                    cursor: pointer;
                    border: none;
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                
                .slider:hover::-moz-range-thumb {
                    opacity: 1;
                }
            `}</style>
        </div>
    );
};

export default BottomPlayer;