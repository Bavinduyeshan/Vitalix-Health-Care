// src/context/AuthProvider.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx'; // Import from the new file

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && !userId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:8080/users/api/user/me', {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserId(data.id);
          } else {
            console.error("Failed to fetch user data, keeping token:", response.status);
            // Avoid clearing token or redirecting
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Avoid clearing token or redirecting
        }
      };
      fetchUserData();
    }
  }, [token, userId, navigate]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUserId(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};