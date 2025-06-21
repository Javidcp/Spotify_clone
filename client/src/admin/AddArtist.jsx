import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/axios';
import { toast } from 'react-toastify';

const AdminCreateArtist = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('image', data.image[0]);
        formData.append('followers', data.followers || 0);

        try {
            const res = await api.post('/artist/add', formData, { headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success(`Artist "${res.data.name}" created successfully!`);
            reset();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className='text-white flex justify-center min-h-screen items-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-80 p-6 rounded-lg bg-[#1e1e1e]' encType="multipart/form-data">
                <h2 className="text-lg font-semibold mb-4 text-center">Create New Artist</h2>

                <label className="text-xs">Artist Name:</label>
                <input type="text" placeholder="Artist Name"  className='placeholder:text-[#696969] rounded-md border p-2 w-full border-[#696969] mb-3' {...register('name', { required: true })}/>

                <label className="text-xs">Cover Image:</label>
                <input type="file" accept="image/*" className='text-sm text-[#ccc] rounded-md border p-2 w-full border-[#696969] mb-3'{...register('image')} /> 

                <label className="text-xs">Followers:</label>
                <input type="number" placeholder="Followers" className='placeholder:text-[#696969] rounded-md border p-2 w-full border-[#696969] mb-4' {...register('followers')}/>

                <button type="submit" disabled={isSubmitting} className='w-full bg-green-500 p-3 text-black font-mono rounded-md hover:bg-green-400 transition'>
                    {isSubmitting ? 'Creating...' : 'Create Artist'}
                </button>
            </form>
        </div>
    );
};

export default AdminCreateArtist;
