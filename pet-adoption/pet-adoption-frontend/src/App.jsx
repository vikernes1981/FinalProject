import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PetList from './components/PetList';
import AboutUs from './pages/AboutUs';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import PetDetails from './components/PetDetails';
import QuizPage from './pages/QuizPage';
import ForgotPassword from './pages/ForgotPassword'; // Import ForgotPassword component
import ContactUs from './pages/ContactUs';
import FoodRecommendation from './pages/FoodRecommendation';
import AdoptionRequestForm from './components/AdoptionRequestForm';

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is displayed on all pages */}
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<HomePage />} />

        {/* Pet Details Route */}
        <Route path="/pets/:name" element={<PetDetails />} />
        <Route path="/adopt/:name" element={<AdoptionRequestForm />} />

        {/* Other Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} /> {/* Contact Us route */}
        <Route path="/pet-list" element={<PetList />} />
        <Route path="/food-recommendation" element={<FoodRecommendation />} /> {/* New Route */}
        
        {/* Quiz Route */}
        <Route path="/quiz" element={<QuizPage />} />

        {/* Forgot Password Route */}
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add ForgotPassword route */}
      </Routes>
    </Router>
  );
}

export default App;
