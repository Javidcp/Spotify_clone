import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../utils/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const GenrePlaylistCreator = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const [existPlaylist, setExistPlaylist] = useState([])

  const fetchPlaylists = async () => {
      try {
        const res = await api.get("/genre");
        const serverPlaylists = res.data.playlists.map((p) => ({
          ...p,
          image: p.image
        }));
        setExistPlaylist(serverPlaylists);
      } catch (err) {
        console.error("Failed to fetch playlists", err);
      }
    };
    useEffect(() => {

    fetchPlaylists();
  }, []);

const onSubmit = async (data) => {
  const trimmedName = data.playlistName.trim();

  if (!trimmedName) {
    toast.info("Please enter a valid playlist name.");
    return;
  }

  const formData = new FormData();
  formData.append("name", trimmedName);
  formData.append("description", data.description || "");
  formData.append("image", data.image[0]);

  try {
    const res = await api.post("/genre", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success(`Created playlist: ${res.data.playlist.name}`);
    reset();

    fetchPlaylists();
  } catch (error) {
    const message =
      error.response?.data?.message || "Something went wrong!";
    toast.error(`Error: ${message}`);
  }
};



  return (
    <div className="text-white p-4 mx-auto min-h-screen mt-10">
      <h2 className="text-2xl font-bold mb-4">Create Custom Playlist</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-xs bg-[#1e1e1e] p-5 rounded-lg">
        <input
          type="text"
          {...register("playlistName", { required: "Playlist name is required" })}
          placeholder="Enter playlist name"
          className={`w-full border p-2 rounded-md bg-[#1e1e1e] text-white ${
            errors.playlistName ? "border-red-500" : "border-[#696969]"
          }`}
        />
        {errors.playlistName && <p className="text-red-500">{errors.playlistName.message}</p>}

        <input
          type="file"
          accept="image/*"
          className={`text-sm text-[#ccc] bg-[#1e1e1e] rounded-md border p-2 w-full mb-3 ${
            errors.image ? "border-red-500" : "border-[#696969]"
          }`}
          {...register("image", {
            required: "Image is required",
            validate: {
              isImage: (fileList) =>
                fileList &&
                fileList[0] &&
                fileList[0].type.startsWith("image/")
                  ? true
                  : "Only image files are allowed"
            }
          })}
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}

        <textarea
          {...register("description")}
          placeholder="Enter description (optional)"
          className="w-full border p-2 rounded-md bg-[#1e1e1e] text-white border-[#696969]"
        />

        <button
                type="submit"
                disabled={isSubmitting}
                className={`p-3 mt-2 font-mono rounded-lg w-full ${
                    isSubmitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-400 text-black hover:bg-green-300"
                }`}
            >
            {isSubmitting ? "Creating..." : "Create Playlist"}
            </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Playlists:</h3>
        {existPlaylist.length === 0 ? (
          <p className="text-gray-400">No playlists created yet.</p>
        ) : (
          <div className="ml-0 mt-4 w-full space-y-4">
            {existPlaylist.map((p, i) => (
              <Link
                to={`/admin/genre/${p._id}`}
                key={i}
                className="flex items-center gap-4 p-4 rounded-md bg-[#121212] border border-[#696969]"
              >
                <div className="flex justify-between w-full">
                  <div className="w-20 h-20 bg-gray-700 rounded-md overflow-hidden flex items-center justify-center">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </div>
                  <div className="flex-1 ml-2 flex flex-col justify-center">
                    <h4 className="text-xl font-semibold">{p.name}</h4>
                    <p className="text-sm text-gray-400">
                      {p.description || "No description provided."}
                    </p>
                  </div>
                <div >
                    <button className="bg-red-600 p-2 rounded">
                      Delete
                    </button>
                </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrePlaylistCreator;
