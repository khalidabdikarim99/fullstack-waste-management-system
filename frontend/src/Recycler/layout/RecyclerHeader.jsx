import React, { useEffect, useState } from 'react';
import { 
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Business as BusinessIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const RecyclerHeader = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.firstname);
    }
  }, []);

  const handleLogout = () => {
    // Clear both storage locations
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to home page
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
            placeholder="Search shipments or orders..."
          />
        </div>

        <div className="flex items-center space-x-6">
          <button className="relative text-gray-500 hover:text-gray-700">
            <NotificationsIcon />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
              <BusinessIcon />
            </div>
            <span className="text-sm font-medium">{userName || 'Recycler'}</span>
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

export default RecyclerHeader;
