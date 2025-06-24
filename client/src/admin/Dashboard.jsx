import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/axios";
import Spotify1 from "../assets/spoti-1.jpg"
import Spotify2 from "../assets/spoti-2.jpg"
import Spotify3 from "../assets/spoti-3.jpg"
import Spotify4 from "../assets/spoti-4.jpg"

const Dashboard = () => {
    const [ users, setUsers ] = useState([])
    const [ songs, setSongs ] = useState([])
    const [ artists, setArtists ] = useState([])
    const { user, isLoading } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const [ userData, setUserData ] = useState([])

    useEffect(() => {
        if (isLoading) return;

        if (!user || user.role !== "admin") {
            toast.error("Access Denied");
            navigate('/')
            return;
        }

        const fetchData = async () => {
            try {
                const [userRes, songRes, artistRes] = await Promise.all([
                    api.get('/auth/users'),
                    api.get('/songs'),
                    api.get('/artist')
                ])
                setUsers(userRes.data)
                setSongs(songRes.data)
                setArtists(artistRes.data)
                console.log(userRes.data);
                console.log(songRes.data);
                console.log(artistRes.data);
            } catch (err) {
                toast.error("Failed to fetch user data", err);
            }
        };

        fetchData();
    }, [user, isLoading, navigate]);

    // const recentUsers = [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    useEffect(() => {
        const fetchUserStats = async () => {
            try{
                const res = await api.get('/auth/user-stats')
                setUserData(res.data)
            } catch (err) {
                console.error("Error fetch user stats:", err);
            }
        }

        fetchUserStats()
    }, [])


    return (
        <div className="text-white min-h-screen mt-15">
            <div className="space-y-2 flex flex-col items-center ">
                <div className="flex gap-2">
                    <div className="w-120 h-40 font-bold rounded-tl-2xl  flex flex-col items-center justify-center" style={{backgroundImage: `url(${Spotify1})`, backgroundPosition: 'bottom right', backgroundSize: 'cover'}}>
                        <p className="text-5xl">{users.length}</p>
                        <p className="text-xl">Total User</p>
                    </div>
                    <div className="w-120 h-40 rounded-tr-2xl flex flex-col items-center justify-center font-bold" style={{backgroundImage: `url(${Spotify2})`, backgroundPosition: 'bottom right', backgroundSize: 'cover'}}>
                        <p className="text-5xl">{songs.length || 0}</p>
                        <p className="text-xl">Total Songs</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <div className="w-120 h-40 rounded-bl-2xl flex flex-col items-center justify-center font-bold" style={{backgroundImage: `url(${Spotify3})`, backgroundPosition: 'top right', backgroundSize: 'cover'}}>
                        <p className="text-5xl">{artists.length || 0}</p>
                        <p className="text-xl">Total Artist</p>
                    </div>
                    <div className="w-120 h-40 rounded-br-2xl flex flex-col items-center justify-center font-bold" style={{backgroundImage: `url(${Spotify4})`, backgroundPosition: 'top right', backgroundSize: 'cover'}}>
                        <p className="text-5xl">{songs.reduce((acc, song) => acc + (song.playCount || 0), 0)}</p>
                        <p className="text-xl">Total Playcount</p>
                    </div>
                </div>
            </div>

            <div>
                <h1 className="text-2xl font-bold text-center mt-20 mb-10">Recent registered Users</h1>
                <LineChart width={500} height={300} className='bg-white' data={userData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </div>
        </div>
    )
}

export default Dashboard