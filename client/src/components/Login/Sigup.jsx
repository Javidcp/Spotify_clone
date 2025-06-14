import Logo from "../../assets/spotify_icon-white.png";
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from "react";

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoIosArrowBack, IoIosCheckmark  } from "react-icons/io";

import { useDispatch } from "react-redux"
import { setUser, setAuth } from "../../redux/authSlice";



const Sigup = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [name, setName] = useState("");
    const [dobYear, setDobYear] = useState("");
    const [dobMonth, setDobMonth] = useState("");
    const [dobDay, setDobDay] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState('');

    const [view, setView] = useState(() => {
        return Number(localStorage.getItem("view")) || 1;
    });
    useEffect(() => {
        localStorage.setItem("view", view);
    }, [view]);

    const goBack = () => {
        navigate(setView(view - 1));
    };




    const handleNext = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/auth/check-email", { email });
            console.log("Email check:", res.data);
            setView(view + 1) 
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };
    const handlePasswordNext = (e) => {
        e.preventDefault();
        if (hasLetter && hasNumberOrSpecial && hasMinLength) {
            setView(view + 1);
        } else {
            toast.info("Please meet all password requirements");
        }
    };


    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const dob = `${dobYear}-${dobMonth.padStart(2, '0')}-${dobDay.padStart(2, '0')}`;

            const userData = {
                username: name,
                email,
                password,
                dateOfBirth: dob,
                gender,
            };

            const res = await api.post("/auth/register", userData, {
                withCredentials: true,
            });

            console.log("User registered:", res.data);

            localStorage.setItem("accessToken", res.data.token);

            dispatch(setUser(res.data.user));
            dispatch(setAuth(true));

            localStorage.removeItem("view")
            navigate("/");
        } catch (error) {
            console.error(error.response?.data?.message || "Registration failed");
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };







    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumberOrSpecial = /[\d!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password);
    const hasMinLength = password.length >= 10;
    
    const CustomCheckbox = ({ checked, label }) => (
        <div className="flex items-center mb-2 mt-3">
            <div className="relative w-5 h-5 mr-2">
                <input
                    type="checkbox"
                    checked={checked}
                    readOnly
                    className="opacity-0 absolute w-5 h-5 z-10 cursor-default"
                />
                <span className={`block w-4 h-4 rounded-full border-2 ${checked ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}>
                    {checked && (
                        <IoIosCheckmark size={20} className="text-black font-light absolute top-[-1.5px] right-[2px]" />
                    )}
                </span>
            </div>
            <label className="text-sm select-none">{label}</label>
        </div>
    );



    return (
        <>
            { view === 1 && (
                <div className="bg-[#121212] min-h-screen flex justify-center text-white">
                    <div className='my-8 '>
                        <div className="flex justify-center">
                            <img src={Logo} alt="Logo" className="w-10 h-10 " />
                        </div>
                        <h2 className="text-center text-5xl/14 mt-7 " style={{ fontFamily: 'CircularStd', fontWeight: 700 }}>
                            Sign up to <br />start listening
                        </h2>
                        
                        <form onSubmit={handleNext} className="mt-10">
                            <label className="text-xs" style={{ fontFamily: 'CircularStd', fontWeight: 900 }}>Email address</label><br />
                            <input type="text" placeholder="name@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} className="border-[0.1rem] rounded-[4px] p-3 w-[100%] mt-1 border-[#818181]" />
                            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                            <button type="submit" className="w-[100%] text-center p-3 bg-[#1ed760] text-black rounded-full mt-5" style={{ fontFamily: 'CircularStd', fontWeight: 800 }}>
                                Next
                            </button>
                        </form>

                        <div className="relative flex items-center my-8">
                            <div className="flex-grow border-t border-[#818181]"></div>
                            <span className="mx-4 text-xs">or</span>
                            <div className="flex-grow border-t border-[#818181]"></div>
                        </div>

                        <div className="space-y-4">
                            <GoogleLogin
                                onSuccess={async (credentialResponse) => {
                                    try {
                                        const res = await api.post("/auth/google-auth", {
                                            credential: credentialResponse.credential,
                                        });
                                        localStorage.setItem("accessToken", res.data.token);
                                        dispatch(setUser(res.data.user));
                                        dispatch(setAuth(true));
                                        localStorage.removeItem("view");
                                        navigate("/");
                                    } catch (error) {
                                        console.error(error.response?.data?.message || "Google login failed");
                                    }
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                type="standard"
                                size="large"
                                width="370"
                                text="continue_with"
                                shape="pill"
                            />
                        </div>

                        <hr className="text-[#818181] my-8" />

                        <div className="text-[#818181] text-center" style={{ fontFamily: 'CircularStd', fontWeight: 400 }}>
                            Already have an account?<Link to='/login' className="underline text-white">Log in here</Link>
                        </div>

                        <div className="text-[13px] text-[#818181] text-center my-5" style={{ fontFamily: 'CircularStd', fontWeight: 500 }}>
                            This site is protected by reCAPTCHA and the Google <br />
                            <a href="https://policies.google.com/privacy" className="underline">Privacy Policy</a> and <a href="https://policies.google.com/terms" className="underline">Terms of Service</a> apply.
                        </div>
                    </div>
                </div>
            )}

            { view === 2 && (
                <div className='bg-[#121212] min-h-screen pt-8 flex flex-col justify-center items-center text-white'  style={{ fontFamily: 'CircularStd', fontWeight: 700 }}>
                    <div>
                        <div className="flex justify-center">
                            <img src={Logo} alt="Logo" className="w-10 h-10 " />
                        </div>
                        <div className=' flex justify-center'>
                            <div className='relative text-white my-8 flex justify-center'>
                                <div className='absolute border-1 w-100 border-[#818181]'></div>
                                <div className='absolute border-1 w-50 border-green-400 right-0'></div>
                            </div>
                        </div>
                        <div className='flex w-[400px] items-center gap-1.5'>
                            <button onClick={goBack}>
                                <IoIosArrowBack size={33} className='text-zinc-400' />
                            </button>
                            <div>
                                <div className="text-zinc-400"  style={{ fontFamily: 'CircularStd', fontWeight: 400 }}>Step 1 of 2</div>
                                <div className="g">Create a password</div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center my-6'>
                            <form onSubmit={handlePasswordNext}>
                                <label className="text-[14px]" style={{ fontFamily: 'CircularStd', fontWeight: 900 }}>Password</label><br />
                                <div className='relative flex w-[300px] mb-2'>
                                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="border-[0.1rem] rounded-[4px] p-3 w-[100%] mt-1 border-[#818181]" />
                                    <div className="absolute right-2 top-[40%]" onClick={() => setShowPassword((prev) => !prev)}>
                                        {showPassword ?  <FaEye size={20} /> : <FaEyeSlash size={20} />}
                                    </div>
                                </div>
                                <label htmlFor="" className='text-sm '>Your password must contain at least</label><br />

                                <CustomCheckbox checked={hasLetter} label="1 letter" />
                                <CustomCheckbox checked={hasNumberOrSpecial} label="1 number or special character (example: # ? ! &)" />
                                <CustomCheckbox checked={hasMinLength} label="10 characters" />

                                <button type="submit" className="w-[100%] text-center p-3 bg-[#1ed760] text-black rounded-full mt-5" style={{ fontFamily: 'CircularStd', fontWeight: 800 }}>
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
            )}

            { view === 3 && (
                <div className='bg-[#121212] min-h-screen pt-8 flex flex-col justify-center items-center text-white' >
                    <div>
                        <div className="flex justify-center">
                            <img src={Logo} alt="Logo" className="w-10 h-10 " />
                        </div>
                        <div className=' flex justify-center'>
                            <div className='relative text-white my-8 flex justify-center'>
                                <div className='absolute border-1 w-100 border-[#818181]'></div>
                                <div className='absolute border-1 w-50 border-green-400 left-0'></div>
                            </div>
                        </div>
                        <div className='flex w-[400px] items-center gap-1.5' style={{ fontFamily: 'CircularStd', fontWeight: 700 }}>
                            <button onClick={goBack}>
                                <IoIosArrowBack size={33} className='text-zinc-400' />
                            </button>
                            <div>
                                <div className="text-zinc-400"  style={{ fontFamily: 'CircularStd', fontWeight: 400 }}>Step 2 of 2</div>
                                <div className="g">Tell us about yourself</div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center my-6">
                            <form action="" onSubmit={handleRegister}>
                                <label className="text-[14px] block" style={{ fontFamily: 'CircularStd', fontWeight: 900 }}>Name</label>
                                <span className="text-[13px] font-light block text-zinc-400" style={{ fontFamily: 'CircularStd', fontWeight: 500 }}>This name will appear on your profile</span>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border-1 p-2 w-[320px] mt-2 rounded-sm border-[#818181]" />

                                <label className="text-[14px] block mt-5" style={{ fontFamily: 'CircularStd', fontWeight: 900 }}>Date of birth</label>
                                <div  className=" flex gap-2">
                                    <input type="text" inputMode="numeric" placeholder="yyyy" maxlength={4}  value={dobYear} onChange={(e) => setDobYear(e.target.value)} className="border-1 p-2 w-[90px] mt-1 rounded-sm border-[#818181] no-spinner" />
                                    <select
                                        value={dobMonth}
                                        onChange={(e) => setDobMonth(e.target.value)}
                                        className="border p-2 w-[155px] mt-1 rounded-sm border-[#818181] text-white bg-[#121212]"
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
                                    <input type="text" inputMode="numeric" maxlength={2} placeholder="dd" value={dobDay} onChange={(e) => setDobDay(e.target.value)} className="border-1 p-2 w-[60px] mt-1 rounded-sm border-[#818181]" />
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
                                                name="gender"
                                                value="Man"
                                                checked={gender === "Man"}
                                                onChange={(e) => setGender(e.target.value)}
                                                className="peer hidden"
                                            />
                                            <div className="w-4 h-4 hover:border-green-400 rounded-full border-1 border-[#818181] bg-transparent peer-checked:bg-black peer-checked:border-4 peer-checked:border-green-500 transition-all"></div>
                                            <span className="ml-2 text-white">Man</span>
                                        </label>

                                        <label className="flex items-center w-fit cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Woman"
                                                checked={gender === "Woman"}
                                                onChange={(e) => setGender(e.target.value)}
                                                className="peer hidden"
                                            />
                                            <div className="w-4 h-4 hover:border-green-400 rounded-full border-1 border-[#818181] bg-transparent peer-checked:bg-black peer-checked:border-4 peer-checked:border-green-500 transition-all"></div>
                                            <span className="ml-2 text-white">Woman</span>
                                        </label>

                                        <label className="flex items-center w-fit cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Non-binary"
                                                checked={gender === "Non-binary"}
                                                onChange={(e) => setGender(e.target.value)}
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
                                                name="gender"
                                                value="Something else"
                                                checked={gender === "Something else"}
                                                onChange={(e) => setGender(e.target.value)}
                                                className="peer hidden"
                                            />
                                            <div className="w-4 h-4 hover:border-green-400 rounded-full border-1 border-[#818181] bg-transparent peer-checked:bg-black peer-checked:border-4 peer-checked:border-green-500 transition-all"></div>
                                            <span className="ml-2 text-white">Something else</span>
                                        </label>

                                        <label className="flex items-center w-fit cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Prefer not to say"
                                                checked={gender === "Prefer not to say"}
                                                onChange={(e) => setGender(e.target.value)}
                                                className="peer hidden"
                                            />
                                            <div className="w-4 h-4 hover:border-green-400 rounded-full border-1 border-[#818181] bg-transparent peer-checked:bg-black peer-checked:border-4 peer-checked:border-green-500 transition-all"></div>
                                            <span className="ml-2 text-white">Prefer not to say</span>
                                        </label>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="w-[100%] text-center p-3 bg-[#1ed760] text-black rounded-full mt-12" style={{ fontFamily: 'CircularStd', fontWeight: 800 }}>
                                    Sign up
                                </button>
                            </form>

                            <div className="text-[13px] text-[#818181] text-center mt-7" style={{ fontFamily: 'CircularStd', fontWeight: 500 }}>
                                This site is protected by reCAPTCHA and the Google <br />
                                <a href="https://policies.google.com/privacy" className="underline">Privacy Policy</a> and <a href="https://policies.google.com/terms" className="underline">Terms of Service</a> apply.
                            </div>
                        </div>
                        
                    </div>
                </div>
            )}

        </>
    );
};

export default Sigup;


