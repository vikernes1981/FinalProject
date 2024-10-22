import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user data, for example, from localStorage or API
    const token = localStorage.getItem('authToken');
    if (token) {
      // Assuming you have decoded the token or fetched user info from the API
      const userInfo = {
        isAdmin: true, // Change this based on actual data
        name: 'Admin User',
        email: 'admin@example.com',
      };
      setUser(userInfo); // Set the user information with isAdmin flag
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
