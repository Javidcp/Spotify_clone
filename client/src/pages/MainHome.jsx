import React from 'react'

const MainHome = () => {
    return (
        <div className='bg-[#1F1F1F] text-white rounded-xl h-[100%]'>
            <MyComponent/>
        </div>
    )
}

import { useSelector } from "react-redux";

const MyComponent = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  console.log("Redux user:", user);
  console.log("Authenticated:", isAuthenticated);

  return (
    <div>
      {isAuthenticated ? `Hello, ${user.username}` : "Not logged in"}
    </div>
  );
};


export default MainHome