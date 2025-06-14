import React, { useState, useEffect } from 'react';
import { X, User, Camera, Pen } from 'lucide-react';
import api from "../utils/axios"
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import { useNavigate } from "react-router-dom"


const Account = () => {
    const user = useSelector((state) => state.auth.user);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const token = localStorage.getItem('accessToken');
    const dispatch = useDispatch();
    const navigate = useNavigate()




    useEffect(() => {
        if (user) {
            setName(user.username || '');

            if (user.profileImage) {
                const baseUrl = 'http://localhost:5050/';
                const imgUrl = user.profileImage.startsWith('http')
                    ? user.profileImage
                    : `${baseUrl}${user.profileImage}`;
                setPreviewUrl(imgUrl);
            } else {
                setPreviewUrl(null);
            }
        }
    }, [user]);



    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setSelectedImage(null);
        setPreviewUrl(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setSelectedImage(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("username", name);
        if (selectedImage) {
            formData.append("profileImage", selectedImage);
        }

        try {
            const res = await api.put('/auth/update-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            });

            const updatedUser = res.data.user;

            if (updatedUser.profileImage) {
            const baseUrl = 'http://localhost:5050/';
            updatedUser.profileImage = updatedUser.profileImage.startsWith('http')
                ? updatedUser.profileImage
                : `${baseUrl}${updatedUser.profileImage}`;
            updatedUser.profileImage += `?t=${new Date().getTime()}`;
            }

            setName(updatedUser.username);
            setPreviewUrl(updatedUser.profileImage || null);
            setSelectedImage(null);
            closeModal();

            dispatch(setUser(updatedUser));
            localStorage.setItem('user', JSON.stringify(updatedUser));
            navigate('/account')

        } catch (error) {
            console.error("Failed to update profile:", error?.response?.data?.message || error.message);
        }
    };


    return (
        <div className="min-h-screen relative">
        <div className={`transition-all duration-300 ${isOpen ? 'blur-sm scale-95' : ''}`}>
            <div className='w-full flex items-end bg-[#121212] rounded-md overflow-hidden p-5 text-white gap-5'>
            <div>
                <div className="w-60 h-60 bg-black rounded-full flex items-center justify-center overflow-hidden text-white text-5xl font-bold">
                    {previewUrl ? (
                        <img
                        src={previewUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className='text-9xl'>{name?.charAt(0).toUpperCase()}</span>
                    )}
                </div>

            </div>
            <div>
                <span>Profile</span>
                <h2 className='text-7xl font-bold mt-2'>{name}</h2>
            </div>
            </div>
            <div className='p-8 bg-[#191919] text-white'>
            <button 
                onClick={openModal}
                className='flex items-center gap-2 p-2 border border-zinc-400 rounded-md px-4 hover:bg-zinc-800 transition-colors'
            >
                Edit <Pen size={15} />
            </button>
            </div>
        </div>

        {isOpen && (
            <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 relative shadow-2xl">
                <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                <X size={24} />
                </button>

                <h2 className="text-white text-2xl font-bold mb-8">Profile details</h2>

                <div className="flex items-center mb-6">
                <div className="relative">
                    <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                    {previewUrl ? (
                        <img
                        src={previewUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        />
                    ) : (
                        <User size={40} className="text-gray-400" />
                    )}
                    </div>
                    
                    <label className="absolute bottom-0 right-0 bg-gray-600 rounded-full p-1 cursor-pointer hover:bg-gray-500 transition-colors">
                    <Camera size={16} className="text-white" />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    </label>
                </div>

                <div className="flex-1 ml-4">
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your name"
                    />
                </div>
                </div>

                <div className="flex justify-end mb-6">
                <button
                    onClick={handleSave}
                    className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                >
                    Save
                </button>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed">
                    By proceeding, you agree to give Spotify access to the image you choose to upload. 
                    Please make sure you have the right to upload the image.
                </p>
            </div>
            </div>
        )}
        </div>
    );
};

export default Account;