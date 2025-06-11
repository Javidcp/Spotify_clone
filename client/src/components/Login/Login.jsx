import Logo from "../../assets/spotify_icon-white.png"
import { GoogleLogin } from '@react-oauth/google';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from "../../utils/axios"
import { useNavigate } from "react-router-dom";

import OTPInput from 'react-otp-input';
import { useDispatch } from "react-redux";
import { setUser, setAuth } from "../../redux/authSlice";
import { toast } from 'react-toastify';



const Login = () => {

    const [view, setView] = useState(() => {
        return Number(localStorage.getItem("view")) || 1;
    });

    useEffect(() => {
        localStorage.setItem("view", view);
    }, [view]);

    const navigate = useNavigate()
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()
    const [password, setPassword] = useState("")

    const masked = maskEmail(email)



    const handleOtp = async () => {
        if (!email) return toast.error("Please enter email");

        try {
            await api.post('/otp/send-otp', { email });
            setView(2);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to send OTP");
        }
    }

    const verifyOtp = async () => {
        if (otp.length !== 6) return toast.error("Enter full OTP");

        try {
            const res = await api.post('/otp/verify-otp', { email, otp });

            toast.success(res.data.message);

            localStorage.setItem("accessToken", res.data.token);

            dispatch(setUser(res.data.user));
            dispatch(setAuth(true));

            localStorage.removeItem("view");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "OTP verification failed");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        const res = await api.post("/auth/login", {
            email,
            password,
        });

        localStorage.setItem("accessToken", res.data.token);
        dispatch(setUser(res.data.user));
        dispatch(setAuth(true));

        localStorage.removeItem("view");
        navigate("/");
        } catch (err) {
        toast.error(err.response?.data?.message || "Login failed");
        }
    };



    return (
        <>
            { view === 1 && (
                <div style={{background: "linear-gradient(0deg, black, #1F1F1F 80%)"}} className='pt-5 text-white flex flex-col items-center justify-center'>
                    <div className='md:w-[700px]  p-4 rounded-xl text-center flex flex-col items-center'  style={{background: "linear-gradient(0deg,  #1F1F1F, black 30%)"}} >
                        <div className="flex justify-center">
                            <img src={Logo} alt="Logo" className="w-10 h-10" />
                        </div>
                        <h2 className="text-4xl my-8" style={{ fontFamily: 'CircularStd', fontWeight: 700 }}>Log in to Spotify</h2>
                        <GoogleLogin
                                onSuccess={async (credentialResponse) => {
                                    try {
                                        const res = await api.post("/auth/google-auth", {
                                            credential: credentialResponse.credential,
                                        });
                                        
                                        localStorage.setItem("accessToken", res.data.token);

                                        dispatch(setUser(res.data.user));
                                        dispatch(setAuth(true));

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
                                width="320"
                                text="continue_with"
                                shape="pill"
                            />

                        <hr className="w-[80%] my-8 text-zinc-800" />

                        <form action="" className="my-5 text-left">
                            <label htmlFor="" className="text-xs" style={{ fontFamily: 'CircularStd', fontWeight: 900 }}>Email address</label><br />
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com" className="border-[0.1rem] rounded-[4px] p-3 w-[100%] mt-1 border-[#818181]" />
                            <button onClick={handleOtp} type="submit" className="w-[100%] text-center p-3 bg-[#1ed760] text-black rounded-full mt-5"  style={{ fontFamily: 'CircularStd', fontWeight: 800 }}>
                                Continue
                            </button>
                        </form>

                        <div className="text-[#818181] text-center"  style={{ fontFamily: 'CircularStd', fontWeight: 400 }}>
                            Don't have an account? <Link to='/signup' className="underline text-white">Sign up for Spotify</Link>
                        </div>

                    </div>
                    <div className="text-[#818181] bg-[#1F1F1F] mt-8 w-full text-center p-5 text-xs">
                        This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy"  className="underline">Privacy Policy</a> and <a href="https://policies.google.com/terms"  className="underline">Terms of Service</a> apply.
                    </div>
                </div>
            )}

            { view === 2 && (
                <div className='bg-[#121212] h-screen flex justify-between py-4 px-8'>
                    <img src={Logo} className='w-6 h-6' alt="" />
                    <div className="flex flex-col items-center  w-fit py-16">
                        <p className="text-white text-2xl mb-8" style={{ fontFamily: 'CircularStd', fontWeight: 900 }}>
                            Enter the 6-digit code sent to <br />
                            you at {masked}.</p>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                            <input
                                {...props}
                                style={{width: "46px"}}
                                className=" h-[54px] text-center text-white bg-[#121212] border border-[#818181] rounded-md mx-[6px] text-2xl focus:outline-none focus:ring-1 focus:border-white caret-transparent"
                            />
                            )}
                        />
                        <button
                            className="mt-4 text-white bg-transparent border border-[#818181] px-3 py-1 rounded-full text-sm"
                            style={{ fontFamily: 'CircularStd', fontWeight: 900 }}
                            onClick={() => {
                                toast.info('Otp resended');
                                handleOtp()
                            }}
                        >
                            Resend code
                        </button>

                        <button onClick={verifyOtp} className='w-full p-3 bg-green-500 rounded-full my-10'  style={{ fontFamily: 'CircularStd', fontWeight: 900 }}>
                            Login
                        </button>

                        <Link onClick={() => setView(3)} className='text-white mt-2' style={{ fontFamily: 'CircularStd', fontWeight: 900 }}>Log in with a password</Link>
                    </div>
                    <div></div>
                </div>
            )}

            { view === 3 && (
                <div style={{background: "linear-gradient(0deg, black, #1F1F1F 80%)"}} className='pt-5 text-white flex flex-col items-center justify-center'>
                    <div className='md:w-[700px]  p-4 rounded-xl text-center flex flex-col items-center'  style={{background: "linear-gradient(0deg,  #1F1F1F, black 30%)"}} >
                        <div className="flex justify-center">
                            <img src={Logo} alt="Logo" className="w-10 h-10" />
                        </div>
                        <h2 className="text-4xl my-8" style={{ fontFamily: 'CircularStd', fontWeight: 700 }}>Log in to Spotify</h2>
                        <GoogleLogin
                                onSuccess={async (credentialResponse) => {
                                    try {
                                        const res = await api.post("/auth/google-auth", {
                                            credential: credentialResponse.credential,
                                        });
                                        
                                        localStorage.setItem("accessToken", res.data.token);

                                        dispatch(setUser(res.data.user));
                                        dispatch(setAuth(true));

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
                                width="320"
                                text="continue_with"
                                shape="pill"
                            />

                        <hr className="w-[80%] my-8 text-zinc-800" />

                        <form action="" className="my-5 w-[330px] text-left">
                            <label htmlFor="" className="text-xs" style={{ fontFamily: 'CircularStd', fontWeight: 900 }}>Email address</label><br />
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com" className="border-[0.1rem] rounded-[4px] p-3 w-[100%] mt-1 border-[#818181]" />
                            <label htmlFor="" className="text-xs" style={{ fontFamily: 'CircularStd', fontWeight: 900 }}>Password</label>
                            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" className="border-[0.1rem] rounded-[4px] p-3 w-[100%] mt-1 border-[#818181]" />
                            <button onClick={handleLogin} type="submit" className="w-[100%] text-center p-3 bg-[#1ed760] text-black rounded-full mt-5"  style={{ fontFamily: 'CircularStd', fontWeight: 800 }}>
                                Sign in
                            </button>
                        </form>
                        <div>
                            <button className="underline mb-5"  onClick={() => setView(1)}>
                                Login without password
                            </button>
                        </div>

                        <div className="text-[#818181] text-center"  style={{ fontFamily: 'CircularStd', fontWeight: 400 }}>
                            Don't have an account? <Link to='/signup' className="underline text-white">Sign up for Spotify</Link>
                        </div>

                    </div>
                    <div className="text-[#818181] bg-[#1F1F1F] mt-8 w-full text-center p-5 text-xs">
                        This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy"  className="underline">Privacy Policy</a> and <a href="https://policies.google.com/terms"  className="underline">Terms of Service</a> apply.
                    </div>
                </div>
            )}
        </>
    )
}

export default Login


function maskEmail(email) {
    if (!email || !email.includes('@')) return '';

    const [user, domain] = email.split('@');
    const maskedUser = user.length > 2
        ? user[0] + '*'.repeat(user.length - 2) + user[user.length - 1]
        : user[0] + '*';

    const [domainName, domainExt] = domain.split('.');
    const maskedDomain = domainName.length > 2
        ? domainName[0] + '*'.repeat(domainName.length - 2) + domainName[domainName.length - 1]
        : domainName[0] + '*';

    return `${maskedUser}@${maskedDomain}.${domainExt}`;
}