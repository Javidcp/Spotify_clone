// redux/recentlyPlayedArtistsSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Safe localStorage utilities
const safeLocalStorage = {
  getItem: (key) => {
    try {
      if (typeof window === 'undefined') return null;
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  },

  setItem: (key, value) => {
    try {
      if (typeof window === 'undefined') return false;
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
      return false;
    }
  },

  removeItem: (key) => {
    try {
      if (typeof window === 'undefined') return false;
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  }
};

// Helper functions for user-specific storage
const getUserSpecificKey = (baseKey, userId) => {
  if (!userId) return null;
  return `${baseKey}_user_${userId}`;
};

const getArtistsFromStorage = (userId) => {
  if (!userId) return [];
  const key = getUserSpecificKey('recentlyPlayedArtists', userId);
  return key ? safeLocalStorage.getItem(key) || [] : [];
};

const saveArtistsToStorage = (artists, userId) => {
  if (!userId) return false;
  const key = getUserSpecificKey('recentlyPlayedArtists', userId);
  return key ? safeLocalStorage.setItem(key, artists) : false;
};

const initialState = {
  artists: [],
  currentUserId: null,
};

const recentlyPlayedArtistsSlice = createSlice({
  name: 'recentlyPlayedArtists',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      const userId = action.payload;
      state.currentUserId = userId;
      
      // Load artists for this user from localStorage
      if (userId) {
        const storedArtists = getArtistsFromStorage(userId);
        state.artists = storedArtists;
        console.log(`Loaded ${storedArtists.length} recently played artists for user ${userId}`);
      } else {
        state.artists = [];
      }
    },

    addRecentlyPlayedArtist: (state, action) => {
      if (!state.currentUserId) {
        console.warn('No current user set, cannot add recently played artist');
        return;
      }

      const artist = action.payload;
      
      // Validate artist data
      if (!artist || !artist.id || !artist.name) {
        console.error('Invalid artist data:', artist);
        return;
      }

      // Remove if already exists
      const existingIndex = state.artists.findIndex(a => a.id === artist.id);
      if (existingIndex > -1) {
        state.artists.splice(existingIndex, 1);
      }

      // Add at beginning
      state.artists.unshift({
        id: artist.id,
        name: artist.name,
        photo: artist.photo || artist.image || artist.profileImage,
        addedAt: new Date().toISOString()
      });

      // Keep only last 10 artists
      if (state.artists.length > 10) {
        state.artists = state.artists.slice(0, 10);
      }

      // Save to localStorage
      const success = saveArtistsToStorage(state.artists, state.currentUserId);
      if (success) {
        console.log(`Saved recently played artist: ${artist.name} for user ${state.currentUserId}`);
      } else {
        console.error('Failed to save recently played artist to localStorage');
      }
    },

    removeRecentlyPlayedArtist: (state, action) => {
      if (!state.currentUserId) return;

      const artistId = action.payload;
      state.artists = state.artists.filter(artist => artist.id !== artistId);
      
      // Save to localStorage
      saveArtistsToStorage(state.artists, state.currentUserId);
    },

    clearRecentlyPlayedArtists: (state) => {
      if (!state.currentUserId) return;

      state.artists = [];
      
      // Clear from localStorage
      const key = getUserSpecificKey('recentlyPlayedArtists', state.currentUserId);
      if (key) {
        safeLocalStorage.removeItem(key);
      }
    },

    clearUserSession: (state) => {
      // Clear from localStorage before resetting state
      if (state.currentUserId) {
        const key = getUserSpecificKey('recentlyPlayedArtists', state.currentUserId);
        if (key) {
          safeLocalStorage.removeItem(key);
        }
      }
      
      state.artists = [];
      state.currentUserId = null;
    },
  },
});

export const {
  setCurrentUser,
  addRecentlyPlayedArtist,
  removeRecentlyPlayedArtist,
  clearRecentlyPlayedArtists,
  clearUserSession,
} = recentlyPlayedArtistsSlice.actions;

export default recentlyPlayedArtistsSlice.reducer;