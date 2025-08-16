// Signup.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API_URL = "http://127.0.0.1:5000";

const Signup = () => {
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      switch (loggedInUser.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'recycler':
          navigate('/recycler/dashboard');
          break;
        case 'collector':
          navigate('/collector/dashboard');
          break;
        case 'employer':
          navigate('/employer/dashboard');
          break;
        default:
          navigate('/user/dashboard');
      }
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    userType: 'user',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePassword = (password) => {
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return strongPassword.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire('Error', "Passwords don't match!", 'error');
      return;
    }

    if (!validatePassword(formData.password)) {
      Swal.fire('Error', "Password must be at least 8 characters long and include uppercase, lowercase, and a number.", 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
          role: formData.userType,
          phone_number: formData.phoneNumber,
          address: formData.address
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Signup failed");

      Swal.fire({
        icon: 'success',
        title: 'Account Created',
        text: data.message || 'Your account was created successfully!',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        // Redirect to login page after successful signup
        navigate('/login');
      });

    } catch (error) {
      console.error("Signup error:", error);
      Swal.fire('Error', error.message || 'Signup failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-gray-800 px-4 py-8">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-10">
        <div className="text-center mb-8">
          <Link to="/" className="text-4xl font-bold flex items-center justify-center space-x-2">
            <span className="text-green-600">Waste</span>
            <span className="text-red-500">2</span>
            <span className="text-green-600">Wealth</span>
          </Link>
          <p className="mt-2 text-gray-600">Turn your waste into valuable resources</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Create Your Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                <div className="flex flex-wrap gap-4">
                  {['admin','recycler','collector','employer','user'].map(role => (
                    <label key={role} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="userType"
                        value={role}
                        checked={formData.userType === role}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span className="capitalize">{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength="8" className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full px-4 py-2 bg-gray-50 border rounded-lg" />
              </div>

              <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mt-4">
                {loading ? "Processing..." : "Create Account"}
              </button>
            </form>
          </div>

          <div className="hidden md:block bg-green-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-800 mb-4">Join Waste2Wealth Today</h3>
            <ul className="space-y-4">
              <li>Earn money from your recyclable waste</li>
              <li>Schedule convenient pickup times</li>
              <li>Track your environmental impact</li>
              <li>Access to exclusive rewards</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;