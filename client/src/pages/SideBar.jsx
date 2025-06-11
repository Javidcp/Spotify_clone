import React, { useState } from 'react'
import { GoPlus } from "react-icons/go";



const SideBar = () => {

    const [full, setFull] = useState(false)

    return (
        <div className={`bg-[#121212] rounded-lg h-[100%] hidden m-1 px-3 pt-5 text-white md:flex flex-col  gap-4 ${full === true ? 'items-start pl-[20px] w-70 transition-all duration-300 ease-[cubic-bezier(0.42,0,0.58,1)]': 'items-center transition-all duration-300 ease-[cubic-bezier(0.42,0,0.58,1)]'} `}>
            <button onClick={() => setFull(prev => !prev)}>
                <svg  role="img" height={25} width={25} color='#9a9a9a' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z" fill="currentColor"></path></svg>
            </button>
            <div className='p-1 bg-[#1f1f1f] text-[#9a9a9a] rounded-full'>
                <GoPlus size={25}  />
            </div>
        </div>
    )
}

export default SideBar