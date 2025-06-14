// import Logo from "../../assets/Spotify logo.png"
// import { useState, useEffect, useRef } from 'react';
// import { Play, Plus, MoreHorizontal, Clock, List, Menu, Grid3X3, LayoutList } from 'lucide-react';
// import { HiDownload } from "react-icons/hi";


// const Inside = () => {
//     const [currentTrack, setCurrentTrack] = useState(null);
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [viewMode, setViewMode] = useState('List');
//     const [isScrolled, setIsScrolled] = useState(false);
//     const scrollRef = useRef(null);

// useEffect(() => {
//     const scrollContainer = scrollRef.current;

//     const handleScroll = () => {
//       if (scrollContainer.scrollTop > 100) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     if (scrollContainer) {
//       scrollContainer.addEventListener("scroll", handleScroll);
//     }

//     return () => {
//       if (scrollContainer) {
//         scrollContainer.removeEventListener("scroll", handleScroll);
//       }
//     };
//   }, []);

//     const playlists = [
//         {
//             id: 1,
//             title: "BOLLYWOOD CENTRAL",
//             subtitle: "Bollywood Central, jab baje toh seedha dil ke",
//             image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
//             color: "bg-gradient-to-br from-pink-500 to-red-500"
//         }
//     ];

    
//     const songs = [
//         {
//         id: 1,
//         title: "What Jhumka ? (From \"Rocky Aur Rani Kii Prem Kahaani\")",
//         artists: "Pritam, Arijit Singh, Jonita Gandhi, Ranveer Singh, Amitabh Bhatt...",
//         album: "What Jhumka ? (From \"Rocky Aur Rani Kii Prem K...\")",
//         duration: "3:33",
//         dateAdded: "Mar 27, 2025",
//         image: "https://unsplash.com/photos/man-in-gray-quarter-sleeved-shirt-singing-hgO1wFPXl3I"
//         },
//         {
//         id: 2,
//         title: "Akhiyaan Gulaab",
//         artists: "Mitraz",
//         album: "Teri Baaton Mein Aisa Uljha Jiya",
//         duration: "2:51",
//         dateAdded: "Mar 27, 2025",
//         image: "/api/placeholder/56/56"
//         },
//         {
//         id: 3,
//         title: "Sooraj Dooba Hain",
//         artists: "Amaal Mallik, Arijit Singh, Aditi Singh Sharma, Kumaar",
//         album: "Roy",
//         duration: "4:24",
//         dateAdded: "Mar 27, 2025",
//         image: "/api/placeholder/56/56"
//         },
//         {
//         id: 4,
//         title: "Tere Pyaar Mein",
//         artists: "Pritam, Arijit Singh, Amitabh Bhattacharya, Nikhita Gandhi",
//         album: "Tere Pyaar Mein (From \"Tu Jhoothi Main Makkaar\")",
//         duration: "4:26",
//         dateAdded: "Mar 27, 2025",
//         image: "/api/placeholder/56/56"
//         },
//         {
//         id: 5,
//         title: "Laal Pari (From \"Housefull 5\")",
//         artists: "Yo Yo Honey Singh, Simar Kaur, Alfaaz",
//         album: "Laal Pari (From \"Housefull 5\")",
//         duration: "4:16",
//         dateAdded: "Mar 27, 2025",
//         image: "/api/placeholder/56/56"
//         }
//     ];

//     const handlePlay = (songId) => {
//         setCurrentTrack(songId);
//     };

//     const handleViewChange = (mode) => {
//         setViewMode(mode);
//         setShowDropdown(false);
//     };

