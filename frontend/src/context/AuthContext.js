import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = process.env.REACT_APP_API_URL; // Base URL from .env

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Load user function
  const loadUser = useCallback(async () => {
    if (!token) return setLoading(false); // Extra safety
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_URL}/api/auth/me`, config);
      setUser(response.data.data.user);
    } catch (error) {
      console.error('Load user error:', error);
      logout();
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Run loadUser on mount or when token changes
  useEffect(() => {
    loadUser();
  }, [token, loadUser]);

  // Login
  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    });
    const { token: newToken, user: newUser } = response.data.data;
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    return response.data;
  };

  // Register
  const register = async (name, email, password) => {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      name,
      email,
      password,
    });
    const { token: newToken, user: newUser } = response.data.data;
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    return response.data;
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};