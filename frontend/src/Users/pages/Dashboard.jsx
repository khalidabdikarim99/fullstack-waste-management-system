// src/User/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  LocalShipping as PickupIcon,
  Place as LocationIcon,
  AssignmentTurnedIn as ConfirmationIcon,
  Report as ReportIcon
} from '@mui/icons-material';

const API_URL = "http://127.0.0.1:5000"; // Flask backend

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [totals, setTotals] = useState({
    pickups: 0,
    confirmations: 0,
    reports: 0
  });

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    // Get user info
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      setUserName(storedUser.name);
    }

    // Fetch totals from backend
    const fetchTotals = async () => {
      try {
        const [pickupRes, confirmRes, reportRes] = await Promise.all([
          axios.get(`${API_URL}/pickup-request/me`, { headers }),
          axios.get(`${API_URL}/pickup-confirmation/me`, { headers }),
          axios.get(`${API_URL}/pickup-report/me`, { headers })
        ]);

        setTotals({
          pickups: pickupRes.data.length,
          confirmations: confirmRes.data.length,
          reports: reportRes.data.length
        });
      } catch (err) {
        console.error("Error fetching dashboard totals:", err);
      }
    };

    if (token) fetchTotals();
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome Back{userName ? `, ${userName}!` : "!"}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center">
            <PickupIcon className="text-green-500 mr-3" />
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Pickup Requests</h3>
              <p className="text-2xl font-bold text-gray-800">{totals.pickups}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <ConfirmationIcon className="text-blue-500 mr-3" />
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Confirmations</h3>
              <p className="text-2xl font-bold text-gray-800">{totals.confirmations}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
          <div className="flex items-center">
            <ReportIcon className="text-red-500 mr-3" />
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Reports</h3>
              <p className="text-2xl font-bold text-gray-800">{totals.reports}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex items-center">
            <PickupIcon className="text-purple-500 mr-3" />
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Nearby Drop-offs</h3>
              <p className="text-2xl font-bold text-gray-800">5</p> {/* Static placeholder, can integrate later */}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          {/* Optionally, fetch recent activity from backend */}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Environmental Impact</h3>
          {/* Optionally, show total recycled quantity */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
