// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, ExpandMore, Person } from '@mui/icons-material';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState('');
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? '' : menu);
  };

  const closeDropdown = () => {
    setOpenDropdown('');
  };

  const toggleLoginDropdown = () => {
    setLoginDropdownOpen(!loginDropdownOpen);
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

          {/* Login Dropdown */}
          <div className="relative group">
            <button 
              onClick={toggleLoginDropdown} 
              className="flex items-center bg-green-500 text-white px-4 py-1 rounded hover:bg-green-400 transition"
            >
              <Person className="mr-1" fontSize="small" />
              Login
              <ExpandMore fontSize="small" />
            </button>
            {loginDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gray-800 rounded shadow-md z-10 w-48">
                <Link 
                  to="/userlogin" 
                  className="block px-4 py-2 hover:bg-gray-700 border-b border-gray-700"
                  onClick={() => setLoginDropdownOpen(false)}
                >
                  👤 User Login
                </Link>
                <Link 
                  to="/collectorlogin" 
                  className="block px-4 py-2 hover:bg-gray-700 border-b border-gray-700"
                  onClick={() => setLoginDropdownOpen(false)}
                >
                  🚚 Collector Login
                </Link>
                <Link 
                  to="/recyclerlogin" 
                  className="block px-4 py-2 hover:bg-gray-700 border-b border-gray-700"
                  onClick={() => setLoginDropdownOpen(false)}
                >
                  ♻️ Recycler Login
                </Link>
                <Link 
                  to="/employerlogin" 
                  className="block px-4 py-2 hover:bg-gray-700 border-b border-gray-700"
                  onClick={() => setLoginDropdownOpen(false)}
                >
                  🏢 Employer Login
                </Link>
                <Link 
                  to="/adminlogin" 
                  className="block px-4 py-2 hover:bg-gray-700"
                  onClick={() => setLoginDropdownOpen(false)}
                >
                  ⚙️ Admin Login
                </Link>
              </div>
            )}
          </div>
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
          
          {/* Mobile Login Options */}
          <div className="pt-2 border-t border-gray-700 mt-2">
            <p className="text-green-400 py-2 font-semibold">Login Options:</p>
            <Link to="/userlogin" className="block py-2 pl-4 text-gray-300 hover:text-green-400" onClick={() => setMobileMenuOpen(false)}>
              👤 User Login
            </Link>
            <Link to="/collectorlogin" className="block py-2 pl-4 text-gray-300 hover:text-green-400" onClick={() => setMobileMenuOpen(false)}>
              🚚 Collector Login
            </Link>
            <Link to="/recyclerlogin" className="block py-2 pl-4 text-gray-300 hover:text-green-400" onClick={() => setMobileMenuOpen(false)}>
              ♻️ Recycler Login
            </Link>
            <Link to="/employerlogin" className="block py-2 pl-4 text-gray-300 hover:text-green-400" onClick={() => setMobileMenuOpen(false)}>
              🏢 Employer Login
            </Link>
            <Link to="/admin/login" className="block py-2 pl-4 text-gray-300 hover:text-green-400" onClick={() => setMobileMenuOpen(false)}>
              ⚙️ Admin Login
            </Link>
          </div>

          <Link to="/signup" className="block py-2 text-green-500 font-semibold mt-2" onClick={() => setMobileMenuOpen(false)}>
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;