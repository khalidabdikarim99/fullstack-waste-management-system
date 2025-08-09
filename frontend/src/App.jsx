// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer'; // ✅ Added Footer import

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Jobs from './pages/Jobs';
import Marketplace from './pages/Marketplace';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Services
import JobCreation from './pages/Services/JobCreation';
import Training from './pages/Services/Training';
import Upcycling from './pages/Services/Upcycling';
import Collection from './pages/Services/Collection';

// Startup
import Brick from './pages/Startup/Brick';
import DIY from './pages/Startup/DIY';

// Trash Academy
import Videos from './pages/TrashAcademy/Videos';
import Quizzes from './pages/TrashAcademy/Quizzes';
import Tutorials from './pages/TrashAcademy/Tutorials';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Services */}
          <Route path="/services/jobcreation" element={<JobCreation />} />
          <Route path="/services/training" element={<Training />} />
          <Route path="/services/upcycling" element={<Upcycling />} />
          <Route path="/services/collection" element={<Collection />} />

          {/* Startup */}
          <Route path="/startup/brick" element={<Brick />} />
          <Route path="/startup/diy" element={<DIY />} />

          {/* Trash Academy */}
          <Route path="/trashacademy/videos" element={<Videos />} />
          <Route path="/trashacademy/quizzes" element={<Quizzes />} />
          <Route path="/trashacademy/tutorials" element={<Tutorials />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