//     return (
//         <div className='text-white rounded-lg overflow-visible'>
//             {playlists.map(item => (
//                 <div key={item.id} className='p-7' style={{backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition : "center", height: "250px"}}>
//                     <h4>Public Playlist</h4>
//                     <h1 className='text-8xl font-bold mb-3'>{item.title}</h1>
//                     <p className='text-gray-300'>{item.subtitle}</p>
//                     <div className='flex mt-1 gap-1 items-center'>
//                         <img src={Logo} width={25} alt="Logo" />
//                         <p className="text-sm font-bold">Spotify</p>
//                         <span className="w-1 rounded-full mt-1 bg-gray-300 h-1"></span>
//                         <div className="text-sm font-semibold text-gray-300">1,000 saves</div>
//                         <span className="w-1 rounded-full mt-1 bg-gray-300 h-1"></span>
//                         <div className="text-sm font-semibold text-gray-300">10 songs, about 1 hr</div>
//                     </div>
//             </div>
//             ))}


//             <div className="bg-[#121212] text-white">
//                 <div className={`flex items-center justify-between p-4 bg-[#121212] sticky top-[-5px] z-40`}>
//                     <div className="flex items-center space-x-4">
//                     <button className="bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center w-13 h-13 transition-colors">
//                         <Play className="w-5 h-5 text-black  fill-black ml-1" />
//                     </button>
//                     { !isScrolled && (
//                         <>
//                             <div className="w-8 h-10 border-0 outline-1 p-1 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
//                                 <div className="w-12 h-12 bg-cover bg-center rounded" ></div>
//                             </div>
//                             <button className="border-2 border-zinc-500 text-zinc-500 hover:border-white hover:text-white rounded-full p-1 transition-colors">
//                                 <Plus className="w-5 h-5" />
//                             </button>
//                             <button className="border-2 border-zinc-500 text-zinc-500 hover:border-white hover:text-white rounded-full p-1 transition-colors">
//                                 <HiDownload className="w-5 h-5" />
//                             </button>
//                             <button className="text-gray-400 hover:text-white transition-colors">
//                                 <MoreHorizontal className="w-5 h-5" />
//                             </button>
//                         </>
//                     )}
//                     </div>
//                     <div className="relative">
//                         <button 
//                             className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
//                             onClick={() => setShowDropdown(!showDropdown)}
//                         >
//                             <span className="text-sm">{viewMode}</span>
//                             <Menu className="w-5 h-5" />
//                         </button>

//                         {showDropdown && (
//                             <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 min-w-[150px]">
//                             <div className="py-1">
//                                 <span className="flex items-center space-x-3 px-4 py-2 text-sm font-semibold text-gray-300">view as</span>
//                                 <button
//                                 className={`flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left transition-colors ${viewMode === 'Compact' ? 'text-green-400': ''}`}
//                                 onClick={() => handleViewChange('Compact')}
//                                 >
//                                 <LayoutList className="w-4 h-4" />
//                                 <span>Compact</span>
//                                 {viewMode === 'Compact' && <div className="w-1 h-1 bg-green-400  rounded-full ml-auto"></div>}
//                                 </button>
//                                 <button
//                                 className={`flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left transition-colors ${viewMode === 'List' ? 'text-green-400': ''}`}
//                                 onClick={() => handleViewChange('List')}
//                                 >
//                                 <List className="w-4 h-4" />
//                                 <span>List</span>
//                                 {viewMode === 'List' && <div className="w-1 h-1 bg-green-400 rounded-full ml-auto"></div>}
//                                 </button>
//                             </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 { viewMode === 'List' ? (
//                     <>
//                     <div className="grid grid-cols-12 content-between gap-4 px-8 py-3 text-gray-400 text-sm font-medium bg-[#121212] border-b border-[#242424]">
//                         <div className="col-span-1 pl-2">#</div>
//                         <div className="col-span-5">Title</div>
//                         <div className="col-span-4 hidden sm:block">Album</div>
//                         <div className="col-span-1 hidden md:block">Date added</div>
//                         <div className="sm:col-span-1 col-span-4 flex justify-end">
//                             <Clock className="w-4 h-4" />
//                         </div>
//                     </div>

