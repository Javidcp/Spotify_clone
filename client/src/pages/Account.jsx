// import React, { useState } from 'react';
// import { User, Edit, Settings, Music, Play, Heart, Share, Camera, Bell, Shield, Download, Headphones, Calendar, MapPin, Plus } from 'lucide-react';

// export default function MySpotifyProfile() {
//     const [isEditing, setIsEditing] = useState(false);
//     const [profile, setProfile] = useState({
//         name: 'Your Name',
//         username: '@yourmusic',
//         bio: 'Music lover • Playlist curator • Always discovering new sounds',
//         avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face',
//         coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=300&fit=crop',
//         location: 'Your City',
//         isPremium: true
//     });

//     const [stats] = useState({
//         followers: '284',
//         following: '156',
//         publicPlaylists: 12,
//         totalPlaytime: '1,247 hrs',
//         memberSince: 'January 2020',
//         songsInLibrary: '2,847',
//         downloadedSongs: '156'
//     });

//     const [recentActivity] = useState([
//         { id: 1, title: 'Midnight Vibes', type: 'playlist', action: 'created', time: '2 hours ago', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop' },
//         { id: 2, title: 'As It Was', artist: 'Harry Styles', type: 'song', action: 'liked', time: '5 hours ago', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=60&h=60&fit=crop' },
//     ]);

//     const handleInputChange = (field, value) => {
//         setProfile(prev => ({ ...prev, [field]: value }));
//     };

//     const handleSave = () => {
//         setIsEditing(false);
//         // Save to backend here
//     };

//     return (
//         <div className="w-full mx-auto bg-gradient-to-b from-purple-900 via-gray-900 to-black text-white min-h-screen">
//         {/* Cover Image Header */}
//         <div className="relative h-80 overflow-hidden group">
//             <div 
//             className="absolute inset-0 bg-center bg-[#121212] "
//             >
//             <div className="absolute inset-0"></div>
//             </div>
            
//             {/* Edit Cover Button */}
//             <button className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all backdrop-blur">
//             <Camera size={20} />
//             </button>
            
//             {/* Profile Info Overlay */}
//             <div className="absolute bottom-0 left-0 right-0 p-8">
//             <div className="flex items-end gap-6">
//                 {/* Avatar */}
//                 <div className="relative group/avatar">
//                 <img
//                     src={profile.avatar}
//                     alt="Your Profile"
//                     className="w-32 h-32 rounded-full border-4 border-white shadow-2xl"
//                 />
//                 <button className="absolute inset-0 bg-black/50 opacity-0 group-hover/avatar:opacity-100 rounded-full flex items-center justify-center transition-opacity">
//                     <Camera size={24} className="text-white" />
//                 </button>
//                 {profile.isPremium && (
//                     <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1">
//                     <Music size={16} className="text-black" />
//                     </div>
//                 )}
//                 </div>

//                 {/* Profile Details */}
//                 <div className="flex-1 pb-4">
//                 <div className="flex items-center gap-2 mb-1">
//                     <p className="text-sm font-medium text-gray-300">PROFILE</p>
//                     {profile.isPremium && (
//                     <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">PREMIUM</span>
//                     )}
//                 </div>
                
//                 {!isEditing ? (
//                     <>
//                     <h1 className="text-5xl font-black mb-2">{profile.name}</h1>
//                     <p className="text-lg text-gray-300 mb-2">{profile.username}</p>
//                     <p className="text-gray-300 mb-4">{profile.bio}</p>
//                     </>
//                 ) : (
//                     <div className="space-y-3">
//                     <input
//                         type="text"
//                         value={profile.name}
//                         onChange={(e) => handleInputChange('name', e.target.value)}
//                         className="text-4xl font-black bg-transparent border-b-2 border-green-500 outline-none text-white placeholder-gray-400"
//                         placeholder="Your Name"
//                     />
//                     <input
//                         type="text"
//                         value={profile.username}
//                         onChange={(e) => handleInputChange('username', e.target.value)}
//                         className="text-lg bg-transparent border-b border-gray-500 outline-none text-gray-300 placeholder-gray-400"
//                         placeholder="@username"
//                     />
//                     <textarea
//                         value={profile.bio}
//                         onChange={(e) => handleInputChange('bio', e.target.value)}
//                         className="w-full bg-gray-800/50 border border-gray-600 rounded-lg p-3 text-gray-300 placeholder-gray-400 outline-none focus:border-green-500 resize-none"
//                         rows="2"
//                         placeholder="Tell people about your music taste..."
//                     />
//                     </div>
//                 )}
                
//                 <div className="flex items-center gap-4 text-sm">
//                     <span className="text-white font-medium">{stats.followers} followers</span>
//                     <span className="text-gray-300">•</span>
//                     <span className="text-gray-300">{stats.following} following</span>
//                     <span className="text-gray-300">•</span>
//                     <span className="text-gray-300">{stats.publicPlaylists} public playlists</span>
//                 </div>
//                 </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center gap-4 mt-6">
//                 {!isEditing ? (
//                 <>
//                     <button
//                     onClick={() => setIsEditing(true)}
//                     className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
//                     >
//                     Edit profile
//                     </button>
//                     <button className="border border-gray-500 hover:border-white text-gray-300 hover:text-white px-6 py-3 rounded-full font-semibold transition-all">
//                     Share profile
//                     </button>
//                 </>
//                 ) : (
//                 <>
//                     <button
//                     onClick={handleSave}
//                     className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-full font-semibold transition-all"
//                     >
//                     Save profile
//                     </button>
//                     <button
//                     onClick={() => setIsEditing(false)}
//                     className="border border-gray-500 hover:border-white text-gray-300 hover:text-white px-6 py-3 rounded-full font-semibold transition-all"
//                     >
//                     Cancel
//                     </button>
//                 </>
//                 )}
//             </div>
//             </div>
//         </div>

