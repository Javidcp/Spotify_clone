
import { useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setCurrentTrack,
  setIsPlaying,
  togglePlay,
  nextTrack,
  previousTrack,
  setShowVideoComponent,
  setPause, 
  clearCurrentTrack,
  setCurrentTime,
  setDuration,
  setVolume,
  toggleMute,
  setHasTrackLoaded,
  setSelectedPlaylist,
  setAudioRef,
  setLoading,
  setShouldAutoPlay,
  setError,
  setCurrentPlaylist,
  fetchPlaylistSongs,
  setSongs,
  selectCurrentTrack,
  selectSongsForCurrentPlaylist,
  selectCurrentTrackId,
  selectCurrentTrackIndex,
  selectIsPlaying,
  selectPlayerUIState,
} from '../redux/playerSlice';

export const usePlayer = () => {
  const dispatch = useDispatch();

  // Refs for audio and video
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  // Redux selectors
  const currentPlaylistId = useSelector((state) => state.player.currentPlaylistId);
  const shouldAutoPlay = useSelector((state) => state.player.shouldAutoPlay);
  const hasTrackLoaded = useSelector((state) => state.player.hasTrackLoaded)

  const songs = useSelector(selectSongsForCurrentPlaylist);
  const currentTrack = useSelector(selectCurrentTrack);
  const currentTrackId = useSelector(selectCurrentTrackId);
  const currentTrackIndex = useSelector(selectCurrentTrackIndex);
  const isPlaying = useSelector(selectIsPlaying);
  const uiState = useSelector(selectPlayerUIState);

  // Register media refs
  const registerAudioRef = useCallback((ref) => {
    audioRef.current = ref;
  }, []);

  const registerVideoRef = useCallback((ref) => {
    videoRef.current = ref;
  }, []);

  // Play a specific track
  const playTrack = useCallback((songId, songIndex = null) => {
    const resolvedIndex =
      songIndex !== null ? songIndex : songs.findIndex((song) => song.id === songId);

    if (resolvedIndex !== -1) {
      const song = songs[resolvedIndex];

      dispatch(
        setCurrentTrack({
          trackId: songId,
          trackIndex: resolvedIndex,
          song,
        })
      );
      dispatch(setIsPlaying(true));

      if (song?.video || song?.videoUrl) {
        dispatch(setShowVideoComponent(true));
      } else {
        dispatch(setShowVideoComponent(false));
      }
    }
  }, [dispatch, songs]);

  // Toggle play/pause or start playing first track
  const playPause = useCallback(() => {
    if (currentTrackId) {
      dispatch(togglePlay());
    } else if (songs.length > 0) {
      playTrack(songs[0].id, 0);
    }
  }, [dispatch, currentTrackId, songs, playTrack]);
  const pausePlayback = useCallback(() => {
  dispatch(setPause());
}, [dispatch]);

const clearTrack = useCallback(() => {
  dispatch(clearCurrentTrack());
}, [dispatch]);

// const switchPlaylist = useCallback((playlistId, songsData = null) => {
//   dispatch(setCurrentPlaylist(playlistId));

//   if (songsData && songsData.length > 0) {
//     dispatch(setSongs(songsData));
//     // Auto-select first track and start playing
//     dispatch(setCurrentTrack({ trackId: songsData[0].id, trackIndex: 0 }));
//     dispatch(setIsPlaying(true));
//   } else {
//     dispatch(fetchPlaylistSongs(playlistId));
//     // For async fetch, you may want to handle auto-play when fetch completes
//   }

//   dispatch(setShowVideoComponent(false));
// }, [dispatch]);

const switchPlaylist = useCallback((playlistId, songsData = null, options = { autoPlay: false, preserveCurrentTrack: true }) => {
  dispatch(setCurrentPlaylist(playlistId));

  if (songsData && songsData.length > 0) {
    dispatch(setSongs(songsData));

    if (options.autoPlay && !options.preserveCurrentTrack) {
      dispatch(setCurrentTrack({ trackId: songsData[0].id, trackIndex: 0, song: songsData[0] }));
      dispatch(setIsPlaying(true));
    }
    // else do nothing, current track is preserved
  } else {
    dispatch(fetchPlaylistSongs(playlistId));
    // Optional: Handle preserveCurrentTrack logic after async fetch if needed
  }

  dispatch(setShowVideoComponent(false));
}, [dispatch]);




  // Player control actions
  const actions = useMemo(() => ({
    skipNext: () => {
      dispatch(nextTrack());
      dispatch(setIsPlaying(true));
    },
    skipPrevious: () => {
      dispatch(previousTrack());
      dispatch(setIsPlaying(true));
    },
    updateCurrentTime: (time) => dispatch(setCurrentTime(time)),
    updateDuration: (duration) => dispatch(setDuration(duration)),
    updateVolume: (volume) => dispatch(setVolume(volume)),
    
    toggleMuteVolume: () => dispatch(toggleMute()),
    setPlayerLoading: (loading) => dispatch(setLoading(loading)),
    setPlayerError: (error) => dispatch(setError(error)),
    setShowVideo: (show) => dispatch(setShowVideoComponent(show)),
    switchPlaylist,
    registerAudioRef: (ref) => dispatch(setAudioRef(ref)),
    registerVideoRef,
    setSongs: (songs) => dispatch(setSongs(songs)),
    setShouldAutoPlay: (value) => dispatch(setShouldAutoPlay(value)),

  }), [dispatch, switchPlaylist, registerAudioRef, registerVideoRef]);

  // Final object returned
  return useMemo(() => ({
    currentPlaylistId,
    songs,
    currentTrackId,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    shouldAutoPlay,
    audioRef: audioRef.current,
    videoRef,
    showVideoComponent: uiState.showVideoComponent,
    volume: uiState.volume,
    isMuted: uiState.isMuted,
    currentTime: uiState.currentTime,
    duration: uiState.duration,
    isLoading: uiState.isLoading,
    hasTrackLoaded,
    error: uiState.error,
    pausePlayback,
clearTrack,
    playTrack,
    playPause,
    ...actions,
  }), [
    currentPlaylistId,
    songs,
    currentTrackId,
    shouldAutoPlay,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    hasTrackLoaded,
    pausePlayback,
clearTrack,
    uiState,
    playTrack,
    playPause,
    actions,
  ]);
};
