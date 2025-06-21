// store/slices/playerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTrackId: null,
  currentTrackIndex: null,
  isPlaying: false,
  showVideoComponent: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  isLoading: false,
  error: null,
  audioRef: null,
  videoRef: null,
  songs: [
    {
      id: 1,
      title: "What Jhumka ?",
      artists: "Pritam, Arijit Singh, Jonita Gandhi",
      album: "Rocky Aur Rani Kii Prem Kahaani",
      duration: "3:33",
      dateAdded: "Mar 27, 2025",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      id: 2,
      title: "Akhiyaan Gulaab",
      artists: "Mitraz",
      album: "Teri Baaton Mein Aisa Uljha Jiya",
      duration: "2:51",
      dateAdded: "Mar 27, 2025",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&h=100&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      id: 3,
      title: "Sooraj Dooba Hain",
      artists: "Amaal Mallik, Arijit Singh",
      album: "Roy",
      duration: "4:24",
      dateAdded: "Mar 27, 2025",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
      id: 4,
      title: "Tere Pyaar Mein",
      artists: "Pritam, Arijit Singh",
      album: "Tu Jhoothi Main Makkaar",
      duration: "4:26",
      dateAdded: "Mar 27, 2025",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&h=100&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
      id: 5,
      title: "Laal Pari",
      artists: "Yo Yo Honey Singh, Simar Kaur",
      album: "Housefull 5",
      duration: "4:16",
      dateAdded: "Mar 27, 2025",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    }
  ],
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      const { trackId, trackIndex } = action.payload;
      state.currentTrackId = trackId;
      state.currentTrackIndex = trackIndex;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
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
      state.duration = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    nextTrack: (state) => {
      if (state.currentTrackIndex !== null) {
        const nextIndex = (state.currentTrackIndex + 1) % state.songs.length;
        const nextSong = state.songs[nextIndex];
        state.currentTrackIndex = nextIndex;
        state.currentTrackId = nextSong.id;
      }
    },
    previousTrack: (state) => {
      if (state.currentTrackIndex !== null) {
        const prevIndex = (state.currentTrackIndex - 1 + state.songs.length) % state.songs.length;
        const prevSong = state.songs[prevIndex];
        state.currentTrackIndex = prevIndex;
        state.currentTrackId = prevSong.id;
      }
    },
    setAudioRef: (state, action) => {
      state.audioRef = action.payload;
    },
    setVideoRef: (state, action) => {
      state.videoRef = action.payload;
    },
    resetPlayer: (state) => {
      state.currentTrackId = null;
      state.currentTrackIndex = null;
      state.isPlaying = false;
      state.currentTime = 0;
      state.duration = 0;
      state.error = null;
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  togglePlay,
  setShowVideoComponent,
  setCurrentTime,
  setDuration,
  setVolume,
  toggleMute,
  setLoading,
  setError,
  nextTrack,
  previousTrack,
  setAudioRef,
  setVideoRef,
  resetPlayer,
} = playerSlice.actions;

// Selectors - optimized for the redux.jsx hook
export const selectCurrentSong = (state) => {
  if (!state.player.currentTrackId) return null;
  return state.player.songs.find(song => song.id === state.player.currentTrackId);
};

export const selectSongs = (state) => state.player.songs;

export const selectCurrentTrackId = (state) => state.player.currentTrackId;

export const selectCurrentTrackIndex = (state) => state.player.currentTrackIndex;

export const selectIsPlaying = (state) => state.player.isPlaying;

export const selectPlayerUIState = (state) => ({
  showVideoComponent: state.player.showVideoComponent,
  currentTime: state.player.currentTime,
  duration: state.player.duration,
  volume: state.player.volume,
  isMuted: state.player.isMuted,
  isLoading: state.player.isLoading,
  error: state.player.error,
  audioRef: state.player.audioRef,
  videoRef: state.player.videoRef,
});

export const selectPlayerState = (state) => state.player;

export const selectCurrentTrackWithIndex = (state) => {
  const currentSong = selectCurrentSong(state);
  const currentTrackIndex = selectCurrentTrackIndex(state);
  return currentSong ? { ...currentSong, index: currentTrackIndex } : null;
};

export const selectPlaybackState = (state) => ({
  isPlaying: state.player.isPlaying,
  currentTime: state.player.currentTime,
  duration: state.player.duration,
  volume: state.player.volume,
  isMuted: state.player.isMuted,
});

export const selectPlayerRefs = (state) => ({
  audioRef: state.player.audioRef,
  videoRef: state.player.videoRef,
});

export default playerSlice.reducer;