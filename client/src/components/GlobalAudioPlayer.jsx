import { useEffect, useRef } from 'react';
import { usePlayer } from '../hooks/redux';

const GlobalAudioManager = () => {
    const audioRef = useRef(null);
    const videoRef = useRef(null);
    
    const {
        currentSong,
        isPlaying,
        volume,
        isMuted,
        skipNext,
        updateCurrentTime,
        updateDuration,
        setPlayerLoading,
        setPlayerError,
        registerAudioRef,
        registerVideoRef,
    } = usePlayer();

    useEffect(() => {
        registerAudioRef(audioRef.current);
        registerVideoRef(videoRef.current);
    }, [registerAudioRef, registerVideoRef]);

    useEffect(() => {
        if (currentSong && audioRef.current) {
        setPlayerLoading(true);
        audioRef.current.src = currentSong.audioUrl;
        audioRef.current.load();
        
        if (isPlaying) {
            audioRef.current.play()
            .then(() => {
                setPlayerLoading(false);
                setPlayerError(null);
            })
            .catch(error => {
                console.error('Audio playback error:', error);
                setPlayerError(error.message);
                setPlayerLoading(false);
            });
        }
        }

        if (currentSong && videoRef.current && currentSong.video) {
        videoRef.current.src = currentSong.video;
        videoRef.current.load();
        
        if (isPlaying) {
            videoRef.current.play().catch(error => {
            console.error('Video playback error:', error);
            });
        }
        }
    }, [currentSong, setPlayerLoading, setPlayerError]);

    useEffect(() => {
        if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.play().catch(error => {
            console.error('Audio play error:', error);
            setPlayerError(error.message);
            });
        } else {
            audioRef.current.pause();
        }
        }

        if (videoRef.current) {
        if (isPlaying) {
            videoRef.current.play().catch(error => {
            console.error('Video play error:', error);
            });
        } else {
            videoRef.current.pause();
        }
        }
    }, [isPlaying, setPlayerError]);

    useEffect(() => {
        if (audioRef.current) {
        audioRef.current.volume = isMuted ? 0 : volume;
        }
        if (videoRef.current) {
        videoRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
        updateCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
        updateDuration(audio.duration);
        };

        const handleEnded = () => {
        skipNext();
        };

        const handleError = (e) => {
        console.error('Audio error:', e);
        setPlayerError('Failed to load audio');
        setPlayerLoading(false);
        };

        const handleCanPlay = () => {
        setPlayerLoading(false);
        };

        const handleWaiting = () => {
        setPlayerLoading(true);
        };

        const handleCanPlayThrough = () => {
        setPlayerLoading(false);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);
        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('waiting', handleWaiting);
        audio.addEventListener('canplaythrough', handleCanPlayThrough);

        return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('waiting', handleWaiting);
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        };
    }, [skipNext, updateCurrentTime, updateDuration, setPlayerError, setPlayerLoading]);

    return (
        <>
        <audio
            ref={audioRef}
            preload="metadata"
            style={{ display: 'none' }}
        />
        <video
            ref={videoRef}
            preload="metadata"
            style={{ display: 'none' }}
            muted={true}
        />
        </>
    );
};

export default GlobalAudioManager;