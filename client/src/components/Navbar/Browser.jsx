import React from 'react';
import SearchBar from './SearchBar';

const BrowseInterface = () => {
    const categories = [
        {
        id: 1,
        title: 'Made For You',
        subtitle: 'Pop Mix',
        bgColor: 'bg-gradient-to-br from-blue-600 to-purple-600',
        image: '🎵',
        position: 'top-right'
        },
        {
        id: 2,
        title: 'New Releases',
        subtitle: 'FRIDAY',
        bgColor: 'bg-gradient-to-br from-green-600 to-yellow-500',
        image: '🆕',
        position: 'bottom-right'
        },
        {
        id: 3,
        title: 'Rain & Monsoon',
        subtitle: 'Barso Re',
        bgColor: 'bg-gradient-to-br from-teal-600 to-green-600',
        image: '🌧️',
        position: 'top-right'
        },
        {
        id: 4,
        title: 'Hindi',
        subtitle: 'BOLLYWOOD CENTRAL',
        bgColor: 'bg-gradient-to-br from-pink-500 to-purple-600',
        image: '🎭',
        position: 'bottom-right'
        },
        {
        id: 5,
        title: 'Telugu',
        subtitle: 'HOT HITS',
        bgColor: 'bg-gradient-to-br from-orange-500 to-red-500',
        image: '🔥',
        position: 'top-right'
        },
        {
        id: 6,
        title: 'Punjabi',
        subtitle: 'PUNJABI',
        bgColor: 'bg-gradient-to-br from-pink-400 to-purple-500',
        image: '🎤',
        position: 'bottom-right'
        },
        {
        id: 7,
        title: 'Podcast Charts',
        subtitle: '',
        bgColor: 'bg-gradient-to-br from-blue-600 to-indigo-700',
        image: '📈',
        position: 'bottom-right'
        },
        {
        id: 8,
        title: 'Podcast New Releases',
        subtitle: 'Brand Stories I\'m New!',
        bgColor: 'bg-gradient-to-br from-purple-500 to-pink-500',
        image: '🎙️',
        position: 'top-right'
        }
    ];

    return (
        <div className="min-h-screen bg-[#121212] text-white p-6">
            <span className='block md:hidden mb-4'>
                <SearchBar className="bg-amber-200"/>
            </span>
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Browse all</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
                <div
                key={category.id}
                className={`${category.bgColor} rounded-lg p-6 h-48 relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}
                >
                <div className="relative z-10">
                    <h2 className="text-xl font-bold mb-2 text-white drop-shadow-lg">
                    {category.title}
                    </h2>
                    {category.subtitle && (
                    <p className="text-sm text-white/90 font-medium">
                        {category.subtitle}
                    </p>
                    )}
                </div>

                <div className={`absolute ${category.position === 'top-right' ? 'top-4 right-4' : 'bottom-4 right-4'} text-6xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}>
                    {category.image}
                </div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full transform rotate-45 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-lg"></div>
                </div>
            ))}
            </div>
            
        </div>
        </div>
    );
};

export default BrowseInterface;