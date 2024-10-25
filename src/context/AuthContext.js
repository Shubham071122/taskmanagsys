import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log(process.env.REACT_APP_SERVER_URL);
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/user/check-auth`,
          { withCredentials: true },
        );

        // console.log("chkres:",response);
        if (response.data.success === true) {
          setIsAuthenticated(true);
          setUser(response.data.user);
          // navigate('/dd');
        } else {
          setIsAuthenticated(false);
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/login`,
        { email, password },
        {
          withCredentials: true,
        },
      );
      console.log("res:",response);
      if (response.data.statusCode === 200) {
        console.log("jfslfjs")
        setIsAuthenticated(true);
        setUser(response.data.data.user);
        // navigate('/dd');
      }
      return response.data;
    } catch (err) {
      console.error('Login failed:', err);
      setIsAuthenticated(false);
    }
  };

  const registerUser = async (fullName, email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/signup`,
        { fullName, email, password },
      );
      if (response.data.statusCode === 200) {
        setUser(response.data.data.user);
      }
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/logout`,
        {},
        { withCredentials: true },
      );
      if (response.status === 200) {
        setIsAuthenticated(false);
        setUser(null);
      }
      return response.status;
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isAuthenticated, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
