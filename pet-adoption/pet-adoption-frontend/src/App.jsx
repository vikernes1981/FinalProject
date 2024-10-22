import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Import useState and useEffect to manage auth state
import PetList from './components/PetList';
import AboutUs from './pages/AboutUs';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import PetDetails from './components/PetDetails';
import QuizPage from './pages/QuizPage';
import ForgotPassword from './pages/ForgotPassword';
import ContactUs from './pages/ContactUs';
import FoodRecommendation from './pages/FoodRecommendation';
import Dashboard from './pages/Dashboard';
import AdoptionRequestForm from './components/AdoptionRequestForm';
import AuthProvider from './context/AuthProvider'; // Import AuthProvider
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state

  useEffect(() => {
    // Check if user is authenticated (e.g., by checking localStorage or token)
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true); // Set authentication state based on token
    }
  }, []);

  return (
    <AuthProvider> {/* Wrap the app in AuthProvider */}
      <Router>
        <Navbar /> {/* Navbar is displayed on all pages */}
        
        {/* Add ToastContainer here to show notifications across the app */}
        <ToastContainer />

        <Routes>
          {/* Home Route */}
          <Route path="/" element={<HomePage />} />

          {/* Pet Details Route */}
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/adopt/:id" element={<AdoptionRequestForm />} />

          {/* Other Pages */}
          <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} /> {/* Pass setAuth prop */}
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/pet-list" element={<PetList />} />
          <Route path="/food-recommendation" element={<FoodRecommendation />} />

          {/* Quiz Route */}
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Forgot Password Route */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
