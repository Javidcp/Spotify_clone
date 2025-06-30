import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/axios";
import { toast } from "react-toastify";

const IndiaBestAll = () => {
    const [playlists, setPlaylist] = useState([])

    useEffect(() => {
        const handleSongs = async () => {
            try {
                const res = await api.get('/genre')
                setPlaylist(res.data.playlists)
                console.log(res.data);
                
            } catch (err) {
                toast.error("Error in fetching Playlist:", err)
            }
        }
        handleSongs()
    }, [])




    return (
        <div className="bg-[#121212] text-white min-h-screen p-8">
            <div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
                {playlists.map((playlist) => (
                    <Link
                        key={playlist.id}
                        to='/playlist'
                    >
                    <div className=" p-4 rounded-lg hover:bg-[#1f1f1f] transition-all duration-300 cursor-pointer group/card">
                        <div className="relative mb-4 overflow-hidden rounded-lg">
                            <div className={`aspect-square relative`}>
                                <img src={playlist.image} alt="" />

                                
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-1 group-hover/card:text-green-400 transition-colors">
                                {playlist.name}
                            </h4>
                            <p className="text-gray-400 text-sm line-clamp-2 leading-tight">
                                {playlist.description}
                            </p>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default IndiaBestAll;