import React from 'react'
import { GoHomeFill, GoPlus } from "react-icons/go";
import { IoIosSearch  } from "react-icons/io";



const ResponsiveNav = () => {
    return (
        <div className='flex md:hidden absolute bottom-0 w-full text-white bg-black p-2 justify-around'>
            <GoHomeFill size={20}  />
            <IoIosSearch size={20} />
            <GoPlus size={20} />
        </div>
    )
}

export default ResponsiveNav