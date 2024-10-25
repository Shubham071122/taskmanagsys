import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <h2 className='w-full text-center text-2xl font-bold py-4'>Task Management System</h2>
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 p-6 pb-20 bg-purple-50 overflow-y-auto">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
