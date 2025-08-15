import React from 'react';
import { 
  LocalShipping as PickupIcon,
  Place as LocationIcon,
  CardGiftcard as RewardsIcon,
  Recycling as RecyclingIcon
} from '@mui/icons-material';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back, User!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center">
            <PickupIcon className="text-green-500 mr-3" />
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Scheduled Pickups</h3>
              <p className="text-2xl font-bold text-gray-800">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <LocationIcon className="text-blue-500 mr-3" />
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Nearby Drop-offs</h3>
              <p className="text-2xl font-bold text-gray-800">5</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <div className="flex items-center">
            <RewardsIcon className="text-yellow-500 mr-3" />
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Reward Points</h3>
              <p className="text-2xl font-bold text-gray-800">1,250</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex items-center">
            <RecyclingIcon className="text-purple-500 mr-3" />
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Recycled</h3>
              <p className="text-2xl font-bold text-gray-800">42kg</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          {/* Activity list would go here */}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Environmental Impact</h3>
          {/* Impact visualization would go here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;