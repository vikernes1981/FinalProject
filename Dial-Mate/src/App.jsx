// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Conversations from './pages/Conversations';
import Reminders from './pages/Reminders';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-6 bg-gray-900 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/conversations" element={<Conversations />} />
          <Route path="/reminders" element={<Reminders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
