import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios';

export const fetchPlaylistSongs = createAsyncThunk(
  'player/fetchPlaylistSongs',
  async (playlistId) => {
    const response = await api.get(`/genre-playlists/${playlistId}`);
    const processedSongs = response.data.songs.map(song => ({
      ...song,
      id: song._id,
      audioUrl: song.audioUrl || song.url || song.src || song.audio || song.file,
      video: song.video || song.videoUrl || null,
    }));
    return { playlistId, songs: processedSongs };
  }
);


const initialState = {
  playlists: {},
  currentPlaylistId: null,
  currentTrackId: null,
  currentTrackIndex: null,
  isPlaying: false,
  shouldAutoPlay: false,
  showVideoComponent: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  isLoading: false,
  error: null,
  hasTrackLoaded: false,
  audioRef: null,
  selectedPlaylistId: null,
  isShuffling: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setSongsForPlaylist(state, action) {
      const { playlistId, songs } = action.payload;
      state.playlists[playlistId] = songs;
    },
    setCurrentPlaylist(state, action) {
      state.currentPlaylistId = action.payload;
    },
    setSelectedPlaylist: (state, action) => {
    state.selectedPlaylistId = action.payload;
  },
  toggleShuffle: (state) => {
    state.isShuffling = !state.isShuffling;
  },
    setSongs: (state, action) => {
      const songs = action.payload;
      const playlistId = state.currentPlaylistId;
      
      if (playlistId) {
        if (!state.playlists[playlistId]) {
          state.playlists[playlistId] = { songs: [], isLoading: false, error: null };
        }
        state.playlists[playlistId].songs = songs;
      }
    },
  setCurrentTrack: (state, action) => {
    state.currentTrackId = action.payload.trackId;
    state.currentTrackIndex = action.payload.trackIndex;
  },
  setShouldAutoPlay: (state, action) => {
    state.shouldAutoPlay = action.payload;
  },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
        setAudioRef: (state, action) => {
      state.audioRef = action.payload;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setShowVideoComponent: (state, action) => {
      state.showVideoComponent = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      const duration = Number(action.payload);
  state.duration = isNaN(duration) || duration < 0 ? 0 : duration;
    },
    setVolume: (state, action) => {
      state.volume = Math.max(0, Math.min(1, action.payload));
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    setMuted: (state, action) => {
      state.isMuted = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
            setHasTrackLoaded: (state, action) => {
            state.hasTrackLoaded = action.payload;
        },

    nextTrack: (state) => {
      if (
        state.currentPlaylistId &&
        state.currentTrackIndex !== null &&
        state.playlists[state.currentPlaylistId] &&
        state.playlists[state.currentPlaylistId].songs.length > 0
      ) {
        const songs = state.playlists[state.currentPlaylistId].songs;
        const nextIndex = (state.currentTrackIndex + 1) % songs.length;
        const nextSong = songs[nextIndex];
        state.currentTrackIndex = nextIndex;
        state.currentTrackId = nextSong.id;
        state.currentTime = 0;
        state.duration = 0;
        state.error = null;
      }
    },

    previousTrack: (state) => {
      if (
        state.currentPlaylistId &&
        state.currentTrackIndex !== null &&
        state.playlists[state.currentPlaylistId] &&
        state.playlists[state.currentPlaylistId].songs.length > 0
      ) {
        const songs = state.playlists[state.currentPlaylistId].songs;
        const prevIndex = (state.currentTrackIndex - 1 + songs.length) % songs.length;
        const prevSong = songs[prevIndex];
        state.currentTrackIndex = prevIndex;
        state.currentTrackId = prevSong.id;
        state.currentTime = 0;
        state.duration = 0;
        state.error = null;
      }
    },

    playTrack: (state, action) => {
      const { trackId, trackIndex } = action.payload;
      state.currentTrackId = trackId;
      state.currentTrackIndex = trackIndex;
      state.isPlaying = true;
      state.currentTime = 0;
      state.duration = 0;
      state.error = null;
    },

    playTrackFromPlaylist: (state, action) => {
      const { playlistId, trackId, trackIndex } = action.payload;
      state.currentPlaylistId = playlistId;
      state.currentTrackId = trackId;
      state.currentTrackIndex = trackIndex;
      state.isPlaying = true;
      state.currentTime = 0;
      state.duration = 0;
      state.error = null;
    },

    resetPlayer: (state) => {
      state.currentPlaylistId = null;
      state.currentTrackId = null;
      state.currentTrackIndex = null;
      state.isPlaying = false;
      state.showVideoComponent = false;
      state.currentTime = 0;
      state.duration = 0;
      state.error = null;
      state.isLoading = false;
    },

    seekTo: (state, action) => {
      state.currentTime = action.payload;
    },
setPause: (state) => {
  state.isPlaying = false;
},
clearCurrentTrack: (state) => {
  state.currentTrackId = null;
  state.currentTrackIndex = null;
  state.currentTrack = null;
  state.isPlaying = false;
  state.showVideoComponent = false;
},

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylistSongs.pending, (state, action) => {
        const playlistId = action.meta.arg;
        if (!state.playlists[playlistId]) {
          state.playlists[playlistId] = { songs: [], isLoading: true, error: null };
        } else {
          state.playlists[playlistId].isLoading = true;
          state.playlists[playlistId].error = null;
        }
      })
      .addCase(fetchPlaylistSongs.fulfilled, (state, action) => {
        const { playlistId, songs } = action.payload;
        state.playlists[playlistId] = { songs, isLoading: false, error: null };
        if (!state.currentPlaylistId) {
          state.currentPlaylistId = playlistId;
        }
      })
      .addCase(fetchPlaylistSongs.rejected, (state, action) => {
        const playlistId = action.meta.arg;
        if (!state.playlists[playlistId]) {
          state.playlists[playlistId] = { songs: [], isLoading: false, error: action.error.message };
        } else {
          state.playlists[playlistId].isLoading = false;
          state.playlists[playlistId].error = action.error.message;
        }
      });
  },
});

