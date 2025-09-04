import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon,
  Person as ProfileIcon,
  Assignment as RequestsIcon,
  Place as LocationIcon,
  Route as RouteIcon,
  MonetizationOn as EarningsIcon,
  Notifications as NotificationsIcon,
  History as HistoryIcon,
  Chat as CommunicationIcon,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';

const CollectorSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <HomeIcon />, path: '/collector/dashboard' },
    { name: 'Profile', icon: <ProfileIcon />, path: '/collector/profile' },
    { name: 'Pickup Management', icon: <RequestsIcon />, path: '/collector/pickups' },
    { name: 'Dropoff Points', icon: <LocationIcon />, path: '/collector/dropoffpoints' },
    { name: 'Routes & Schedule', icon: <RouteIcon />, path: '/collector/schedule' },
    { name: 'Earnings', icon: <EarningsIcon />, path: '/collector/earnings' },
    { name: 'History', icon: <HistoryIcon />, path: '/collector/history' },
    { name: 'Notifications', icon: <NotificationsIcon />, path: '/collector/notifications' },
    { name: 'Communication', icon: <CommunicationIcon />, path: '/collector/communication' }
  ];

  return (
    <div className={`bg-gray-800 text-white h-screen flex flex-col ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 ease-in-out`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-1">
            <span className="text-green-500 font-bold">Waste</span>
            <span className="text-red-500 font-bold">2</span>
            <span className="text-green-500 font-bold">Wealth</span>
            <span className="text-sm text-gray-400">Collector</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center p-3 rounded-lg hover:bg-gray-700 ${location.pathname === item.path ? 'bg-gray-700 text-green-400' : 'text-gray-400'}`}
          >
            <span className="mr-3">{item.icon}</span>
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-700">
        {!isCollapsed ? (
          <div className="text-center text-gray-400 text-sm">
            v1.0.0
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="text-gray-400 text-xs">v1.0.0</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectorSidebar;
