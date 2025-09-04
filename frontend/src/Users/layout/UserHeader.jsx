import React, { useEffect, useState } from 'react';
import { 
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // ✅ Get user from localStorage or sessionStorage
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);

        // ✅ Prefer full name field if available
        let name = user.name;

        // ✅ Otherwise, try constructing from first/last names
        if (!name) {
          name =
            [user.firstName, user.lastName, user.first_name, user.last_name]
              .filter(Boolean)
              .join(' ');
        }

        // ✅ If still not found, fallback to username/email
        setUserName(name || user.username || user.email || 'User');
      } catch (err) {
        console.error("Invalid user data in storage:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // 🔎 later you can navigate or call backend with query
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Search..."
          />
        </form>
        
        {/* Right Side Icons */}
        <div className="flex items-center space-x-6">
          <button className="relative text-gray-500 hover:text-gray-700">
            <NotificationsIcon />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
              <AccountIcon />
            </div>
            <span className="text-sm font-medium">{userName || 'User Name'}</span>
          </div>
          
          <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 flex items-center space-x-1">
            <LogoutIcon fontSize="small" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