//                     <div className="px-6" >
//                         {songs.map((song, index) => (
//                         <div
//                             key={song.id}
//                             className={`grid grid-cols-12 gap-4 py-2 rounded-md hover:bg-[#1d1d1d] transition-colors group cursor-pointer ${
//                             currentTrack === song.id ? 'bg-[#1d1d1d]' : ''
//                             }`}
//                             onClick={() => handlePlay(song.id)}
//                         >
//                             <div className="col-span-1 flex items-center px-4">
//                             <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
//                             <Play className="w-4 h-4 text-white hidden group-hover:block" />
//                             </div>
                            
//                             <div className="col-span-5 flex items-center space-x-3">
//                             <div className="w-10 h-10 bg-gray-700 rounded flex-shrink-0">
//                                 <div className="w-full h-full bg-cover bg-center rounded" style={{backgroundImage: `url(${song.image})`}}></div>
//                             </div>
//                             <div className="min-w-0">
//                                 <div className={`font-medium truncate ${currentTrack === song.id ? 'text-green-400' : 'text-white'}`}>
//                                 {song.title}
//                                 </div>
//                                 <div className="text-sm text-zinc-300 truncate">{song.artists}</div>
//                             </div>
//                             </div>
                            
//                             <div className="col-span-4 hidden sm:flex items-center">
//                             <span className="text-zinc-300 text-sm truncate hover:underline cursor-pointer">
//                                 {song.album}
//                             </span>
//                             </div>
                            
//                             <div className="col-span-1 md:flex items-center  hidden">
//                             <span className="text-zinc-300 text-sm">{song.dateAdded}</span>
//                             </div>
                            
//                             <div className="sm:col-span-1 col-span-4 flex items-center justify-end">
//                             <span className="text-zinc-300 text-sm">{song.duration}</span>
//                             </div>
//                         </div>
//                         ))}
//                     </div>
//                 </>
//                 ) : (
//                     <>
//                     <div className="grid grid-cols-12 gap-4 px- py-2 border-b border-gray-800 text-gray-400 text-sm font-medium">
//                         <div className="col-span-1  pl-11">#</div>
//                         <div className="col-span-3 ">Title</div>
//                         <div className="col-span-3">Artist</div>
//                         <div className="col-span-2">Album</div>
//                         <div className="col-span-1">Date added</div>
//                         <div className="col-span-2 flex justify-center">
//                         <Clock className="w-4 h-4" />
//                         </div>
//                     </div>

//                     <div className=" flex items-center justify-center">
//                         <hr className="text-[#242424] w-[95%] " />
//                     </div>

//                     <div className="">
//                         {songs.map((song, index) => (
//                             <div
//                                 key={song.id}
//                                 className={`grid grid-cols-12 gap-1 py-3 rounded-md hover:bg-[#1d1d1d] transition-colors group cursor-pointer ${
//                                 currentTrack === song.id ? 'bg-[#1d1d1d]' : ''
//                                 }`}
//                                 onClick={() => handlePlay(song.id)}
//                             >
//                                 <div className="col-span-1 flex items-center px-10">
//                                 {currentTrack === song.id ? (
//                                     <Play className="w-4 h-4 text-green-400 fill-green-400" />
//                                 ) : (
//                                     <>
//                                     <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
//                                     <Play className="w-4 h-4 text-white hidden group-hover:block" />
//                                     </>
//                                 )}
//                                 </div>
                                
//                                 <div className="col-span-3 flex items-center ">
                                
//                                 <div className="min-w-0 text-sm">
//                                     <div className={`font-medium truncate ${currentTrack === song.id ? 'text-green-400' : 'text-white'}`}>
//                                     {song.title}
//                                     </div>
//                                 </div>
//                                 </div>
                                
//                                 <div className="col-span-3 flex items-center">
//                                 <span className="text-gray-400 text-sm truncate hover:underline cursor-pointer">
//                                     {song.artists}
//                                 </span>
//                                 </div>
                                
