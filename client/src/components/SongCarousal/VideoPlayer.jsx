import {useEffect} from 'react';
import { usePlayer } from '../../hooks/redux';
import { X, ExternalLink, Volume2, Play, Pause } from 'lucide-react';

const VideoPlayer = () => {
  const {
    currentTrackId,
    showVideoComponent,
    currentSong,
    isPlaying,
    videoRef,
    isMuted,
    handlePlay,
    navigate,
  } = usePlayer();

useEffect(() => {
  const video = videoRef?.current;
  if (!video) return;

  video.muted = isMuted;

  video.load();

  if (isPlaying) {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.error('Autoplay failed:', err);
      });
    }
  } else {
    video.pause();
  }
}, [currentSong?.id, isPlaying, isMuted]);


    if (!currentTrackId || !showVideoComponent) {
        return null;
    }



    return (
        <div className="w-80 h-full sticky top-0 pl-2 border-l bg- border-[#1d1d1d] hidden md:flex flex-col">
      <div>
        <div className="flex-1 flex items-center justify-center ">
          {currentSong?.video ? (
            <div className="relative w-full h-80 group">
              <button
                onClick={() => navigate('/video-detail')}
                className="absolute top-2 right-2 z-20 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                title="Open in Full View"
              >
                <ExternalLink size={18} />
              </button>

              <video
                ref={videoRef}
                className="w-full h-full object-cover overflow-hidden rounded-lg shadow-2xl"
                muted={isMuted}
                loop
                playsInline
                poster={currentSong?.image}
              >
                <source src={currentSong?.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <div className="w-full h-64 z-30 bg-gradient-to-br from-purple-900 to-pink-900 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Volume2 className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <p className="text-white/70">Audio Only</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-400 rounded-full p-3 transition-colors"
              onClick={() => handlePlay(currentTrackId)}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-black" />
              ) : (
                <Play className="w-5 h-5 text-black ml-1" />
              )}
            </button>
            <div className="text-center">
              <div className="text-white font-medium">{currentSong?.title}</div>
              <div className="text-gray-400 text-sm">{currentSong?.artists}</div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default VideoPlayer;