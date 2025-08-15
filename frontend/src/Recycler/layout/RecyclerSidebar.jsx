import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LocalShipping as IncomingIcon,
  Sort as SortingIcon,
  Inventory as InventoryIcon,
  Store as SalesIcon,
  Assessment as ReportsIcon,
  Chat as ChatIcon,
  Business as ProfileIcon,
  ChevronLeft,
  ChevronRight,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';

const RecyclerSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState('');
  const location = useLocation();

  const toggleMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? '' : menu);
  };

  const menuItems = [
    {
      name: 'Incoming Shipments',
      icon: <IncomingIcon />,
      path: '/recycler/shipments',
      subItems: [
        { name: 'New Deliveries', path: '/recycler/shipments/new' },
        { name: 'Received History', path: '/recycler/shipments/history' }
      ]
    },
    {
      name: 'Sorting & Processing',
      icon: <SortingIcon />,
      path: '/recycler/processing',
      subItems: [
        { name: 'Sorting Queue', path: '/recycler/processing/sorting' },
        { name: 'Active Processes', path: '/recycler/processing/active' }
      ]
    },
    {
      name: 'Inventory',
      icon: <InventoryIcon />,
      path: '/recycler/inventory',
      subItems: [
        { name: 'Raw Materials', path: '/recycler/inventory/raw' },
        { name: 'Finished Products', path: '/recycler/inventory/products' }
      ]
    },
    {
      name: 'Sales & Distribution',
      icon: <SalesIcon />,
      path: '/recycler/sales',
      subItems: [
        { name: 'Current Orders', path: '/recycler/sales/orders' },
        { name: 'Sales History', path: '/recycler/sales/history' }
      ]
    },
    {
      name: 'Performance Reports',
      icon: <ReportsIcon />,
      path: '/recycler/reports'
    },
    {
      name: 'Communication',
      icon: <ChatIcon />,
      path: '/recycler/communication',
      subItems: [
        { name: 'With Collectors', path: '/recycler/communication/collectors' },
        { name: 'With Buyers', path: '/recycler/communication/buyers' }
      ]
    },
    {
      name: 'Profile & Settings',
      icon: <ProfileIcon />,
      path: '/recycler/profile'
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
            <span className="text-sm text-gray-400">Recycler</span>
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

export default RecyclerSidebar;