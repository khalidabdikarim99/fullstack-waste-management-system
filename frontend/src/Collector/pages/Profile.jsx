import React from 'react';
import { Avatar, Button, TextField, Divider, Switch, FormControlLabel } from '@mui/material';
import { Person, Phone, Email, CalendarToday, Lock } from '@mui/icons-material';

const Profile = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 space-y-4">
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-3 bg-green-500">C</Avatar>
            <Typography variant="h6">Collector Name</Typography>
            <Typography variant="body2" color="textSecondary">Member since June 2022</Typography>
          </div>

          <Divider />

          <div className="space-y-3">
            <Button fullWidth variant="contained">Edit Profile</Button>
            <Button fullWidth variant="outlined" startIcon={<Lock />}>Change Password</Button>
          </div>
        </div>

        <div className="md:w-2/3 space-y-6">
          <div>
            <Typography variant="h6" className="mb-4">Personal Information</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField label="Full Name" defaultValue="Collector Name" InputProps={{ startAdornment: <Person className="mr-2 text-gray-400" /> }} fullWidth />
              <TextField label="Phone" defaultValue="+1 (555) 123-4567" InputProps={{ startAdornment: <Phone className="mr-2 text-gray-400" /> }} fullWidth />
              <TextField label="Email" defaultValue="collector@waste2wealth.com" InputProps={{ startAdornment: <Email className="mr-2 text-gray-400" /> }} fullWidth />
              <TextField label="Join Date" defaultValue="June 15, 2022" InputProps={{ startAdornment: <CalendarToday className="mr-2 text-gray-400" /> }} fullWidth disabled />
            </div>
          </div>

          <Divider />

          <div>
            <Typography variant="h6" className="mb-4">Availability</Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormControlLabel control={<Switch defaultChecked />} label="Monday" />
              <FormControlLabel control={<Switch defaultChecked />} label="Wednesday" />
              <FormControlLabel control={<Switch defaultChecked />} label="Friday" />
              <FormControlLabel control={<Switch />} label="Tuesday" />
              <FormControlLabel control={<Switch />} label="Thursday" />
              <FormControlLabel control={<Switch defaultChecked />} label="Saturday" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;