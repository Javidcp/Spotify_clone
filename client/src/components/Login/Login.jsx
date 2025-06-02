import Logo from "../../assets/spotify_icon-white.png"
import { GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div style={{background: "linear-gradient(0deg, black, #1F1F1F 80%)"}} className='pt-5 text-white flex flex-col items-center justify-center'>
            <div className='md:w-[700px]  p-4 rounded-xl text-center flex flex-col items-center'  style={{background: "linear-gradient(0deg,  #1F1F1F, black 30%)"}} >
                <div className="flex justify-center">
                    <img src={Logo} alt="Logo" className="w-10 h-10" />
                </div>
                <h2 className="text-4xl my-8" style={{ fontFamily: 'CircularStd', fontWeight: 700 }}>Log in to Spotify</h2>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    theme="outline"
                    size="large"
                    width="300"
                    text="continue_with"
                    shape="pill"
                />

                <hr className="w-[80%] my-8 text-zinc-800" />

                <form action="" className="my-5 text-left">
                    <label htmlFor="" className="text-xs" style={{ fontFamily: 'CircularStd', fontWeight: 900 }}>Email address</label><br />
                    <input type="text" placeholder="name@domain.com" className="border-[0.1rem] rounded-[4px] p-3 w-[100%] mt-1 border-[#818181]" />
                    <button type="submit" className="w-[100%] text-center p-3 bg-[#1ed760] text-black rounded-full mt-5"  style={{ fontFamily: 'CircularStd', fontWeight: 800 }}>
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
    )
}

export default Login