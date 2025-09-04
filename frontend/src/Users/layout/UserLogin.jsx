import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API_URL = "http://127.0.0.1:5000";

const UserLogin = () => {
  const navigate = useNavigate();

  // Redirect if already logged in as user
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (loggedInUser && token && loggedInUser.role === 'user') {
      navigate('/user/dashboard');
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
      const res = await fetch(`${API_URL}/auth/login/user`, {
        method: "POST",
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

      // ✅ Store both token and user
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back to Waste2Wealth!',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate('/user/dashboard');
      });

    } catch (error) {
      console.error("Login error:", error);
      Swal.fire('Error', error.message || 'Login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4 py-8">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="text-center mb-8">
            <Link to="/" className="text-4xl font-bold flex items-center justify-center space-x-2">
              <span className="text-green-600">Waste</span>
              <span className="text-red-500">2</span>
              <span className="text-green-600">Wealth</span>
            </Link>
            <p className="mt-2 text-gray-600">Turn your waste into valuable resources</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              User Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                />
              </div>

              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-green-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mt-4 transition duration-300"
              >
                {loading ? "Logging in..." : "Login to Your Account"}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-green-600 font-semibold hover:underline">
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600 mb-4">Are you a recycler or collector?</p>
              <div className="flex justify-center space-x-4">
                <Link 
                  to="/recycler/login" 
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300"
                >
                  Recycler Login
                </Link>
                <Link 
                  to="/collector/login" 
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300"
                >
                  Collector Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-green-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-green-800 mb-6">User Benefits</h3>
          <ul className="space-y-5">
            <li className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Earn Money</h4>
                <p className="text-gray-700 mt-1">Get paid for your recyclable waste materials</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Convenient Scheduling</h4>
                <p className="text-gray-700 mt-1">Schedule pickups at your preferred date and time</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Track Your Impact</h4>
                <p className="text-gray-700 mt-1">Monitor your environmental contribution and savings</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Exclusive Rewards</h4>
                <p className="text-gray-700 mt-1">Access special discounts and rewards programs</p>
              </div>
            </li>
          </ul>

          <div className="mt-10 bg-white p-5 rounded-lg border border-green-200">
            <h4 className="font-bold text-green-700 mb-3">New to Waste2Wealth?</h4>
            <p className="text-gray-700 mb-4">Join thousands of users turning waste into wealth every day</p>
            <Link 
              to="/signup" 
              className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition duration-300"
            >
              Create Your Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
