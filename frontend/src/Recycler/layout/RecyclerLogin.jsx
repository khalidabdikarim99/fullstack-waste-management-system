// RecyclerLogin.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API_URL = "http://127.0.0.1:5000";

const RecyclerLogin = () => {
  const navigate = useNavigate();

  // Redirect if already logged in as recycler
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser && loggedInUser.role === 'recycler') {
      navigate('/recycler/dashboard');
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
      // Updated fetch URL for recycler login
      const res = await fetch(`${API_URL}/auth/login/recycler`, {
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

      // Backend role validation
      if (data.user.role !== 'recycler') {
        throw new Error("This account is not registered as a recycler");
      }

      // Store user data and JWT token
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back to Waste2Wealth!',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate('/recycler/dashboard');
      });

    } catch (error) {
      console.error("Login error:", error);
      Swal.fire('Error', error.message || 'Login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-gray-800 px-4 py-8">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-10">
        <div className="text-center mb-8">
          <Link to="/" className="text-4xl font-bold flex items-center justify-center space-x-2">
            <span className="text-green-600">Waste</span>
            <span className="text-red-500">2</span>
            <span className="text-green-600">Wealth</span>
          </Link>
          <p className="mt-2 text-gray-600">Recycler Portal - Turn waste into valuable resources</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Recycler Login
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
              {loading ? "Logging in..." : "Login as Recycler"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have a recycler account?{' '}
              <Link to="/signup" className="text-green-600 font-semibold hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-green-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-green-800 mb-4">Recycler Benefits</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Process recyclable materials efficiently</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Manage pickup requests and schedules</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Track your recycling impact and earnings</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Connect with collectors and users</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RecyclerLogin;
