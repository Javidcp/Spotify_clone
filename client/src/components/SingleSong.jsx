import React, { useState, useEffect } from 'react';
import { Play, Pause, Shuffle, Plus, Download, MoreHorizontal, Clock, List } from 'lucide-react';
import { usePlayer } from '../hooks/redux';
import api from '../utils/axios';
import { useParams } from 'react-router-dom';

export default function SingleSong( ) {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    setCurrentTrack,
    formatTime
  } = usePlayer();

  const { songId } = useParams();
  const [songData, setSongData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const res = await api.get(`/songs/${songId}`);
        setSongData(res.data);
      } catch (err) {
        console.error('Error fetching song:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSong();
  }, [songId]);;
// 
const isCurrentSongPlaying = songData && currentTrack?._id === songData._id && isPlaying;


//   const handlePlayPause = () => {
//     if (currentTrack?.id === localSongData.id) {
//       togglePlay();
//     } else {
//       setCurrentTrack({
//         id: localSongData.id,
//         title: localSongData.title,
//         artist: localSongData.artists,
//         audioUrl: localSongData.audioUrl,
//         image: localSongData.image,
//         duration: localSongData.durationSeconds
//       });
//     }
//   };

//   const getGradientColor = () => {
//     const songTitle = localSongData.title.toLowerCase();
//     if (songTitle.includes('kesariya')) return 'from-red-800 via-red-900 to-black';
//     if (songTitle.includes('love') || songTitle.includes('pyaar')) return 'from-pink-800 via-pink-900 to-black';
//     if (songTitle.includes('dance') || songTitle.includes('party')) return 'from-orange-800 via-orange-900 to-black';
//     return 'from-purple-800 via-purple-900 to-black';
//   };

if (loading) {
  return <div className="text-white p-8">Loading...</div>;
}

if (!songData) {
  return <div className="text-white p-8">Song not found</div>;
}

  return (
    <div className={`bg-[#121212]  min-h-screen text-white`}>
      {/* Header */}
      <div className="flex items-end p-8 pb-6 bg-red-900">
        <div className="w-60 h-60 mr-6 shadow-2xl">
          <img 
            src={songData.coverImage} 
            alt={`${songData.title} cover`} 
            className="w-full h-full object-cover rounded shadow-lg"
            onError={(e) => { e.target.src = '/api/placeholder/240/240'; }}
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium mb-2">{songData.type}</p>
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            {songData.title}
          </h1>
          <div className="flex items-center text-sm text-gray-300 flex-wrap">
            {songData.artist.map((artist, i) => (
  <React.Fragment key={artist._id || i}>
    <span className={i === 0 ? "font-medium text-white" : ""}>
      {artist.name}
    </span>
  </React.Fragment>
))}

            <span className="mx-1">•</span>
            <span>{songData.year}</span>
            <span className="mx-1">•</span>
            <span>1 song, {songData.duration}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-8 pb-6  bg-gradient-to-b from-red-900 to-red-900/50">
        <div className="flex items-center gap-6">
          <button
            // onClick={handlePlayPause}
            className="bg-green-500 hover:bg-green-400 transition-colors rounded-full p-4"
            disabled={!songData.audioUrl}
          >
            {isCurrentSongPlaying ?
              <Pause className="w-6 h-6 text-black fill-black" /> :
              <Play className="w-6 h-6 text-black fill-black ml-1" />
            }
          </button>

            

          <button className="text-gray-400 hover:text-white transition-colors">
            <Download className="w-6 h-6" />
          </button>

          <button className="text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Song List */}
      <div className="px-8">
        <div className="flex items-center justify-between py-2 border-b border-gray-700 mb-2">
          <div className="flex items-center text-gray-400 text-sm">
            <span className="w-8 text-center">#</span>
            <span className="ml-4">Title</span>
          </div>
          <div className="flex items-center gap-8">
            {/* <span className="text-gray-400 text-sm">Plays</span> */}
            <Clock className="w-4 h-4 text-gray-400" />
            <span></span>
            <span></span>
            <List className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Song Row */}
        <div className="flex items-center justify-between py-3 px-2 rounded hover:bg-[#191919] hover:bg-opacity-10 transition-colors group">
          <div className="flex items-center flex-1">
            <div className="w-8 text-center">
              <button
                // onClick={handlePlayPause}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {isCurrentSongPlaying ?
                  <Pause className="w-4 h-4 text-white fill-white" /> :
                  <Play className="w-4 h-4 text-white fill-white" />
                }
              </button>
              <span className="group-hover:opacity-0 text-gray-400">1</span>
            </div>

            <div className="ml-4 flex items-center">
              <img
                src={songData.coverImage}
                alt={`${songData.title} thumbnail`}
                className="w-10 h-10 rounded mr-3 object-cover"
                onError={(e) => { e.target.src = '/api/placeholder/40/40'; }}
              />
              <div>
                <div className="text-white font-medium">{songData.title}</div>
                <div className="text-gray-400 text-sm">{songData.artist.map(a => a.name)}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {/* <span className="text-gray-400 text-sm">{songData.plays}</span> */}
            <span className="text-gray-400 text-sm">{songData.duration}</span>
            
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Plus className="w-4 h-4 text-gray-400 hover:text-white" />
            </button>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-white" />
            </button>
            
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {isCurrentSongPlaying && (
        <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-90 p-4">
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 w-10">{formatTime(currentTime || 0)}</span>
            <div className="flex-1 bg-gray-600 rounded-full h-1">
              <div
                className="bg-white rounded-full h-1 transition-all duration-300"
                style={{ width: duration ? `${((currentTime || 0) / duration) * 100}%` : '0%' }}
              ></div>
            </div>
            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration) || songData.duration}
            </span>
          </div>
        </div>
      )}

      {/* No Audio Warning */}
      {!songData.audioUrl && (
        <div className="px-8 py-4">
          <div className="bg-yellow-600 bg-opacity-20 border border-yellow-600 rounded-lg p-4">
            <p className="text-yellow-200">⚠️ Audio file not available for this track</p>
          </div>
        </div>
      )}
    </div>
  );
}
