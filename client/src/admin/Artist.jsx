import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/axios'

const Artist = () => {
    const navigate = useNavigate()
    const [artists, setArtists] = useState([])

    useEffect(() => {
            const fetchSong = async () => {
                try{
                    const res = await api.get('/artist')
                    setArtists(res.data)
                } catch (err) {
                    console.error("Error in fetching songs:", err)
                }
            }
            fetchSong()
        }, [])
    return (
        <div className='mt-11 text-white min-h-screen'>
            <div className='flex justify-between items-center'>
                <h2  className='text-2xl font-bold'>Artist List</h2>
                <button onClick={() => navigate('/admin/addArtist')} className='p-2 bg-blue-500 rounded-md'>
                    Add Artist
                </button>
            </div>
            <table className="min-w-full border-collapse border border-[#191919] mt-3">
                <tr className="bg-[#1d1d1d] text-left">
                    <th className="border border-[#696969] p-2">Image</th>
                    <th className="border border-[#696969] p-2">Artist</th>
                    <th className="border border-[#696969] p-2">Total Songs</th>
                    <th className="border border-[#696969] p-2">Song Name</th>
                    <th className="border border-[#696969] p-2">Followers</th>
                    <th className="border border-[#696969] p-2">Created Date</th>
                </tr>
                {artists.map(artist => (
                    <tr key={artist._id} className="border-b border-[#191919]">
                        <td className="p-2 border border-[#191919]">
                            <img src={artist.image} className='w-8' alt="" />
                        </td>
                        <td className="p-2 border border-[#191919]">
                            {artist.name}
                        </td>
                        <td className="p-2 border border-[#191919]">
                            {artist.songs.length}
                        </td>
                        <td className="p-2 border border-[#191919]">
                            {artist.songs.map(a => (
                                <span key={a._id}>{a.title}</span>
                            ))}
                        </td>
                        
                        
                        <td className="p-2 border border-[#191919]">
                            {artist.followers}
                        </td>
                        <td className="p-2 border border-[#191919]">
                            {artist.createdAt.slice(0, 10)}
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Artist