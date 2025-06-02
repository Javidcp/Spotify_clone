// // import { useGoogleLogin } from '@react-oauth/google';
// // import api from "../../utils/axios"
// // import { useNavigate } from 'react-router-dom';

// // const CustomGoogleLogin = () => {
// //     const navigate = useNavigate();

// //     const login = useGoogleLogin({
// //         onSuccess: async (tokenResponse) => {
// //         try {
// //             const res = await api.post("/auth/google-auth", {
// //             credential: tokenResponse.credential || tokenResponse.access_token,
// //             });
// //             console.log(res.data);
// //             localStorage.setItem("token", res.data.token);
// //             navigate("/");
// //         } catch (error) {
// //             console.error(error.response?.data?.message || "Google login failed");
// //         }
// //         },
// //         onError: () => {
// //         console.log("Login Failed");
// //         },
// //         flow: 'implicit',
// //     });

// //     return (
// //         <button
// //         onClick={() => login()}
// //         className="bg-white border border-gray-300 text-black px-6 py-2 rounded-full hover:shadow-md flex items-center gap-2"
// //         >
// //         <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
// //         Continue with Google
// //         </button>
// //     );
// // };

// // export default CustomGoogleLogin;




// import { useEffect } from "react";
// // import jwt_decode from "jwt-decode";
// import api from "../../utils/axios";
// import { useNavigate } from "react-router-dom";

// const CLIENT_ID="563487842362-emj4r4uf0335oq5h56dfnu8a65ogb36m.apps.googleusercontent.com"

// const CustomGoogleButton = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (window.google) {
//       window.google.accounts.id.initialize({
//         client_id: CLIENT_ID,
//         callback: async (response) => {
//           try {
//             const res = await api.post("/auth/google-auth", {
//               credential: response.credential, // ID token (JWT)
//             });
//             console.log(res.data);
//             localStorage.setItem("token", res.data.token);
//             navigate("/");
//           } catch (error) {
//             console.error(error.response?.data?.message || "Google login failed");
//           }
//         },
//       });
//     }
//   }, []);

//   const handleGoogleLogin = () => {
//     if (window.google) {
//       window.google.accounts.id.prompt(); // shows popup
//     }
//   };

//   return (
//     <button
//       onClick={handleGoogleLogin}
//       className="bg-white border border-gray-300 text-black px-6 py-2 rounded-full hover:shadow-md flex items-center gap-2"
//     >
//       <img
//         src="https://developers.google.com/identity/images/g-logo.png"
//         alt="Google"
//         className="w-5 h-5"
//       />
//       Continue with Google
//     </button>
//   );
// };

// export default CustomGoogleButton;
