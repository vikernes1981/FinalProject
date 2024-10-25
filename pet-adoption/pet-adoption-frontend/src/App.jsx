import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import AdoptionRequestForm from './components/AdoptionRequestForm';
import AuthProvider from './context/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './components/AdminDashboard';
import TierheimDetails from './pages/TierheimDetails';
import ChatBotComponent from './components/ChatBotComponent';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.role === 'Admin') {
        setIsAdmin(true);
      }
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/adopt/:id" element={<AdoptionRequestForm />} />
          <Route path="/tierheim/:placeId" element={<TierheimDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/pet-list" element={<PetList />} />
          <Route path="/food-recommendation" element={<FoodRecommendation />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        {/* ChatBotComponent here makes it appear globally */}
        <ChatBotComponent />
      </Router>
    </AuthProvider>
  );
}

export default App;
