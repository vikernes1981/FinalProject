import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider'; // Adjust the import path
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log('Is Authenticated:', isAuthenticated); // Add this line for debugging
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
