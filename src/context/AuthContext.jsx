// // src/context/AuthContext.jsx
// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem('token') || null);
//   const [userId, setUserId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token && !userId) {
//       const fetchUserData = async () => {
//         try {
//           const response = await fetch('http://localhost:8080/users/api/user/me', {
//             headers: {
//               "Authorization": `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           });
//           if (response.ok) {
//             const data = await response.json();
//             setUserId(data.id);
//           } else {
//             localStorage.removeItem('token');
//             setToken(null);
//             navigate('/login');
//           }
//         } catch (error) {
//           localStorage.removeItem('token');
//           setToken(null);
//           navigate('/login');
//         }
//       };
//       fetchUserData();
//     }
//   }, [token, userId, navigate]);

//   const login = (newToken) => {
//     localStorage.setItem('token', newToken);
//     setToken(newToken);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUserId(null);
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ token, userId, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




// src/context/AuthContext.jsx
// src/context/AuthContext.jsx
// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Internal context instance
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,
    userId: null
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (token) {
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: true,
        userRole: role
      }));
    }
  }, []);

  const login = (token, role, id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", role);
    setAuthState({
      isAuthenticated: true,
      userRole: role,
      userId: id
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setAuthState({
      isAuthenticated: false,
      userRole: null,
      userId: null
    });
  };

  const value = {
    ...authState,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}