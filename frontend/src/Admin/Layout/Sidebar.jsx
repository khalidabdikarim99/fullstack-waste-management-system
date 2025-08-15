import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  LocationOn as LocationIcon,
  Store as StoreIcon,
  Equalizer as AnalyticsIcon,
  Description as ContentIcon,
  CardGiftcard as RewardsIcon,
  Support as SupportIcon,
  Security as AdminIcon,
  ChevronLeft,
  ChevronRight,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState('');
  const location = useLocation();

  const toggleMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? '' : menu);
  };

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/admin/dashboard'
    },
    {
      name: 'Manage Users',
      icon: <PeopleIcon />,
      path: '/admin/users',
      subItems: [
        { name: 'All Users', path: '/admin/users/all' },
        { name: 'Activity Logs', path: '/admin/users/activity' }
      ]
    },
    {
      name: 'Pickup Requests',
      icon: <AssignmentIcon />,
      path: '/admin/pickups',
      subItems: [
        { name: 'Scheduled', path: '/admin/pickups/scheduled' },
        { name: 'Pending', path: '/admin/pickups/pending' },
        { name: 'Completed', path: '/admin/pickups/completed' }
      ]
    },
    {
      name: 'Drop-off Locations',
      icon: <LocationIcon />,
      path: '/admin/locations'
    },
    {
      name: 'Marketplace',
      icon: <StoreIcon />,
      path: '/admin/marketplace',
      subItems: [
        { name: 'Product Approvals', path: '/admin/marketplace/approvals' },
        { name: 'Order Tracking', path: '/admin/marketplace/orders' },
        { name: 'Complaints', path: '/admin/marketplace/complaints' }
      ]
    },
    {
      name: 'Waste Analytics',
      icon: <AnalyticsIcon />,
      path: '/admin/analytics'
    },
    {
      name: 'Content Management',
      icon: <ContentIcon />,
      path: '/admin/content',
      subItems: [
        { name: 'Training Resources', path: '/admin/content/training' },
        { name: 'DIY Projects', path: '/admin/content/diy' },
        { name: 'Announcements', path: '/admin/content/announcements' }
      ]
    },
    {
      name: 'Reward System',
      icon: <RewardsIcon />,
      path: '/admin/rewards'
    },
    {
      name: 'Feedback & Support',
      icon: <SupportIcon />,
      path: '/admin/support'
    },
    {
      name: 'Admin Management',
      icon: <AdminIcon />,
      path: '/admin/management',
      subItems: [
        { name: 'Admin Accounts', path: '/admin/management/accounts' },
        { name: 'Role Permissions', path: '/admin/management/roles' }
      ]
    }
  ];

  return (
    <div className={`bg-gray-800 text-white h-screen flex flex-col ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 ease-in-out`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-1">
            <span className="text-green-500 font-bold">Waste</span>
            <span className="text-red-500 font-bold">2</span>
            <span className="text-green-500 font-bold">Wealth</span>
            <span className="text-sm text-gray-400">Admin</span>
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
          <div key={item.name} className="px-2">
            {item.subItems ? (
              <>
                <div 
                  onClick={() => toggleMenu(item.name)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-700 ${location.pathname.startsWith(item.path) ? 'bg-gray-700' : ''}`}
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-gray-400">{item.icon}</span>
                    {!isCollapsed && <span>{item.name}</span>}
                  </div>
                  {!isCollapsed && (
                    expandedMenu === item.name ? <ExpandLess /> : <ExpandMore />
                  )}
                </div>
                
                {expandedMenu === item.name && !isCollapsed && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className={`block p-2 rounded hover:bg-gray-700 ${location.pathname === subItem.path ? 'bg-gray-700 text-green-400' : 'text-gray-400'}`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg hover:bg-gray-700 ${location.pathname === item.path ? 'bg-gray-700 text-green-400' : 'text-gray-400'}`}
              >
                <span className="mr-3">{item.icon}</span>
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            )}
          </div>
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

export default Sidebar;