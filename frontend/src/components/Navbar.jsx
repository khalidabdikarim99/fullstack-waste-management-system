// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, ExpandMore } from '@mui/icons-material';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState('');

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? '' : menu);
  };

  const closeDropdown = () => {
    setOpenDropdown('');
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Custom Styled Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center space-x-1">
          <span className="text-green-500">Waste</span>
          <span className="text-red-500">2</span>
          <span className="text-green-500">Wealth</span>
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-green-400">Home</Link>
          <Link to="/about" className="hover:text-green-400">About</Link>

          {/* Services Dropdown */}
          <div className="relative group">
            <button onClick={() => toggleDropdown('services')} className="flex items-center hover:text-green-400">
              Services <ExpandMore fontSize="small" />
            </button>
            {openDropdown === 'services' && (
              <div className="absolute left-0 mt-2 bg-gray-800 rounded shadow-md z-10">
                <Link to="/services/jobcreation" className="block px-4 py-2 hover:bg-gray-700" onClick={closeDropdown}>Job Creation</Link>
                <Link to="/services/training" className="block px-4 py-2 hover:bg-gray-700" onClick={closeDropdown}>Training</Link>
                <Link to="/services/upcycling" className="block px-4 py-2 hover:bg-gray-700" onClick={closeDropdown}>Upcycling</Link>
                <Link to="/services/collection" className="block px-4 py-2 hover:bg-gray-700" onClick={closeDropdown}>Collection</Link>
              </div>
            )}
          </div>

          {/* Startup Dropdown */}
          <div className="relative group">
            <button onClick={() => toggleDropdown('startup')} className="flex items-center hover:text-green-400">
              Startup <ExpandMore fontSize="small" />
            </button>
            {openDropdown === 'startup' && (
              <div className="absolute left-0 mt-2 bg-gray-800 rounded shadow-md z-10">
                <Link to="/startup/brick" className="block px-4 py-2 hover:bg-gray-700" onClick={closeDropdown}>Brick</Link>
                <Link to="/startup/diy" className="block px-4 py-2 hover:bg-gray-700" onClick={closeDropdown}>DIY</Link>
              </div>
            )}
          </div>

          {/* Trash Academy Dropdown */}
          <div className="relative group">
            <button onClick={() => toggleDropdown('academy')} className="flex items-center hover:text-green-400">
              Trash Academy <ExpandMore fontSize="small" />
            </button>
            {openDropdown === 'academy' && (
              <div className="absolute left-0 mt-2 bg-gray-800 rounded shadow-md z-10">
                <Link to="/trashacademy/videos" className="block px-4 py-2 hover:bg-gray-700" onClick={closeDropdown}>Videos</Link>
                <Link to="/trashacademy/quizzes" className="block px-4 py-2 hover:bg-gray-700" onClick={closeDropdown}>Quizzes</Link>
                <Link to="/trashacademy/tutorials" className="block px-4 py-2 hover:bg-gray-700" onClick={closeDropdown}>Tutorials</Link>
              </div>
            )}
          </div>

          <Link to="/jobs" className="hover:text-green-400">Jobs</Link>
          <Link to="/marketplace" className="hover:text-green-400">Marketplace</Link>
          <Link to="/contact" className="hover:text-green-400">Contact</Link>

          {/* Login and Signup as green buttons */}
          <Link to="/login" className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-400 transition">
            Login
          </Link>
          <Link to="/signup" className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-500 transition">
            Signup
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link to="/" className="block py-2 hover:text-green-400" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/about" className="block py-2 hover:text-green-400" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/jobs" className="block py-2 hover:text-green-400" onClick={() => setMobileMenuOpen(false)}>Jobs</Link>
          <Link to="/marketplace" className="block py-2 hover:text-green-400" onClick={() => setMobileMenuOpen(false)}>Marketplace</Link>
          <Link to="/contact" className="block py-2 hover:text-green-400" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <Link to="/login" className="block py-2 text-green-400" onClick={() => setMobileMenuOpen(false)}>Login</Link>
          <Link to="/signup" className="block py-2 text-green-500" onClick={() => setMobileMenuOpen(false)}>Signup</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
