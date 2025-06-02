// import React, { useState } from 'react';

import Logo from "../../assets/spotify_icon-white.png";
import { IoIosArrowBack  } from "react-icons/io";
import '../../App.css'


const Password = () => {


    
    return (
        <div className='bg-[#121212] min-h-screen pt-8 flex flex-col justify-center items-center text-white' >
            <div>
                <div className="flex justify-center">
                    <img src={Logo} alt="Logo" className="w-10 h-10 " />
                </div>
                <div className=' flex justify-center'>
                    <div className='relative text-white my-8 flex justify-center'>
                        <div className='absolute border-1 w-100 border-[#818181]'></div>
                        <div className='absolute border-1 w-66 border-green-400 right-[-64px]'></div>
                    </div>
                </div>
                <div className='flex w-[400px] items-center gap-1.5' style={{ fontFamily: 'CircularStd', fontWeight: 700 }}>
                    <IoIosArrowBack size={33} className='text-zinc-400' />
                    <div>
                        <div className="text-zinc-400"  style={{ fontFamily: 'CircularStd', fontWeight: 400 }}>Step 1 of 3</div>
                        <div className="g">Tell us about yourself</div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center my-6">
                    <form action="">
                        <label className="text-[14px] block" style={{ fontFamily: 'CircularStd', fontWeight: 900 }}>Name</label>
                        <span className="text-[13px] font-light block text-zinc-400" style={{ fontFamily: 'CircularStd', fontWeight: 500 }}>This name will appear on your profile</span>
                        <input type="text" className="border-1 p-2 w-[320px] mt-2 rounded-sm border-[#818181]" />

                        <label className="text-[14px] block mt-5" style={{ fontFamily: 'CircularStd', fontWeight: 900 }}>Date of birth</label>
                        <div  className=" flex gap-2">
                            <input type="number" placeholder="yyyy" className="border-1 p-2 w-[90px] mt-1 rounded-sm border-[#818181] no-spinner" />
                            <select
                                className="border p-2 w-[155px] mt-1 rounded-sm border-[#818181] text-zinc-400"
                                defaultValue=""
                            >
                                <option value="" disabled>Select Month</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <input type="number" placeholder="dd" className="border-1 p-2 w-[60px] mt-1 rounded-sm border-[#818181]" />
                        </div>

                        <label className="text-[14px] block mt-5" style={{ fontFamily: 'CircularStd', fontWeight: 900 }}>Gender</label>
                        <span className="text-[14px] font-light block text-zinc-400" style={{ fontFamily: 'CircularStd', fontWeight: 400 }}>
                            We use your gender to help personalize our <br />
                            content recommendations and ads for you.
                        </span>
                        <div className="mt-2 flex items-center gap-4 text-sm" >
                            <div className="grid grid-cols-1 gap-2">

                                <div className="flex gap-7">
                                    <label className="flex items-center w-fit cursor-pointer">
                                    <input
                                    type="radio"
                                    name="status"
                                    className="peer hidden"
                                    />
                                    <div className="w-4 h-4 hover:border-green-400 rounded-full border-1 border-[#818181] bg-transparent peer-checked:bg-black peer-checked:border-4 peer-checked:border-green-500 transition-all"></div>
                                    <span className="ml-2 text-white">Man</span>
                                </label>

                                <label className="flex items-center w-fit cursor-pointer">
                                    <input
                                    type="radio"
                                    name="status"
                                    className="peer hidden"
                                    />
                                    <div className="w-4 h-4 hover:border-green-400 rounded-full border-1 border-[#818181] bg-transparent peer-checked:bg-black peer-checked:border-4 peer-checked:border-green-500 transition-all"></div>
                                    <span className="ml-2 text-white">Women</span>
                                </label>

                                <label className="flex items-center w-fit cursor-pointer">
                                    <input
                                    type="radio"
                                    name="status"
                                    className="peer hidden"
                                    />
                                    <div className="w-4 h-4 hover:border-green-400 rounded-full border-1 border-[#818181] bg-transparent peer-checked:bg-black peer-checked:border-4 peer-checked:border-green-500 transition-all"></div>
                                    <span className="ml-2 text-white">Non-binary</span>
                                </label>
                                </div>

                                <div className="flex gap-7">
                                    <label className="flex items-center w-fit cursor-pointer">
                                    <input
                                    type="radio"
                                    name="status"
                                    className="peer hidden"
                                    />
                                    <div className="w-4 h-4 hover:border-green-400 rounded-full border-1 border-[#818181] bg-transparent peer-checked:bg-black peer-checked:border-4 peer-checked:border-green-500 transition-all"></div>
                                    <span className="ml-2 text-white">Something else</span>
                                </label>

                                <label className="flex items-center w-fit cursor-pointer">
                                    <input
                                    type="radio"
                                    name="status"
                                    className="peer hidden"
                                    />
                                    <div className="w-4 h-4 hover:border-green-400 rounded-full border-1 border-[#818181] bg-transparent peer-checked:bg-black peer-checked:border-4 peer-checked:border-green-500 transition-all"></div>
                                    <span className="ml-2 text-white">Prefer not to say</span>
                                </label>
                                </div>

                            </div>

                            
                        </div>

                        <button type="submit" className="w-[100%] text-center p-3 bg-[#1ed760] text-black rounded-full mt-12" style={{ fontFamily: 'CircularStd', fontWeight: 800 }}>
                            Next
                        </button>
                    </form>

                    <div className="text-[13px] text-[#818181] text-center mt-7" style={{ fontFamily: 'CircularStd', fontWeight: 500 }}>
                            This site is protected by reCAPTCHA and the Google <br />
                            <a href="https://policies.google.com/privacy" className="underline">Privacy Policy</a> and <a href="https://policies.google.com/terms" className="underline">Terms of Service</a> apply.
                        </div>
                </div>
                
            </div>
        </div>
    )
}

export default Password