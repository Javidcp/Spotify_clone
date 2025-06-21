import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../utils/axios";
import { toast } from "react-toastify";

const AddSong = () => {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const res = await api.get("/artist");
                setArtists(res.data);
            } catch (err) {
                console.error("Failed to fetch artists:", err);
            }
        };

        fetchArtists();
    }, []);

    const onSubmit = async (formData) => {
        setLoading(true);
        const token = localStorage.getItem("accessToken");

        const data = new FormData();
        data.append("title", formData.title);
        data.append("artist", formData.artist);
        data.append("coverImage", formData.coverImage[0]);
        data.append("duration", formData.duration);
        data.append("url", formData.url[0]);
        data.append("genre", formData.genre);

        try {
            await api.post("/songs/add", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Song added!");
            reset();
        } catch (err) {
            console.error(err);
            toast.error("Failed to add song.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center mx-auto min-h-screen text-white">
            <div className="flex flex-col space-y-1 bg-[#1e1e1e] p-6 rounded-lg mt-5">
                <label className="text-xs mt-1">Title:</label>
                <input {...register("title", { required: true })} type="text" placeholder="Title" className="border p-2 border-[#696969] rounded-md" />

                <label className="text-xs mt-1">Artist:</label>
                <select {...register("artist", { required: true })} className="border p-2 border-[#696969] rounded-md">
                    <option value="" className="bg-[#121212]">Select Artist</option>
                    {artists.map((artist) => (
                        <option key={artist._id} className="bg-[#121212]" value={artist._id}>{artist.name}</option>
                    ))}
                </select>

                <label className="text-xs mt-1">Cover Image:</label>
                <input {...register("coverImage")} type="file" className="border p-2 border-[#696969] rounded-md" />

                <label className="text-xs mt-1">Duration:</label>
                <input {...register("duration", { required: true })} type="text" placeholder="Duration (e.g. 03:45)" className="border p-2 border-[#696969] rounded-md" />

                <label className="text-xs mt-1">Song:</label>
                <input {...register("url", { required: true })} type="file" className="border p-2 border-[#696969] rounded-md" />

                <label className="text-xs mt-1">Genre:</label>
                <input {...register("genre")} type="text" placeholder="Genre" className="border p-2 border-[#696969] rounded-md" />

                <button type="submit" disabled={loading} className="p-3 bg-green-400 mt-2 text-black font-mono rounded-lg">
                    {loading ? 'Adding...' : 'Add Song'}
                </button>
            </div>
        </form>
    );
};

export default AddSong;