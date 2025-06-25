import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/axios'


const USERS_PER_PAGE = 10;

const Songs = () => {
    const navigate = useNavigate()
    const [songs, setSongs] = useState([])
    const audioRef = useRef(null);
    const [playingId, setPlayingId] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchSong = async () => {
            try{
                const res = await api.get('/songs')
                setSongs(res.data)
            } catch (err) {
                console.error("Error in fetching songs:", err)
            }
        }
        fetchSong()
    }, [])

    const handleTogglePlay = (songUrl, songId) => {
        if (audioRef.current && playingId === songId) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            audioRef.current = new Audio(songUrl);
            audioRef.current.play();
            setPlayingId(songId);
            setIsPlaying(true);
        }
    };

    const totalPages = Math.ceil(songs.length / USERS_PER_PAGE);
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const paginatedSongs = songs.slice(startIndex, startIndex + USERS_PER_PAGE);


    return (
        <div className='pt-11 text-white min-h-screen'>
            <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-bold'>Song List</h2>
                <button onClick={() => navigate('/admin/addSong')} className='bg-blue-500 p-2 rounded-md'>
                    Add Songs
                </button>
            </div>
            <table className="min-w-full border-collapse border border-[#191919] mt-3">
                <tr className="bg-[#1d1d1d] text-left">
                    <th className="border border-[#696969] p-2 w-15">Image</th>
                    <th className="border border-[#696969] p-2">Song Name</th>
                    <th className="border border-[#696969] p-2">Artist</th>
                    <th className="border border-[#696969] p-2">Song</th>
                    <th className="border border-[#696969] p-2">Duration</th>
                    <th className="border border-[#696969] p-2">Play Count</th>
                    <th className="border border-[#696969] p-2">Genre</th>
                </tr>
                {paginatedSongs.map(song => (
                    <tr key={song._id} className="border-b border-[#191919]">
                        <td className="p-2 border border-[#191919]">
                            <img src={song.coverImage} className='w-12 h-12 object-cover object-top ' alt="" />
                        </td>
                        <td className="p-2 border border-[#191919]">
                            {song.title}
                        </td>
                        <td className="p-2 border border-[#191919]">
                            {song.artist.map(a => (
                                <span key={a._id}>{a.name}</span>
                            ))}
                        </td>
                        <td className="p-2 border w-30 border-[#191919]">
                            <button
                                onClick={() => handleTogglePlay(song.url, song._id)}
                                className={`${(playingId === song._id && isPlaying) ? 'bg-red-600' : 'bg-[#1ED760]'} text-white px-2 py-1 rounded`}
                            >
                                {(playingId === song._id && isPlaying) ? "Pause" : "Play"}
                            </button>
                        </td>
                        <td className="p-2 border border-[#191919]">
                            {song.duration}
                        </td>
                        <td className="p-2 border border-[#191919]">
                            {song.playCount}
                        </td>
                        <td className="p-2 border border-[#191919]">
                            {song.genre?.name || "Unknown"}
                        </td>
                    </tr>
                ))}
            </table>

            <div className="flex justify-center mt-6 space-x-2">
                <button className="px-3 py-1 bg-[#191919] rounded disabled:opacity-50" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 rounded ${ currentPage === i + 1 ? "bg-[#1ED760]" : "bg-[#191919]" }`}>
                        {i + 1}
                    </button>
                ))}

                <button className="px-3 py-1 bg-[#191919] rounded disabled:opacity-50" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Songs