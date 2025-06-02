import React from 'react'
import Logo from "../../assets/spotify_icon-white.png"
import { GoHomeFill } from "react-icons/go";
import SearchBar from './SearchBar';
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';



const Navbar = () => {

    const navigate = useNavigate()

    return (
        <div className='h-16 pl-7 bg-black flex items-center justify-between'>
            <div className="flex items-center">
                <img src={Logo} className='w-8 h-8' alt="" />
                <div className='bg-[#1F1F1F] text-white p-[10px] ml-6 mr-2 hidden md:block rounded-full'>
                    <GoHomeFill size={28}  />
                </div>
                <SearchBar/>
            </div>
            <div className="hidden md:flex text-zinc-400 " style={{ fontFamily: 'CircularStd', fontWeight: 700 }}>
                <div className='px-3 mr-2 flex gap-2 border-r-1'>
                    <span>Premium</span>
                    <span>Support</span>
                    <span>Download</span>
                </div>
                <div>
                    <div className='flex items-center gap-2 mx-3'>
                        <MdOutlineDownloadForOffline size={20} />
                        Install App
                    </div>
                </div>
                <Link to='/signup'>Sign up</Link>
            </div>
            <div className='flex items-center gap-4'>
                <Link to='/signup' className='text-zinc-400 block md:hidden' style={{ fontFamily: 'CircularStd', fontWeight: 700 }}>Sign up</Link>
            <button onClick={() => navigate('/login')} className='h-10 w-20 md:h-12 md:w-28 mr-2 rounded-full bg-white flex items-center justify-center' style={{ fontFamily: 'CircularStd', fontWeight: 700 }}>
                Log in
            </button>
            </div>
        </div>
    )
}

export default Navbar