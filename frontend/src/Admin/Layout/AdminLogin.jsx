// AdminLogin.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API_URL = "http://127.0.0.1:5000";

const AdminLogin = () => {
  const navigate = useNavigate();

  // Redirect if already logged in as admin
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser && loggedInUser.role === 'admin') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        mode: "cors",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Check if user has an admin role
      if (data.user.role !== 'admin') {
        throw new Error("This account does not have administrator privileges");
      }

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      Swal.fire({
        icon: 'success',
        title: 'Admin Access Granted',
        text: 'Welcome to the Waste2Wealth Admin Portal!',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate('/admin/dashboard');
      });

    } catch (error) {
      console.error("Login error:", error);
      Swal.fire('Access Denied', error.message || 'Administrator login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4 py-8">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="text-center mb-8">
            <Link to="/" className="text-4xl font-bold flex items-center justify-center space-x-2">
              <span className="text-green-600">Waste</span>
              <span className="text-red-500">2</span>
              <span className="text-green-600">Wealth</span>
            </Link>
            <p className="mt-2 text-gray-600">Administrative Portal</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Administrator Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  placeholder="Enter administrator email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  placeholder="Enter administrator password"
                />
              </div>

              <div className="text-right">
                <Link to="/admin/forgot-password" className="text-sm text-green-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mt-4 transition duration-300"
              >
                {loading ? "Verifying..." : "Access Admin Portal"}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600 mb-4">Need to access a different portal?</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link 
                  to="/login" 
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 text-sm"
                >
                  User Login
                </Link>
                <Link 
                  to="/recycler/login" 
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 text-sm"
                >
                  Recycler Login
                </Link>
                <Link 
                  to="/collector/login" 
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 text-sm"
                >
                  Collector Login
                </Link>
                <Link 
                  to="/employer/login" 
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 text-sm"
                >
                  Employer Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-green-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-green-800 mb-6">Admin Features</h3>
          <ul className="space-y-5">
            <li className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800">System Management</h4>
                <p className="text-gray-700 mt-1">Full control over users, roles, and platform settings</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Analytics & Reports</h4>
                <p className="text-gray-700 mt-1">Access comprehensive platform analytics and generate detailed reports</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Security Controls</h4>
                <p className="text-gray-700 mt-1">Manage security settings, permissions, and access controls</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800">User Support</h4>
                <p className="text-gray-700 mt-1">Access to user management tools and support ticket system</p>
              </div>
            </li>
          </ul>

          <div className="mt-10 bg-white p-5 rounded-lg border border-green-200">
            <h4 className="font-bold text-green-700 mb-3">Administrative Access Only</h4>
            <p className="text-gray-700 mb-4">This portal is restricted to authorized administrators only</p>
            <div className="text-xs text-gray-500 text-center">
              <p>For access requests, contact system administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;