//         {/* Content Grid */}
//         <div className="px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Main Content */}
//             <div className="lg:col-span-2 space-y-8">
//             {/* Recent Activity */}
//             <section>
//                 <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-2xl font-bold text-white">Recent activity</h2>
//                 <button className="text-gray-400 hover:text-white text-sm font-medium">View all</button>
//                 </div>
//                 <div className="space-y-3">
//                 {recentActivity.map((activity) => (
//                     <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all">
//                     <img src={activity.image} alt={activity.title} className="w-12 h-12 rounded" />
//                     <div className="flex-1">
//                         <p className="text-white font-medium">
//                         You {activity.action} {activity.type === 'playlist' ? 'playlist' : 'song'} "{activity.title}"
//                         {activity.artist && ` by ${activity.artist}`}
//                         </p>
//                         <p className="text-gray-400 text-sm">{activity.time}</p>
//                     </div>
//                     </div>
//                 ))}
//                 </div>
//             </section>

//             {/* Quick Actions */}
//             <section>
//                 <h2 className="text-2xl font-bold mb-4 text-white">Quick actions</h2>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <button className="bg-gray-800/50 hover:bg-gray-700/50 p-6 rounded-xl transition-all group">
//                     <Plus size={24} className="text-green-500 mb-2 group-hover:scale-110 transition-transform" />
//                     <p className="text-white font-medium">Create Playlist</p>
//                 </button>
//                 <button className="bg-gray-800/50 hover:bg-gray-700/50 p-6 rounded-xl transition-all group">
//                     <Download size={24} className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
//                     <p className="text-white font-medium">Downloaded</p>
//                 </button>
//                 <button className="bg-gray-800/50 hover:bg-gray-700/50 p-6 rounded-xl transition-all group">
//                     <Heart size={24} className="text-red-400 mb-2 group-hover:scale-110 transition-transform" />
//                     <p className="text-white font-medium">Liked Songs</p>
//                 </button>
//                 <button className="bg-gray-800/50 hover:bg-gray-700/50 p-6 rounded-xl transition-all group">
//                     <Headphones size={24} className="text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
//                     <p className="text-white font-medium">Made For You</p>
//                 </button>
//                 </div>
//             </section>
//             </div>

//             {/* Sidebar */}
//             <div className="space-y-6">
//             {/* Your Stats */}
//             <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur">
//                 <h3 className="text-lg font-semibold mb-4 text-white">Your music</h3>
//                 <div className="space-y-4">
//                 <div className="flex justify-between">
//                     <span className="text-gray-400">Songs in library</span>
//                     <span className="text-white font-medium">{stats.songsInLibrary}</span>
//                 </div>
//                 <div className="flex justify-between">
//                     <span className="text-gray-400">Downloaded songs</span>
//                     <span className="text-white font-medium">{stats.downloadedSongs}</span>
//                 </div>
//                 <div className="flex justify-between">
//                     <span className="text-gray-400">Created playlists</span>
//                     <span className="text-white font-medium">{stats.publicPlaylists}</span>
//                 </div>
//                 </div>
//             </div>

//             {/* Account Info */}
//             <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur">
//                 <h3 className="text-lg font-semibold mb-4 text-white">Account</h3>
//                 <div className="space-y-3">
//                 <div className="flex items-center gap-3 text-gray-300">
//                     <Calendar size={16} />
//                     <span className="text-sm">Member since {stats.memberSince}</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-gray-300">
//                     <MapPin size={16} />
//                     {!isEditing ? (
//                     <span className="text-sm">{profile.location}</span>
//                     ) : (
//                     <input
//                         type="text"
//                         value={profile.location}
//                         onChange={(e) => handleInputChange('location', e.target.value)}
//                         className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white outline-none focus:border-green-500 flex-1"
//                         placeholder="Your location"
//                     />
//                     )}
//                 </div>
//                 </div>
//             </div>

            
//             </div>
//         </div>
//         </div>
//     );
// }



import React from 'react'
import { Pen } from 'lucide-react';

const Account = () => {
    return (
        <>
            <div className='w-full flex items-end bg-[#121212] rounded-md overflow-hidden p-5 text-white gap-5'>
                <div>
                    <div className='bg-black w-60 h-60 rounded-full'></div>
                </div>
                <div>
                    <span>Profile</span>
                    <h2 className='text-7xl font-bold mt-2'>Javid</h2>
                </div>
            </div>
            <div className='p-8 bg-[#191919] text-white'>
                <button className='flex items-center gap-2 p-2 border-1 rounded-md px-4 border-zinc-400'>
                    Edit <Pen size={15} />
                </button>
            </div>
        </>
    )
}

export default Account