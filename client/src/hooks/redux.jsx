import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTrack, setIsPlaying, togglePlay, nextTrack, previousTrack,setShowVideoComponent, selectCurrentSong, selectSongs, selectCurrentTrackId, selectCurrentTrackIndex,selectIsPlaying,selectPlayerUIState,setAudioRef,setVideoRef,setCurrentTime,setDuration,setVolume,toggleMute,setLoading,setError} from '../redux/playerSlice';

export const usePlayer = () => {
    const dispatch = useDispatch();
    
    const songs = useSelector(selectSongs);
    const currentTrackId = useSelector(selectCurrentTrackId);
    const currentTrackIndex = useSelector(selectCurrentTrackIndex);
    const isPlaying = useSelector(selectIsPlaying);
    const currentSong = useSelector(selectCurrentSong);
    const uiState = useSelector(selectPlayerUIState);

    const playTrack = useCallback((songId) => {
        const songIndex = songs.findIndex(song => song.id === songId);
        if (songIndex !== -1) {
        dispatch(setCurrentTrack({ trackId: songId, trackIndex: songIndex }));
        dispatch(setIsPlaying(true));
        dispatch(setShowVideoComponent(true));
        }
    }, [dispatch, songs]);

    const playPause = useCallback(() => {
        if (currentTrackId) {
        dispatch(togglePlay());
        } else if (songs.length > 0) {
        playTrack(songs[0].id);
        }
    }, [dispatch, currentTrackId, songs, playTrack]);

    const actions = useMemo(() => ({
        skipNext: () => dispatch(nextTrack()),
        skipPrevious: () => dispatch(previousTrack()),
        updateCurrentTime: (time) => dispatch(setCurrentTime(time)),
        updateDuration: (duration) => dispatch(setDuration(duration)),
        updateVolume: (volume) => dispatch(setVolume(volume)),
        toggleMuteVolume: () => dispatch(toggleMute()),
        setPlayerLoading: (loading) => dispatch(setLoading(loading)),
        setPlayerError: (error) => dispatch(setError(error)),
        setShowVideo: (show) => dispatch(setShowVideoComponent(show)),
        registerAudioRef: (ref) => dispatch(setAudioRef(ref)),
        registerVideoRef: (ref) => dispatch(setVideoRef(ref)),
    }), [dispatch]);

    return useMemo(() => ({
        songs,
        currentTrackId,
        currentTrackIndex,
        isPlaying,
        currentSong,
        ...uiState,
        playTrack,
        playPause,
        ...actions,
    }), [
        songs,
        currentTrackId,
        currentTrackIndex,
        isPlaying,
        currentSong,
        uiState,
        playTrack,
        playPause,
        actions,
    ]);
    };

    export const usePlayerState = () => {
    return useSelector(selectPlayerUIState);
    };

    export const usePlayerActions = () => {
    const dispatch = useDispatch();
    const songs = useSelector(selectSongs);
    
    return useMemo(() => ({
        playTrack: (songId) => {
        const songIndex = songs.findIndex(song => song.id === songId);
        if (songIndex !== -1) {
            dispatch(setCurrentTrack({ trackId: songId, trackIndex: songIndex }));
            dispatch(setIsPlaying(true));
            dispatch(setShowVideoComponent(true));
        }
        },
        playPause: () => dispatch(togglePlay()),
        skipNext: () => dispatch(nextTrack()),
        skipPrevious: () => dispatch(previousTrack()),
    }), [dispatch]);
};