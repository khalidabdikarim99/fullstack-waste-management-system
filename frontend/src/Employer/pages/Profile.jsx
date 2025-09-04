// src/Employer/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";

// Import Material-UI icons using default imports
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
import BusinessIcon from "@mui/icons-material/Business";

const API_URL = "http://127.0.0.1:5000";

const EmployerProfile = () => {
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
  //                  LOAD PROFILE
  // =====================================================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        // Only employers can access
        if (!token || !user || user.role.toLowerCase() !== "employer") {
          navigate("/employer/login");
          return;
        }

        const res = await fetch(`${API_URL}/auth/employer/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (res.status === 401 || res.status === 422) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          Swal.fire("Session Expired", "Please log in again.", "warning");
          navigate("/employer/login");
          return;
        }

        const text = await res.text();
        const data = text ? JSON.parse(text) : null;

        if (!res.ok) throw new Error(data?.error || "Failed to load profile");

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
      const res = await fetch(`${API_URL}/auth/employer/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (!res.ok) throw new Error(data?.error || "Update failed");

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
      const res = await fetch(`${API_URL}/auth/employer/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(passwordData),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (!res.ok) throw new Error(data?.error || "Password change failed");

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
    <Box className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <Box className="text-center">
        <Box className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></Box>
        <Typography variant="body1" className="mt-4 text-gray-600">
          Loading your profile...
        </Typography>
      </Box>
    </Box>
  );
  
  if (!profile) return (
    <Box className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <Typography variant="body1" className="text-center text-red-500 bg-white p-8 rounded-xl shadow-lg">
        No profile found. Please try logging in again.
      </Typography>
    </Box>
  );

  return (
    <Box className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-10 px-4">
      <Box className="max-w-6xl mx-auto">
        {/* Waste2Wealth Information Section */}
        <Box className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <Box className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
            <Typography variant="h3" className="font-bold flex items-center gap-2">
              <RecycleIcon className="text-4xl" /> Waste2Wealth
            </Typography>
            <Typography variant="body1" className="mt-2 text-green-100">
              Transforming waste into valuable resources
            </Typography>
          </Box>
          <Box className="p-6 grid md:grid-cols-2 gap-6">
            <Box className="flex items-start gap-4">
              <Box className="bg-green-100 p-3 rounded-full">
                <EcoIcon className="text-green-600" />
              </Box>
              <Box>
                <Typography variant="h6" className="font-semibold text-gray-800">
                  Environmental Impact
                </Typography>
                <Typography variant="body2" className="text-gray-600 mt-1">
                  Employers play a crucial role in managing waste responsibly and promoting recycling initiatives.
                </Typography>
              </Box>
            </Box>
            <Box className="flex items-start gap-4">
              <Box className="bg-blue-100 p-3 rounded-full">
                <AttachMoneyIcon className="text-blue-600" />
              </Box>
              <Box>
                <Typography variant="h6" className="font-semibold text-gray-800">
                  Economic Opportunity
                </Typography>
                <Typography variant="body2" className="text-gray-600 mt-1">
                  Create value from waste materials and contribute to a sustainable business model.
                </Typography>
              </Box>
            </Box>
            <Box className="flex items-start gap-4">
              <Box className="bg-teal-100 p-3 rounded-full">
                <TrendingUpIcon className="text-teal-600" />
              </Box>
              <Box>
                <Typography variant="h6" className="font-semibold text-gray-800">
                  Business Growth
                </Typography>
                <Typography variant="body2" className="text-gray-600 mt-1">
                  Implement waste management strategies that benefit both your business and the environment.
                </Typography>
              </Box>
            </Box>
            <Box className="flex items-start gap-4">
              <Box className="bg-amber-100 p-3 rounded-full">
                <BusinessIcon className="text-amber-600" />
              </Box>
              <Box>
                <Typography variant="h6" className="font-semibold text-gray-800">
                  Your Role
                </Typography>
                <Typography variant="body2" className="text-gray-600 mt-1 capitalize">
                  As an {profile?.role || "employer"}, you're leading sustainable business practices.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Profile Section */}
        <Box className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <Box className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <Typography variant="h4" className="font-bold flex items-center gap-2">
              <AccountCircleIcon className="text-3xl" /> Employer Profile
            </Typography>
            <Typography variant="body1" className="mt-1 text-blue-100">
              Manage your account information and security
            </Typography>
          </Box>

          <Box className="p-6 md:p-8">
            {/* PROFILE INFO / EDIT FORM */}
            {!editing ? (
              <Box className="space-y-6">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <AccountCircleIcon className="text-blue-500 mt-1" />
                      <Box>
                        <Typography variant="body2" color="textSecondary">Name</Typography>
                        <Typography variant="h6">{profile?.name || "N/A"}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <EmailIcon className="text-blue-500 mt-1" />
                      <Box>
                        <Typography variant="body2" color="textSecondary">Email</Typography>
                        <Typography variant="h6">{profile?.email || "N/A"}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <PhoneIcon className="text-blue-500 mt-1" />
                      <Box>
                        <Typography variant="body2" color="textSecondary">Phone Number</Typography>
                        <Typography variant="h6">{profile?.phone_number || "N/A"}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <LocationOnIcon className="text-blue-500 mt-1" />
                      <Box>
                        <Typography variant="body2" color="textSecondary">Address</Typography>
                        <Typography variant="h6">{profile?.address || "N/A"}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <SecurityIcon className="text-blue-500 mt-1" />
                      <Box>
                        <Typography variant="body2" color="textSecondary">Role</Typography>
                        <Typography variant="h6" className="capitalize">{profile?.role || "N/A"}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={2} mt={4}>
                  <Grid item xs={12} md={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => setEditing(true)}
                      startIcon={<EditIcon />}
                      size="large"
                    >
                      Edit Profile
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      onClick={() => setChangingPassword(true)}
                      startIcon={<LockIcon />}
                      size="large"
                    >
                      Change Password
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <form onSubmit={handleUpdate}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Name"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      InputProps={{
                        startAdornment: <AccountCircleIcon color="action" sx={{ mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email || ""}
                      disabled
                      fullWidth
                      margin="normal"
                      InputProps={{
                        startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Phone Number"
                      name="phone_number"
                      value={formData.phone_number || ""}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      InputProps={{
                        startAdornment: <PhoneIcon color="action" sx={{ mr: 1 }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Address"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      InputProps={{
                        startAdornment: <LocationOnIcon color="action" sx={{ mr: 1 }} />,
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} mt={4}>
                  <Grid item xs={12} md={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={<SaveIcon />}
                      size="large"
                    >
                      Save Changes
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="inherit"
                      onClick={() => setEditing(false)}
                      startIcon={<CancelIcon />}
                      size="large"
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}

            {/* CHANGE PASSWORD FORM */}
            {changingPassword && (
              <form onSubmit={handleChangePassword} className="mt-10 pt-10 border-t border-gray-200">
                <Typography variant="h5" className="mb-6 flex items-center gap-2">
                  <LockIcon className="text-green-600" /> Change Password
                </Typography>
                
                <Grid container spacing={3}>
                  {["old_password", "new_password", "confirm_password"].map((field) => (
                    <Grid item xs={12} key={field}>
                      <TextField
                        label={field.replace("_", " ").toUpperCase()}
                        name={field}
                        type={showPasswords[field] ? "text" : "password"}
                        value={passwordData[field]}
                        onChange={handlePasswordChange}
                        fullWidth
                        margin="normal"
                        required
                        InputProps={{
                          endAdornment: (
                            <Button
                              onClick={() => togglePasswordVisibility(field)}
                              sx={{ minWidth: 'auto', p: 1 }}
                            >
                              {showPasswords[field] ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </Button>
                          ),
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Grid container spacing={2} mt={4}>
                  <Grid item xs={12} md={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      type="submit"
                      startIcon={<LockIcon />}
                      size="large"
                    >
                      Update Password
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="inherit"
                      onClick={() => setChangingPassword(false)}
                      startIcon={<CancelIcon />}
                      size="large"
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployerProfile;