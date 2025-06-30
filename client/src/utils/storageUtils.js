// utils/storageUtils.js

export const safeLocalStorage = {
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

// Helper function to create user-specific keys
const getUserSpecificKey = (baseKey, userId) => {
  if (!userId) {
    console.warn('No userId provided for storage key');
    return null;
  }
  return `${baseKey}_user_${userId}`;
};

// User-specific recently played data functions
export const recentlyPlayedStorage = {
  getPlaylists: (userId) => {
    if (!userId) return [];
    const key = getUserSpecificKey('recentlyPlayedPlaylists', userId);
    return key ? safeLocalStorage.getItem(key) || [] : [];
  },

  savePlaylists: (playlists, userId) => {
    if (!userId) return false;
    const key = getUserSpecificKey('recentlyPlayedPlaylists', userId);
    return key ? safeLocalStorage.setItem(key, playlists) : false;
  },

  getArtists: (userId) => {
    if (!userId) return [];
    const key = getUserSpecificKey('recentlyPlayedArtists', userId);
    return key ? safeLocalStorage.getItem(key) || [] : [];
  },

  saveArtists: (artists, userId) => {
    if (!userId) return false;
    const key = getUserSpecificKey('recentlyPlayedArtists', userId);
    return key ? safeLocalStorage.setItem(key, artists) : false;
  },

  // Clear all data for a specific user
  clearUserData: (userId) => {
    if (!userId) return false;
    
    const playlistKey = getUserSpecificKey('recentlyPlayedPlaylists', userId);
    const artistKey = getUserSpecificKey('recentlyPlayedArtists', userId);
    
    let success = true;
    if (playlistKey) success = success && safeLocalStorage.removeItem(playlistKey);
    if (artistKey) success = success && safeLocalStorage.removeItem(artistKey);
    
    return success;
  },

  // Clean up data for users who are no longer active (optional utility)
  cleanupOldUserData: (activeUserIds = []) => {
    try {
      if (typeof window === 'undefined') return;
      
      const keys = Object.keys(localStorage);
      const userDataKeys = keys.filter(key => 
        key.startsWith('recentlyPlayedPlaylists_user_') || 
        key.startsWith('recentlyPlayedArtists_user_')
      );
      
      userDataKeys.forEach(key => {
        const userId = key.split('_user_')[1];
        if (userId && !activeUserIds.includes(userId)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error cleaning up old user data:', error);
    }
  }
};