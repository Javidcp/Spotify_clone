import React from 'react';
import UserAvatar from '../components/UserAvatar';

const Profile = ({ user }) => {
    return (
        <div className="flex items-center gap-4">
        <UserAvatar name={user?.name} photo={user?.photo} size={60} />
        <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
        </div>
        </div>
    );
};

export default Profile;
