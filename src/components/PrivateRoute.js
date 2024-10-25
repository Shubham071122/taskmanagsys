import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <div className='w-full mt-20 font-semibold text-xl flex items-center justify-center'>Loading...</div>; 

  // return children;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
