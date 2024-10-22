import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Safely retrieve and parse user data from localStorage
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser)); // Only parse if the data is valid
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
          localStorage.removeItem('user'); // Optionally remove invalid data
        }
      }
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