//                                 <div className="col-span-2 flex items-center">
//                                 <span className="text-gray-400 text-sm truncate hover:underline cursor-pointer">
//                                     {song.album}
//                                 </span>
//                                 </div>
                                
//                                 <div className="col-span-1 flex items-center">
//                                 <span className="text-gray-400 text-sm">{song.dateAdded}</span>
//                                 </div>
                                
//                                 <div className="col-span-2 flex items-center justify-between  px-6">
//                                 { song.id && (
//                                     <button className="text-gray-400 hover:text-white border rounded-full transition-colors opacity-0 group-hover:opacity-100">
//                                     <Plus className="w-4 h-4" />
//                                     </button>
//                                 )}
//                                 <span className="text-gray-400 text-sm">{song.duration}</span>
//                                 <button className="text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
//                                     <MoreHorizontal className="w-4 h-4" />
//                                 </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default Inside


import { useState, useEffect, useRef } from 'react';
import { Play, Plus, MoreHorizontal, Clock, List, Menu, LayoutList, Pause, Volume2, X, ExternalLink } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import BottomPlayer from '../Player'; // Corrected import path

const Inside = () => {
    const [currentTrackId, setCurrentTrackId] = useState(null); // Renamed for clarity
    const [currentTrackIndex, setCurrentTrackIndex] = useState(null); // New state to track index
    const [showDropdown, setShowDropdown] = useState(false);
    const [viewMode, setViewMode] = useState('List');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false); // Global play state
    const scrollRef = useRef(null);
    const videoRef = useRef(null); // Ref for the video element
    const audioRef = useRef(null); // Ref for the audio element in BottomPlayer
    const [showVideoComponent, setShowVideoComponent] = useState(false); // Initially hide video component

    

    const navigate = useNavigate();

    useEffect(() => {
        const scrollContainer = scrollRef.current;

        const handleScroll = () => {
            if (scrollContainer && scrollContainer.scrollTop > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    const playlists = [
        {
            id: 1,
            title: "BOLLYWOOD CENTRAL",
            subtitle: "Bollywood Central, jab baje toh seedha dil ke",
            image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop",
            color: "bg-gradient-to-br from-pink-500 to-red-500"
        }
    ];

    const songs = [
        {
            id: 1,
            title: "What Jhumka ?",
            artists: "Pritam, Arijit Singh, Jonita Gandhi",
            album: "Rocky Aur Rani Kii Prem Kahaani",
            duration: "3:33",
            dateAdded: "Mar 27, 2025",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
            video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Added audio URL
        },
        {
            id: 2,
            title: "Akhiyaan Gulaab",
            artists: "Mitraz",
            album: "Teri Baaton Mein Aisa Uljha Jiya",
            duration: "2:51",
            dateAdded: "Mar 27, 2025",
            image: "https://images.unsplash.com/photo-1571974599782-87ac0aad2cfe?w=100&h=100&fit=crop",
            video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" // Added audio URL
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
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" // Added audio URL
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
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" // Added audio URL
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
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" // Added audio URL
        }
    ];

    const handlePlay = (actionOrId) => {
        let newTrackIndex;

        if (typeof actionOrId === 'number') { // Specific song ID clicked
            newTrackIndex = songs.findIndex(song => song.id === actionOrId);
        } else if (actionOrId === 'next') {
            newTrackIndex = (currentTrackIndex + 1) % songs.length;
        } else if (actionOrId === 'previous') {
            newTrackIndex = (currentTrackIndex - 1 + songs.length) % songs.length;
        } else { // Top play button or initial play
            if (currentTrackId && isPlaying) { // If currently playing, pause
                setIsPlaying(false);
                if (videoRef.current) videoRef.current.pause();
                if (audioRef.current) audioRef.current.pause();
                return;
            } else if (currentTrackId) { // If same track, just play
                setIsPlaying(true);
                if (videoRef.current) videoRef.current.play();
                if (audioRef.current) audioRef.current.play();
                setShowVideoComponent(true);
                return;
            } else { // If no current track, play the first one
                newTrackIndex = 0;
            }
        }

        if (newTrackIndex !== -1 && newTrackIndex !== currentTrackIndex) {
            const newSong = songs[newTrackIndex];
            setCurrentTrackId(newSong.id);
            setCurrentTrackIndex(newTrackIndex);
            setIsPlaying(true);
            setShowVideoComponent(true);

            // Play the video if available
            if (videoRef.current && newSong.video) {
                videoRef.current.src = newSong.video;
                videoRef.current.load(); // Load the new video source
                videoRef.current.play().catch(e => console.error("Video playback error:", e));
            } else if (videoRef.current) {
                // If the new song has no video, but the video player is open, hide it
                setShowVideoComponent(false);
            }

            // Play the audio
            if (audioRef.current && newSong.audioUrl) {
                audioRef.current.src = newSong.audioUrl;
                audioRef.current.load(); // Load the new audio source
                audioRef.current.play().catch(e => console.error("Audio playback error:", e));
            }

        } else if (newTrackIndex === currentTrackIndex && typeof actionOrId === 'number') {
            // If the same song is clicked, toggle play/pause
            setIsPlaying(prev => {
                const newState = !prev;
                if (videoRef.current) {
                    newState ? videoRef.current.play() : videoRef.current.pause();
                }
                if (audioRef.current) {
                    newState ? audioRef.current.play() : audioRef.current.pause();
                }
                setShowVideoComponent(true); // Ensure video component is visible if playing
                return newState;
            });
        }
    };


    const handleViewChange = (mode) => {
        setViewMode(mode);
        setShowDropdown(false);
    };

    const getCurrentSong = () => {
        return songs.find(song => song.id === currentTrackId);
    };

    // Sync play/pause state when it changes from BottomPlayer
    useEffect(() => {
        if (videoRef.current) {
            isPlaying ? videoRef.current.play() : videoRef.current.pause();
        }
    }, [isPlaying]);

    return (
        <div className="flex bg-[#121212] text-white min-h-screen "> {/* Added padding-bottom for player */}
            {/* Left side - Playlist */}
            <div className="flex-1 rounded-lg overflow-auto" ref={scrollRef}>
                {playlists.map(item => (
                    <div key={item.id} className="p-7 relative" style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${item.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        
                    }}>
                        <h4 className="text-sm opacity-80">Public Playlist</h4>
                        <h1 className="text-3xl md:text-8xl font-bold mb-3">{item.title}</h1>
                        <p className="text-gray-300 mb-2">{item.subtitle}</p>
                        <div className="flex mt-1 gap-1 items-center text-sm">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-black font-bold text-xs">S</span>
                            </div>
                            <p className="font-bold">Spotify</p>
                            <span className="w-1 rounded-full bg-gray-300 h-1"></span>
                            <div className="font-semibold text-gray-300">1,523,558 saves</div>
                            <span className="w-1 rounded-full bg-gray-300 h-1"></span>
                            <div className="font-semibold text-gray-300">50 songs, about 3 hr</div>
                        </div>
                    </div>
                ))}

                <div className="bg-[#121212]">
                    <div className="flex items-center justify-between p-4 bg-[#141414]">
                        <div className="flex items-center space-x-4">
                            <button
                                className="bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center w-12 h-12 transition-all hover:scale-105"
                                onClick={() => handlePlay(currentTrackId)} // Modified to pass currentTrackId
                            >
                                {isPlaying ?
                                    <Pause className="w-5 h-5 text-black fill-black" /> :
                                    <Play className="w-5 h-5 text-black fill-black ml-1" />
                                }
                            </button>
                            {!isScrolled && (
                                <>
                                    <button className="border-2 border-zinc-500 text-zinc-500 hover:border-white hover:text-white rounded-full p-2 transition-colors">
                                        <Plus className="w-5 h-5" />
                                    </button>
                                    <button className="text-gray-400 hover:text-white transition-colors">
                                        <MoreHorizontal className="w-6 h-6" />
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="relative">
                            <button
                                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <span className="text-sm">{viewMode}</span>
                                <Menu className="w-4 h-4" />
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 top-full mt-2 bg-[#1a1a1a]   rounded-md shadow-lg z-10 min-w-[150px]">
                                    <div className="py-1">
                                        <span className="flex items-center space-x-3 px-4 py-2 text-sm font-semibold text-gray-300">View as</span>
                                        <button
                                            className={`flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left transition-colors ${viewMode === 'Compact' ? 'text-green-400' : ''}`}
                                            onClick={() => handleViewChange('Compact')}
                                        >
                                            <LayoutList className="w-4 h-4" />
                                            <span>Compact</span>
                                            {viewMode === 'Compact' && <div className="w-1 h-1 bg-green-400 rounded-full ml-auto"></div>}
                                        </button>
                                        <button
                                            className={`flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left transition-colors ${viewMode === 'List' ? 'text-green-400' : ''}`}
                                            onClick={() => handleViewChange('List')}
                                        >
                                            <List className="w-4 h-4" />
                                            <span>List</span>
                                            {viewMode === 'List' && <div className="w-1 h-1 bg-green-400 rounded-full ml-auto"></div>}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {viewMode === 'List' ? (
                        <>
                            <div className="grid grid-cols-12 gap-4 px-8 py-3 text-gray-400 text-sm font-medium border-b border-[#1d1d1d]">
                                <div className="col-span-1 pl-2">#</div>
                                <div className="col-span-5">Title</div>
                                <div className="col-span-4 hidden sm:block">Album</div>
                                <div className="col-span-1 hidden md:block">Date added</div>
                                <div className="col-span-1 flex justify-end">
                                    <Clock className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="px-6">
                                {songs.map((song, index) => (
                                    <div
                                        key={song.id}
                                        className={`grid grid-cols-12 gap-4 py-2 px-2 rounded-md hover:bg-[#1d1d1d] transition-colors group cursor-pointer ${
                                            currentTrackId === song.id ? 'bg-[#1d1d1d]' : ''
                                        }`}
                                        onClick={() => handlePlay(song.id)}
                                    >
                                        <div className="col-span-1 flex items-center">
                                            {currentTrackId === song.id && isPlaying ? (
                                                <div className="flex space-x-1">
                                                    <div className="w-1 h-4 bg-green-400 animate-pulse"></div>
                                                    <div className="w-1 h-4 bg-green-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                                    <div className="w-1 h-4 bg-green-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                                                    <Play className="w-4 h-4 text-white hidden group-hover:block" />
                                                </>
                                            )}
                                        </div>

                                        <div className="col-span-5 flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gray-700 rounded flex-shrink-0 overflow-hidden">
                                                <img src={song.image} alt={song.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className={`font-medium truncate ${currentTrackId === song.id ? 'text-green-400' : 'text-white'}`}>
                                                    {song.title}
                                                </div>
                                                <div className="text-sm text-gray-400 truncate">{song.artists}</div>
                                            </div>
                                        </div>

                                        <div className="col-span-4 hidden sm:flex items-center">
                                            <span className="text-gray-400 text-sm truncate hover:underline cursor-pointer">
                                                {song.album}
                                            </span>
                                        </div>

                                        <div className="col-span-1 md:flex items-center hidden">
                                            <span className="text-gray-400 text-sm">{song.dateAdded}</span>
                                        </div>

                                        <div className="col-span-1 flex items-center justify-end">
                                            <span className="text-gray-400 text-sm">{song.duration}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="px-4">
                            <div className="grid grid-cols-12 gap-4 py-2 border-b border-[#1d1d1d] text-gray-400 text-sm font-medium">
                                <div className="col-span-1 pl-8">#</div>
                                <div className="col-span-3">Title</div>
                                <div className="col-span-3">Artist</div>
                                <div className="col-span-2">Album</div>
                                <div className="col-span-2">Date added</div>
                                <div className="col-span-1 flex justify-center">
                                    <Clock className="w-4 h-4" />
                                </div>
                            </div>

                            {songs.map((song, index) => (
                                <div
                                    key={song.id}
                                    className={`grid grid-cols-12 gap-4 py-2 rounded-md hover:bg-[#1d1d1d] transition-colors group cursor-pointer ${
                                        currentTrackId === song.id ? 'bg-[#1d1d1d]' : ''
                                    }`}
                                    onClick={() => handlePlay(song.id)}
                                >
                                    <div className="col-span-1 flex items-center px-8">
                                        {currentTrackId === song.id && isPlaying ? (
                                            <div className="flex space-x-1">
                                                <div className="w-1 h-4 bg-green-400 animate-pulse"></div>
                                                <div className="w-1 h-4 bg-green-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                                <div className="w-1 h-4 bg-green-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                                                <Play className="w-4 h-4 text-white hidden group-hover:block" />
                                            </>
                                        )}
                                    </div>

                                    <div className="col-span-3 flex items-center">
                                        <div className={`font-medium truncate text-sm ${currentTrackId === song.id ? 'text-green-400' : 'text-white'}`}>
                                            {song.title}
                                        </div>
                                    </div>

                                    <div className="col-span-3 flex items-center">
                                        <span className="text-gray-400 text-sm truncate">{song.artists}</span>
                                    </div>

                                    <div className="col-span-2 flex items-center">
                                        <span className="text-gray-400 text-sm truncate">{song.album}</span>
                                    </div>

                                    <div className="col-span-2 flex items-center">
                                        <span className="text-gray-400 text-sm">{song.dateAdded}</span>
                                    </div>

                                    <div className="col-span-1 flex items-center justify-center">
                                        <span className="text-gray-400 text-sm">{song.duration}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Video player */}
            {currentTrackId && showVideoComponent && (
                <div className="w-96 pl-2 border-l border-[#1d1d1d] flex flex-col">
                    <div className="flex-1 flex items-center justify-center">
                        {getCurrentSong()?.video ? (
                            <div className="relative w-full h-full group">
                                {/* Hover Buttons */}
                                <button
                                    onClick={() => setShowVideoComponent(false)}
                                    className="absolute top-2 left-2 z-20 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                                    title="Hide Video Player"
                                >
                                    <X size={18} />
                                </button>

                                <button
                                    onClick={() => navigate('/video-detail')}
                                    className="absolute top-2 right-2 z-20 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                                    title="Open in Full View"
                                >
                                    <ExternalLink size={18} />
                                </button>

                                <video
                                    ref={videoRef}
                                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                                    loop
                                    muted
                                    autoPlay // Autoplay is handled by handlePlay
                                    playsInline
                                    poster={getCurrentSong()?.image}
                                >
                                    <source src={getCurrentSong()?.video} type="video/mp4" />
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
                                {isPlaying ?
                                    <Pause className="w-5 h-5 text-black" /> :
                                    <Play className="w-5 h-5 text-black ml-1" />
                                }
                            </button>
                            <div className="text-center">
                                <div className="text-white font-medium">{getCurrentSong()?.title}</div>
                                <div className="text-gray-400 text-sm">{getCurrentSong()?.artists}</div>
                            </div>
                            <div></div>
                        </div>

                        {/* Progress bar and time display are now handled by BottomPlayer */}
                        {/* Removed the hardcoded progress bar from here */}
                    </div>
                </div>
            )}
            <BottomPlayer
                songs={songs} // Pass the entire songs array
                currentTrackId={currentTrackId} // Pass the current track ID
                currentTrackIndex={currentTrackIndex} // Pass the current track index
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                handlePlay={handlePlay} // Pass the updated handlePlay
                audioRef={audioRef} // Pass audio ref
                videoRef={videoRef} // Pass video ref
            />
        </div>
    );
};

export default Inside;