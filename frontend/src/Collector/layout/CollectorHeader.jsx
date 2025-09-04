import React, { useEffect, useState } from 'react';
import { 
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  DirectionsBike as BikeIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CollectorHeader = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check sessionStorage first, then localStorage
    const storedUser = sessionStorage.getItem('user') || localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.name) {
          setUserName(user.name); // ✅ backend sends "name"
        } else if (user?.first_name && user?.last_name) {
          setUserName(user.first_name + ' ' + user.last_name); // fallback if exists
        }
      } catch (err) {
        console.error("Error parsing stored user:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear everything on logout
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="relative w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Search pickups or locations..."
          />
        </div>

        <div className="flex items-center space-x-6">
          <button className="relative text-gray-500 hover:text-gray-700">
            <NotificationsIcon />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
              <BikeIcon fontSize="small" />
            </div>
            <span className="text-sm font-medium">{userName || 'Collector'}</span>
          </div>

          <button 
            onClick={handleLogout} 
            className="text-gray-500 hover:text-red-500 flex items-center space-x-1"
          >
            <LogoutIcon fontSize="small" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default CollectorHeader;
