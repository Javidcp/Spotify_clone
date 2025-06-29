/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import api from '../utils/axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditSong = () => {
    const { songId } = useParams();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState('');
    const [previewAudio, setPreviewAudio] = useState('');
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { isSubmitting, isValid, isDirty, errors },
        watch,
    } = useForm({ mode: 'onChange' });

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const res = await api.get(`/songs/${songId}`);
                const song = res.data;
                setValue('title', song.title);
                setValue('duration', song.duration);
                setValue('playCount', song.playCount);
                setValue('genre', song.genre?._id || '');
                setValue('artist', song.artist.map((a) => a._id).join(','));
                setPreviewImage(song.coverImage);
                setPreviewAudio(song.url);
            } catch (err) {
                toast.error('Failed to fetch song');
                navigate('/admin/songs');
            }
        };

        fetchSong();
    }, [songId, setValue, navigate]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('duration', data.duration);
        formData.append('genre', data.genre);
        const artistIds = data.artist.split(',').map((id) => id.trim());
        artistIds.forEach((id) => formData.append('artist', id));

        if (data.coverImage?.[0]) {
            formData.append('coverImage', data.coverImage[0]);
        }

        if (data.songFile?.[0]) {
            formData.append('songFile', data.songFile[0]);
        }
        console.log(songId)

        try {
            const res = await api.put(`/songs/update/${songId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success(`Song "${res.data.title}" updated successfully!`);
            navigate('/admin/songs');
        } catch (err) {
            console.log('Error:', err.response);
            toast.error(err.response?.data?.message || 'Something went wrong');
            setError(err.message);
        }
    };

    const selectedCover = watch('coverImage')?.[0];
    const selectedAudio = watch('songFile')?.[0];

    useEffect(() => {
        if (selectedCover) {
            setPreviewImage(URL.createObjectURL(selectedCover));
        }
    }, [selectedCover]);

    useEffect(() => {
        if (selectedAudio) {
            setPreviewAudio(URL.createObjectURL(selectedAudio));
        }
    }, [selectedAudio]);

    return (
        <div className="text-white flex justify-center min-h-screen items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-96 p-6 rounded-lg bg-[#1e1e1e]"
                encType="multipart/form-data"
            >
                <h2 className="text-lg font-semibold mb-4 text-center">Edit Song</h2>

                {/* Title */}
                <label className="text-xs">Title:</label>
                <input
                    type="text"
                    placeholder="Song title"
                    className={`placeholder:text-[#696969] rounded-md border p-2 w-full mb-1 ${
                        errors.title ? 'border-red-500' : 'border-[#696969]'
                    }`}
                    {...register('title', { required: 'Title is required' })}
                />
                {errors.title && <p className="text-red-400 text-xs mb-2">{errors.title.message}</p>}

                {/* Duration */}
                <label className="text-xs">Duration:</label>
                <input
                    type="text"
                    placeholder="e.g., 3:45"
                    className={`placeholder:text-[#696969] rounded-md border p-2 w-full mb-1 ${
                        errors.duration ? 'border-red-500' : 'border-[#696969]'
                    }`}
                    {...register('duration', { required: 'Duration is required' })}
                />
                {errors.duration && <p className="text-red-400 text-xs mb-2">{errors.duration.message}</p>}

                {/* Genre */}
                <label className="text-xs">Genre ID:</label>
                <input
                    type="text"
                    placeholder="Genre ID"
                    className={`placeholder:text-[#696969] rounded-md border p-2 w-full mb-1 ${
                        errors.genre ? 'border-red-500' : 'border-[#696969]'
                    }`}
                    {...register('genre', { required: 'Genre is required' })}
                />
                {errors.genre && <p className="text-red-400 text-xs mb-2">{errors.genre.message}</p>}

                {/* Artist */}
                <label className="text-xs">Artist IDs (comma separated):</label>
                <input
                    type="text"
                    placeholder="e.g., 123,456"
                    className={`placeholder:text-[#696969] rounded-md border p-2 w-full mb-1 ${
                        errors.artist ? 'border-red-500' : 'border-[#696969]'
                    }`}
                    {...register('artist', { required: 'Artist ID(s) required' })}
                />
                {errors.artist && <p className="text-red-400 text-xs mb-2">{errors.artist.message}</p>}

                {/* Cover Image */}
                <label className="text-xs">Cover Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    className="text-sm text-[#ccc] rounded-md border p-2 w-full mb-1 border-[#696969]"
                    {...register('coverImage')}
                />
                {previewImage && (
                    <img src={previewImage} alt="cover" className="w-24 h-24 object-cover rounded mt-2 mx-auto mb-2" />
                )}

                {/* Audio File */}
                <label className="text-xs">Audio File:</label>
                <input
                    type="file"
                    accept="audio/*"
                    className="text-sm text-[#ccc] rounded-md border p-2 w-full mb-1 border-[#696969]"
                    {...register('songFile')}
                />
                {previewAudio && (
                    <audio controls src={previewAudio} className="w-full mt-2 mb-2" />
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!isDirty || !isValid || isSubmitting}
                    className={`w-full p-3 mt-3 text-black font-mono rounded-md transition ${
                        !isDirty || !isValid || isSubmitting
                            ? 'bg-[#494949] text-red-100 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-400'
                    }`}
                >
                    {isSubmitting ? 'Updating...' : 'Update Song'}
                </button>
            </form>
        </div>
    );
};

export default EditSong;
