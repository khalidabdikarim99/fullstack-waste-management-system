import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Import Material-UI icons using default imports to avoid issues
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SecurityIcon from "@mui/icons-material/Security";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RecycleIcon from "@mui/icons-material/Recycling";
import EcoIcon from "@mui/icons-material/Nature";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const API_URL = "http://127.0.0.1:5000";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
  });

  const navigate = useNavigate();

  // =====================================================
  //                  LOAD USER PROFILE
  // =====================================================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(`${API_URL}/auth/profile/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Handle invalid/expired token (422 or 401)
        if (res.status === 401 || res.status === 422) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          Swal.fire("Session Expired", "Please log in again.", "warning");
          navigate("/login");
          return;
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load profile");

        setProfile(data);
        setFormData(data);
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // =====================================================
  //                  HANDLE PROFILE UPDATES
  // =====================================================
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/auth/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      Swal.fire("Success", "Profile updated successfully!", "success");
      setProfile(data);
      setEditing(false);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // =====================================================
  //                  HANDLE PASSWORD CHANGE
  // =====================================================
  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.new_password !== passwordData.confirm_password) {
      return Swal.fire("Error", "New passwords do not match", "error");
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Password change failed");

      Swal.fire("Success", "Password changed successfully!", "success");
      setPasswordData({ old_password: "", new_password: "", confirm_password: "" });
      setChangingPassword(false);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // =====================================================
  //                  RENDER UI
  // =====================================================
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your profile...</p>
      </div>
    </div>
  );
  
  if (!profile) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <p className="text-center text-red-500 bg-white p-8 rounded-xl shadow-lg">No profile found. Please try logging in again.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Waste2Wealth Information Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <RecycleIcon className="text-4xl" /> Waste2Wealth
            </h1>
            <p className="mt-2 text-green-100">Transforming waste into valuable resources</p>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <EcoIcon className="text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Environmental Impact</h3>
                <p className="text-gray-600 mt-1">Reduce landfill waste by recycling and upcycling materials into valuable products.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <AttachMoneyIcon className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Economic Opportunity</h3>
                <p className="text-gray-600 mt-1">Create sustainable income sources by transforming waste materials into sellable products.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-teal-100 p-3 rounded-full">
                <TrendingUpIcon className="text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Community Growth</h3>
                <p className="text-gray-600 mt-1">Build a circular economy where waste becomes a resource for community development.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <SecurityIcon className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Your Role</h3>
                <p className="text-gray-600 mt-1 capitalize">As a {profile?.role || "member"}, you're contributing to a sustainable future.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <AccountCircleIcon className="text-3xl" /> My Profile
            </h2>
            <p className="mt-1 text-blue-100">Manage your account information and security</p>
          </div>

          <div className="p-6 md:p-8">
            {/* --- PROFILE INFO / EDIT FORM --- */}
            {!editing ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <AccountCircleIcon className="text-blue-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="text-lg font-semibold">{profile?.name || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <EmailIcon className="text-blue-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-lg font-semibold">{profile?.email || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <PhoneIcon className="text-blue-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="text-lg font-semibold">{profile?.phone_number || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <LocationOnIcon className="text-blue-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-lg font-semibold">{profile?.address || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <SecurityIcon className="text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="text-lg font-semibold capitalize">{profile?.role || "N/A"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition duration-300 flex items-center justify-center gap-2"
                  >
                    <EditIcon /> Edit Profile
                  </button>
                  <button
                    onClick={() => setChangingPassword(true)}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition duration-300 flex items-center justify-center gap-2"
                  >
                    <LockIcon /> Change Password
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <AccountCircleIcon className="text-gray-500 text-lg" /> Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <EmailIcon className="text-gray-500 text-lg" /> Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      disabled
                      className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <PhoneIcon className="text-gray-500 text-lg" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <LocationOnIcon className="text-gray-500 text-lg" /> Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2"
                  >
                    <SaveIcon /> Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2"
                  >
                    <CancelIcon /> Cancel
                  </button>
                </div>
              </form>
            )}

            {/* --- CHANGE PASSWORD FORM --- */}
            {changingPassword && (
              <form onSubmit={handleChangePassword} className="space-y-6 mt-10 pt-10 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <LockIcon className="text-green-600" /> Change Password
                </h3>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.old_password ? "text" : "password"}
                      name="old_password"
                      value={passwordData.old_password}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("old_password")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.old_password ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </button>
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new_password ? "text" : "password"}
                      name="new_password"
                      value={passwordData.new_password}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("new_password")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.new_password ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </button>
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm_password ? "text" : "password"}
                      name="confirm_password"
                      value={passwordData.confirm_password}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirm_password")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.confirm_password ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2"
                  >
                    <LockIcon /> Update Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setChangingPassword(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2"
                  >
                    <CancelIcon /> Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;