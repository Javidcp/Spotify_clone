import React from 'react';

const UserAvatar = ({ name, photo, size = '40' }) => {
    const getInitial = (name) => name?.charAt(0).toUpperCase();

    const dimension = `${size}px`;

    return photo ? (
        <img
        src={photo}
        alt="Profile"
        className="rounded-full object-cover"
        style={{ width: dimension, height: dimension }}
        />
    ) : (
        <div
        className="rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold"
        style={{
            width: dimension,
            height: dimension,
            fontSize: `${size / 2}px`,
        }}
        >
        {getInitial(name)}
        </div>
    );
};

export default UserAvatar;
