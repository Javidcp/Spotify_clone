import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/axios'
import { toast } from 'react-toastify'


const USERS_PER_PAGE = 10;

const Artist = () => {
    const navigate = useNavigate()
    const [artists, setArtists] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchArtist = async () => {
            try{
                const res = await api.get('/artist')
                setArtists(res.data)
            } catch (err) {
                console.error("Error in fetching songs:", err)
            }
        }
        fetchArtist()
    }, [])
    
    const handleDeleteArtist = async (artistId) => {
        const token = localStorage.getItem("accesstoken")
        try {
            await api.delete(`/artist/deleteArtist/${artistId}`, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            setArtists((prev) => prev.filter((artist) => artist._id !== artistId));
            toast.success("Artist deleted successfully");
        } catch (err) {
            toast.error("Error deleting artist");
            console.error(err);
        }
    }


    const totalPages = Math.ceil(artists.length / USERS_PER_PAGE);
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const paginatedArtists = artists.slice(startIndex, startIndex + USERS_PER_PAGE);


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
                    <th className="border border-[#696969] p-2">Action</th>
                </tr>
                {paginatedArtists.map(artist => (
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
                        <td className='flex justify-center gap-3'>
                            <button onClick={() => navigate(`/admin/editArtist/${artist._id}`)} className='bg-blue-500 py-1 px-3 rounded mt-1'>
                                Edit
                            </button>
                            <button onClick={() => handleDeleteArtist(artist._id)} className='bg-red-600 py-1 px-3 rounded mt-1'>
                                Delete
                            </button>
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

export default Artist