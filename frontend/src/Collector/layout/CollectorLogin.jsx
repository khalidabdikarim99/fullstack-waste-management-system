// CollectorLogin.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = "http://127.0.0.1:5000";

const CollectorLogin = () => {
  const navigate = useNavigate();

  // Redirect if already logged in as collector
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser && loggedInUser.role === "collector") {
      navigate("/collector/dashboard");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login/collector`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      // ✅ Handle non-JSON responses gracefully
      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Server returned invalid response");
      }

      if (res.status === 401 || res.status === 422) {
        throw new Error(data.error || "Invalid email or password");
      }
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // ✅ Ensure user and token exist before saving
      if (!data.user || !data.token) {
        throw new Error("Invalid server response: missing user or token");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back to Waste2Wealth!",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/collector/dashboard");
      });
    } catch (error) {
      console.error("Collector login error:", error);
      Swal.fire("Error", error.message || "Login failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4 py-8">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
        {/* Left side (login form) */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="text-center mb-8">
            <Link
              to="/"
              className="text-4xl font-bold flex items-center justify-center space-x-2"
            >
              <span className="text-green-600">Waste</span>
              <span className="text-red-500">2</span>
              <span className="text-green-600">Wealth</span>
            </Link>
            <p className="mt-2 text-gray-600">
              Efficient waste collection services
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Collector Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
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
                <Link
                  to="/forgot-password"
                  className="text-sm text-green-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mt-4 transition duration-300"
              >
                {loading ? "Logging in..." : "Login as Collector"}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have a collector account?{" "}
                <Link
                  to="/signup"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600 mb-4">
                Looking for a different login?
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300"
                >
                  User Login
                </Link>
                <Link
                  to="/recycler/login"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300"
                >
                  Recycler Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right side (benefits info) */}
        <div className="w-full md:w-1/2 bg-green-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-green-800 mb-6">
            Collector Benefits
          </h3>
          <ul className="space-y-5">
            <li className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Manage Pickups</h4>
                <p className="text-gray-700 mt-1">
                  Efficiently manage and schedule waste collection routes
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800">
                  Connect with Users
                </h4>
                <p className="text-gray-700 mt-1">
                  Build relationships with regular customers
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Track Earnings</h4>
                <p className="text-gray-700 mt-1">
                  Monitor your collection performance and income
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800">
                  Optimized Routes
                </h4>
                <p className="text-gray-700 mt-1">
                  Access optimized collection routes to save time and fuel
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-10 bg-white p-5 rounded-lg border border-green-200">
            <h4 className="font-bold text-green-700 mb-3">
              Join Our Collector Network
            </h4>
            <p className="text-gray-700 mb-4">
              Become part of our growing team of waste collection professionals
            </p>
            <Link
              to="/signup"
              className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition duration-300"
            >
              Apply as Collector
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectorLogin;
