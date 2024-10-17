import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PetList from './components/PetList';
import AboutUs from './pages/AboutUs';
import HomePage from './pages/HomePage';
import Navbar from './components/navbar';
import Login from './pages/Login';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navbar />} />
        <Route path="/" element={<PetList />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
