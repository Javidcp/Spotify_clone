import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';
import UserAvatar from '../UserAvatar';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const res = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data);
        } catch (err) {
            console.error("Failed to fetch user:", err);
        }
        };

        fetchUser();
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="p-3">
        <UserAvatar name={user.username} photo={user.profileImage} size={30} />
        <h2 className="mt-2 text-sm font-bold">{user.name}</h2>
        </div>
    );
};

export default Profile;
