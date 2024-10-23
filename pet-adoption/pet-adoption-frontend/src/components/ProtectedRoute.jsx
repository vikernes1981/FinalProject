import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider'; // Adjust the import path
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // Use context to get authentication state
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;