export const {
  setCurrentPlaylist,
  setSongsForPlaylist,
  setSongs, 
  setCurrentTrack,
  setIsPlaying,
  togglePlay,
  setShowVideoComponent,
  setShouldAutoPlay,
  setCurrentTime,
  setDuration,
  setVolume,
  setPause,
  clearCurrentTrack,
  toggleMute,
  setMuted,
  setAudioRef,
  setLoading,
  toggleShuffle,
  setError,
  clearError,
  nextTrack,
  previousTrack,
  playTrack,
  playTrackFromPlaylist,
  resetPlayer,
  setHasTrackLoaded,
  setSelectedPlaylist,
  seekTo,
} = playerSlice.actions;

export const selectCurrentPlaylistId = (state) => state.player.currentPlaylistId;
export const selectCurrentTrackId = (state) => state.player.currentTrackId;
export const selectCurrentTrackIndex = (state) => state.player.currentTrackIndex;
export const selectIsPlaying = (state) => state.player.isPlaying;
export const selectCurrentTime = (state) => state.player.currentTime;
export const selectDuration = (state) => state.player.duration;
export const selectVolume = (state) => state.player.volume;
export const selectIsMuted = (state) => state.player.isMuted;
export const selectIsLoading = (state) => state.player.isLoading;
export const selectError = (state) => state.player.error;
export const selectShowVideoComponent = (state) => state.player.showVideoComponent;

export const selectAllPlaylists = (state) => state.player.playlists;

export const selectSongsForCurrentPlaylist = (state) => {
  const playlistId = state.player.currentPlaylistId;
  if (!playlistId || !state.player.playlists[playlistId]) return [];
  return state.player.playlists[playlistId].songs;
};

export const selectSongsForPlaylist = (playlistId) => (state) => {
  if (!playlistId || !state.player.playlists[playlistId]) return [];
  return state.player.playlists[playlistId].songs;
};

export const selectIsLoadingForCurrentPlaylist = (state) => {
  const playlistId = state.player.currentPlaylistId;
  return playlistId && state.player.playlists[playlistId]
    ? state.player.playlists[playlistId].isLoading
    : false;
};

export const selectIsLoadingForPlaylist = (playlistId) => (state) => {
  return playlistId && state.player.playlists[playlistId]
    ? state.player.playlists[playlistId].isLoading
    : false;
};

export const selectErrorForCurrentPlaylist = (state) => {
  const playlistId = state.player.currentPlaylistId;
  return playlistId && state.player.playlists[playlistId]
    ? state.player.playlists[playlistId].error
    : null;
};

export const selectSelectedPlaylistSongs = (state) => {
  const id = state.player.selectedPlaylistId;
  return id && state.player.playlists[id]
    ? state.player.playlists[id].songs
    : [];
};


export const selectErrorForPlaylist = (playlistId) => (state) => {
  return playlistId && state.player.playlists[playlistId]
    ? state.player.playlists[playlistId].error
    : null;
};

export const selectCurrentTrack = (state) => {
  const playlistId = state.player.currentPlaylistId;
  const index = state.player.currentTrackIndex;
  const id = state.player.currentTrackId;

  if (!playlistId || !state.player.playlists[playlistId]) return null;

  const songs = state.player.playlists[playlistId].songs;

  if (Array.isArray(songs) && songs.length > 0) {
    if (index !== null && index >= 0 && index < songs.length) {
      return songs[index];
    }

    if (id) {
      return songs.find(song => song.id === id) || null;
    }
  }

  return null;
};






export const selectPlayerUIState = (state) => ({
  showVideoComponent: state.player.showVideoComponent,
  currentTime: state.player.currentTime,
  duration: state.player.duration,
  volume: state.player.volume,
  isMuted: state.player.isMuted,
  isLoading: state.player.isLoading,
  audioRef: state.player.audioRef,
  error: state.player.error,
});

export const selectPlayerState = (state) => state.player;

export const selectHasPlaylist = (playlistId) => (state) => {
  return Boolean(state.player.playlists[playlistId]);
};

export const selectHasNextTrack = (state) => {
  const playlistId = state.player.currentPlaylistId;
  const currentIndex = state.player.currentTrackIndex;
  if (!playlistId || currentIndex === null) return false;
  const playlist = state.player.playlists[playlistId];
  if (!playlist) return false;
  return currentIndex < playlist.songs.length - 1;
};

export const selectHasPreviousTrack = (state) => {
  const playlistId = state.player.currentPlaylistId;
  const currentIndex = state.player.currentTrackIndex;
  if (!playlistId || currentIndex === null) return false;
  return currentIndex > 0;
};

export const selectProgress = (state) => {
  const { currentTime, duration } = state.player;
  if (!duration || duration === 0) return 0;
  return Math.min(100, (currentTime / duration) * 100);
};

export const selectPlayerRefs = (state) => ({
  audioRef: state.player.audioRef,
  // videoRef: state.player.videoRef,
});

export default playerSlice.reducer;