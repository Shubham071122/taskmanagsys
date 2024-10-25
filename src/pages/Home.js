import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-indigo-100'>
      <div className='w-96 mx-auto flex flex-col justify-center items-center'>
        <h2 className="text-xl font-bold">Home page</h2>
        <div className='flex items-center gap-4 mt-4'>
          <NavLink to="/login" className="px-4 py-2 bg-violet-700 text-white font-semibold text-base rounded-md">LogIn</NavLink>
          <NavLink to="/signup" className="px-4 py-2 bg-blue-700 text-white font-semibold text-base rounded-md">SignUp</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home;
