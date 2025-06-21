import React, { useState } from 'react'
import { GoPlus } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const [full, setFull] = useState(false)
    const navigate = useNavigate()

    return (
        <div className={`bg-[#121212] rounded-lg h-[100%] hidden m-1 px-3 pt-5 text-white md:flex flex-col gap-4 ${full === true ? 'items-start pl-[20px] w-100 transition-all duration-300 ease-[cubic-bezier(0.42,0,0.58,1)]' : 'items-center transition-all duration-300 ease-[cubic-bezier(0.42,0,0.58,1)]'} `}>
            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center gap-2'>
                    <button onClick={() => setFull(prev => !prev)}>
                        <svg role="img" height={25} width={25} color='#9a9a9a' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z" fill="currentColor"></path></svg>
                    </button>
                    {full && (
                        <span className="text-lg font-bold">Your Library</span>
                    )}
                </div>
                {full && (
                    <button onClick={() => navigate('/createplaylist')}  className="flex items-center gap-1 text-sm font-semibold text-[#9a9a9a] hover:text-white">
                        <GoPlus size={25} />
                        Create
                    </button>
                )}
            </div>
            
            {full && (
                <>
                    <div className='bg-[#242424] rounded-lg p-4 w-full'>
                        <h3 className='text-white font-bold text-base mb-2'>Create your first playlist</h3>
                        <p className='text-[#b3b3b3] text-sm mb-4'>It's easy, we'll help you</p>
                        <button onClick={() => navigate('/createplaylist')} className='bg-white text-black text-sm font-semibold py-2 px-4 rounded-full hover:scale-105 transition-transform duration-200'>
                            Create playlist
                        </button>
                    </div>

                    <div className='bg-[#242424] rounded-lg p-4 w-full'>
                        <h3 className='text-white font-bold text-base mb-2'>Let's find some podcasts to follow</h3>
                        <p className='text-[#b3b3b3] text-sm mb-4'>We'll keep you updated on new episodes</p>
                        <button onClick={() => navigate('/search')} className='bg-white text-black text-sm font-semibold py-2 px-4 rounded-full hover:scale-105 transition-transform duration-200'>
                            Browse podcasts
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default SideBar;