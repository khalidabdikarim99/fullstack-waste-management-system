import React, { useState, useEffect } from "react";

const Profile = () => {
  const userId = 1; // Example logged-in user
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profilePicture: "",
    notifications: {
      email: true,
      sms: false,
      app: true
    }
  });
  const [editMode, setEditMode] = useState(false);
  const [passwordData, setPasswordData] = useState({ 
    old_password: "", 
    new_password: "" 
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    // Mock API call
    const mockProfile = {
      name: "John Doe",
      email: "john@waste2wealth.com",
      phone: "+1234567890",
      address: "123 Green St, Eco City",
      profilePicture: "",
      notifications: {
        email: true,
        sms: false,
        app: true
      }
    };
    setProfile(mockProfile);
  }, []);

  const handleUpdateProfile = () => {
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  const handleChangePassword = () => {
    alert("Password updated successfully!");
    setPasswordData({ old_password: "", new_password: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUploadImage = () => {
    if (selectedFile) {
      alert("Profile picture updated successfully!");
      setProfile({ ...profile, profilePicture: previewImage });
      setSelectedFile(null);
    }
  };

  const toggleNotification = (type) => {
    setProfile({
      ...profile,
      notifications: {
        ...profile.notifications,
        [type]: !profile.notifications[type]
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gray-900 text-white rounded-t-xl px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <span className="text-green-500">User</span>
            <span className="mx-1 text-white">Profile</span>
          </h1>
          {editMode ? (
            <button 
              onClick={handleUpdateProfile}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded transition-colors"
            >
              Save Changes
            </button>
          ) : (
            <button 
              onClick={() => setEditMode(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-b-xl overflow-hidden">
          {/* Personal Information Section */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-1 h-6 bg-green-500 mr-2"></span>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["name", "email", "phone", "address"].map((field) => (
                <div key={field} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {field}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    value={profile[field] || ""}
                    onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
                    disabled={!editMode}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      editMode 
                        ? 'border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500' 
                        : 'border-transparent bg-gray-50'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Profile Picture Section */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-1 h-6 bg-green-500 mr-2"></span>
              Profile Picture
            </h2>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                  {previewImage || profile.profilePicture ? (
                    <img 
                      src={previewImage || profile.profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-semibold text-gray-500">
                      {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                {editMode && (
                  <div className="absolute -bottom-2 -right-2">
                    <label className="bg-green-600 text-white p-1 rounded-full cursor-pointer hover:bg-green-700">
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                    </label>
                  </div>
                )}
              </div>
              {editMode && selectedFile && (
                <div className="space-y-2">
                  <button
                    onClick={handleUploadImage}
                    className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors text-sm"
                  >
                    Upload Picture
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewImage("");
                    }}
                    className="px-4 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors text-sm ml-2"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Change Password Section */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-1 h-6 bg-green-500 mr-2"></span>
              Change Password
            </h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.old_password}
                  placeholder="Enter current password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.new_password}
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                />
              </div>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                disabled={!passwordData.old_password || !passwordData.new_password}
              >
                Update Password
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="px-6 py-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-1 h-6 bg-green-500 mr-2"></span>
              Notification Settings
            </h2>
            <div className="space-y-3">
              {Object.entries(profile.notifications || {}).map(([type, enabled]) => (
                <div key={type} className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 capitalize">
                    {type} Notifications
                  </label>
                  <button
                    onClick={() => toggleNotification(type)}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                      enabled ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform transition rounded-full bg-white ${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
