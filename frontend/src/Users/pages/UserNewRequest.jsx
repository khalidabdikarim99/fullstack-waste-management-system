// src/User/pages/PickupRequest.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box, Typography, TextField, Button, Grid, Card, CardContent, Tabs, Tab, AppBar,
} from "@mui/material";
import {
  LocalShipping, AssignmentTurnedIn, Report, Person, Email, Phone, Scale, LocationOn, Image,
  Description, Category, AttachMoney, CalendarToday, CheckCircle, Warning, Recycling
} from "@mui/icons-material";
import Swal from "sweetalert2";

const API_URL = "http://127.0.0.1:5000"; // Flask backend

const PickupRequest = () => {
  const [user, setUser] = useState(null);
  const [pickupData, setPickupData] = useState({ quantity: "", location: "", image_url: "", notes: "" });
  const [confirmationData, setConfirmationData] = useState({
    waste_type: "", quantity: "", amount_paid: "", location: "", collector_name: "", collector_email: "", collector_phone: "", date: "",
  });
  const [reportData, setReportData] = useState({ location: "", notes: "" });
  const [activeForm, setActiveForm] = useState("pickup");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!user) return (
    <Box className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <Box className="text-center">
        <Box className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></Box>
        <Typography variant="body1" className="mt-4 text-gray-600">Loading user data...</Typography>
      </Box>
    </Box>
  );

  // ---------------- Handlers ----------------
  const handlePickupChange = (e) => setPickupData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleConfirmationChange = (e) => setConfirmationData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleReportChange = (e) => setReportData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePickupSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/pickup-request/`, pickupData, { headers });
      Swal.fire("Success", "Pickup request submitted successfully!", "success");
      setPickupData({ quantity: "", location: "", image_url: "", notes: "" });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to submit pickup request.", "error");
    }
  };

  const handleConfirmationSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/pickup-confirmation/`, confirmationData, { headers });
      Swal.fire("Success", "Pickup confirmed successfully!", "success");
      setConfirmationData({
        waste_type: "", quantity: "", amount_paid: "", location: "", collector_name: "", collector_email: "", collector_phone: "", date: "",
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to submit pickup confirmation.", "error");
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/pickup-report/`, reportData, { headers });
      Swal.fire("Success", "Report submitted successfully!", "success");
      setReportData({ location: "", notes: "" });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to submit report.", "error");
    }
  };

  // ---------------- Render ----------------
  return (
    <Box className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-10 px-4">
      <Box className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-8 rounded-2xl shadow-lg overflow-hidden">
          <Box className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
            <Typography variant="h3" className="font-bold flex items-center gap-2">
              <Recycling className="text-4xl" /> Waste2Wealth
            </Typography>
            <Typography variant="h5" className="mt-2 text-green-100">Pickup Management Portal</Typography>
            <Typography variant="body1" className="mt-1 text-green-100">
              Manage your waste pickup requests, confirmations, and reports
            </Typography>
          </Box>
        </Card>

        {/* Tabs */}
        <Card className="mb-6 rounded-2xl shadow-lg">
          <AppBar position="static" className="bg-white rounded-t-2xl shadow-none">
            <Tabs
              value={activeForm}
              onChange={(e, newValue) => setActiveForm(newValue)}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab value="pickup" label="Pickup Request" icon={<LocalShipping />} iconPosition="start" />
              <Tab value="confirmation" label="Confirmation" icon={<AssignmentTurnedIn />} iconPosition="start" />
              <Tab value="report" label="Report" icon={<Report />} iconPosition="start" />
            </Tabs>
          </AppBar>
        </Card>

        {/* User Info */}
        <Card className="mb-6 rounded-2xl shadow-lg">
          <CardContent>
            <Typography variant="h6" className="mb-4 flex items-center gap-2">
              <Person color="primary" /> User Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField label="Name" value={user.name} fullWidth disabled />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Email" value={user.email} fullWidth disabled />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Phone" value={user.phone_number} fullWidth disabled />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Pickup Form */}
        {activeForm === "pickup" && (
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <Typography variant="h5" className="mb-6 flex items-center gap-2 text-green-700">
                <LocalShipping className="text-3xl" /> Pickup Request Form
              </Typography>
              <form onSubmit={handlePickupSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField label="Quantity (kg)" name="quantity" type="number" value={pickupData.quantity} onChange={handlePickupChange} fullWidth required />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="Location" name="location" value={pickupData.location} onChange={handlePickupChange} fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Image URL" name="image_url" value={pickupData.image_url} onChange={handlePickupChange} fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Notes / Description" name="notes" value={pickupData.notes} onChange={handlePickupChange} fullWidth multiline rows={3} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="success" fullWidth startIcon={<LocalShipping />}>Submit Pickup Request</Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Confirmation Form */}
        {activeForm === "confirmation" && (
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <Typography variant="h5" className="mb-6 flex items-center gap-2 text-blue-700">
                <AssignmentTurnedIn className="text-3xl" /> Pickup Confirmation Form
              </Typography>
              <form onSubmit={handleConfirmationSubmit}>
                {/* ...confirmation fields stay the same */}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}><TextField label="Waste Type" name="waste_type" value={confirmationData.waste_type} onChange={handleConfirmationChange} fullWidth required /></Grid>
                  <Grid item xs={12} md={6}><TextField label="Quantity (kg)" name="quantity" type="number" value={confirmationData.quantity} onChange={handleConfirmationChange} fullWidth required /></Grid>
                  <Grid item xs={12} md={6}><TextField label="Amount Paid" name="amount_paid" type="number" value={confirmationData.amount_paid} onChange={handleConfirmationChange} fullWidth required /></Grid>
                  <Grid item xs={12} md={6}><TextField label="Location" name="location" value={confirmationData.location} onChange={handleConfirmationChange} fullWidth required /></Grid>
                  <Grid item xs={12} md={4}><TextField label="Collector Name" name="collector_name" value={confirmationData.collector_name} onChange={handleConfirmationChange} fullWidth required /></Grid>
                  <Grid item xs={12} md={4}><TextField label="Collector Email" name="collector_email" value={confirmationData.collector_email} onChange={handleConfirmationChange} fullWidth required /></Grid>
                  <Grid item xs={12} md={4}><TextField label="Collector Phone" name="collector_phone" value={confirmationData.collector_phone} onChange={handleConfirmationChange} fullWidth required /></Grid>
                  <Grid item xs={12}><TextField label="Date" name="date" type="date" value={confirmationData.date} onChange={handleConfirmationChange} fullWidth required InputLabelProps={{ shrink: true }} /></Grid>
                  <Grid item xs={12}><Button type="submit" variant="contained" color="primary" fullWidth startIcon={<CheckCircle />}>Submit Confirmation</Button></Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Report Form */}
        {activeForm === "report" && (
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <Typography variant="h5" className="mb-6 flex items-center gap-2 text-red-700">
                <Report className="text-3xl" /> Pickup Report Form
              </Typography>
              <form onSubmit={handleReportSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}><TextField label="Location" name="location" value={reportData.location} onChange={handleReportChange} fullWidth required /></Grid>
                  <Grid item xs={12}><TextField label="Notes / Description" name="notes" value={reportData.notes} onChange={handleReportChange} fullWidth multiline rows={3} /></Grid>
                  <Grid item xs={12}><Button type="submit" variant="contained" color="error" fullWidth startIcon={<Warning />}>Submit Report</Button></Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default PickupRequest;
