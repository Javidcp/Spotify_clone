import React from 'react'

const CreatePlaylist = () => {
    return (
        <div className="min-h-screen bg-[#121212] rounded-t-md overflow-hidden text-white flex">
            <div className="flex-1 overflow-y-auto">
                <div className="flex items-end p-6 bg-[#212121]">
                    <div className="w-48 h-48 bg-[#121212] flex items-center justify-center mr-6 shadow-xl">
                        <span className="text-white text-8xl opacity-70">
                            &#9835;
                        </span>
                    </div>

                    <div className="flex flex-col justify-end text-white">
                        <p className="text-sm uppercase tracking-wider text-gray-300 mb-1">
                            Public Playlist
                        </p>
                        <h1 className="text-7xl font-bold leading-tight mb-2">
                            My Playlist #1
                        </h1>
                        <p className="text-base text-gray-300">
                            Name
                        </p>
                    </div>
                </div>

                <div className="flex items-center px-6 py-4 bg-[#121212]">
                    <button className="text-gray-400 hover:text-white mr-4 text-3xl font-bold">
                        ...
                    </button>

                    <button className="text-gray-400 hover:text-white text-2xl ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 bg-[#121212]">
                    <p className="text-xl text-white mb-4">Let's find something for your playlist</p>
                    <div className="flex items-center bg-[#282828] rounded-md max-w-md">
                        <input
                        type="text"
                        placeholder="Search for songs or episodes"
                        className="flex-1 bg-transparent border-none outline-none text-white p-1 px-3 text-base placeholder-gray-400"
                        />
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePlaylist