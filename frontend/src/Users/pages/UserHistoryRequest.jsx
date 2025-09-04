// src/User/pages/UserHistoryRequest.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  AppBar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import {
  LocalShipping,
  AssignmentTurnedIn,
  Report,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";

const API_URL = "http://127.0.0.1:5000"; // Flask backend

const UserHistoryRequest = () => {
  const [activeTab, setActiveTab] = useState("pickup");
  const [pickupRequests, setPickupRequests] = useState([]);
  const [confirmations, setConfirmations] = useState([]);
  const [reports, setReports] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch all user history data
  const fetchHistory = async () => {
    try {
      const [pickupRes, confirmRes, reportRes] = await Promise.all([
        axios.get(`${API_URL}/pickup-request/me`, { headers }),
        axios.get(`${API_URL}/pickup-confirmation/me`, { headers }),
        axios.get(`${API_URL}/pickup-report/me`, { headers }),
      ]);

      setPickupRequests(pickupRes.data);
      setConfirmations(confirmRes.data);
      setReports(reportRes.data);
    } catch (err) {
      console.error("Error fetching history:", err);
      if (err.response && err.response.status === 401) {
        Swal.fire("Unauthorized", "Please log in to view your history.", "error");
      } else {
        Swal.fire("Error", "Failed to fetch history.", "error");
      }
    }
  };

  useEffect(() => {
    if (token) fetchHistory();
  }, [token]);

  // ---------------- Handlers ----------------
  const handleEditClick = (request) => {
    setSelectedRequest({ ...request, type: "pickup" });
    setEditDialogOpen(true);
  };

  const handleEditReportClick = (report) => {
    setSelectedRequest({ ...report, type: "report" });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your pickup request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/pickup-request/${id}`, { headers });
        Swal.fire("Deleted!", "Your pickup request has been deleted.", "success");
        fetchHistory();
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Failed to delete request.", "error");
      }
    }
  };

  const handleDeleteReport = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your report.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/pickup-report/${id}`, { headers });
        Swal.fire("Deleted!", "Your report has been deleted.", "success");
        fetchHistory();
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Failed to delete report.", "error");
      }
    }
  };

  const handleEditChange = (e) => {
    setSelectedRequest((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSave = async () => {
    if (!selectedRequest) return;

    if (selectedRequest.type === "pickup") {
      try {
        await axios.put(
          `${API_URL}/pickup-request/${selectedRequest.id}`,
          {
            quantity: selectedRequest.quantity,
            location: selectedRequest.location,
            notes: selectedRequest.notes,
            image_url: selectedRequest.image_url,
          },
          { headers }
        );
        Swal.fire("Success", "Pickup request updated successfully.", "success");
      } catch (err) {
        console.error("Update error:", err);
        Swal.fire("Error", "Failed to update request.", "error");
      }
    } else if (selectedRequest.type === "report") {
      try {
        await axios.put(
          `${API_URL}/pickup-report/${selectedRequest.id}`,
          { location: selectedRequest.location, notes: selectedRequest.notes },
          { headers }
        );
        Swal.fire("Success", "Report updated successfully.", "success");
      } catch (err) {
        console.error("Update error:", err);
        Swal.fire("Error", "Failed to update report.", "error");
      }
    }

    setEditDialogOpen(false);
    fetchHistory();
  };

  const tableStyle = { maxHeight: 400 };

  return (
    <Box className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <Box className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <Typography variant="h4" align="center" gutterBottom>
          My History
        </Typography>

        {/* Tabs */}
        <Box className="mb-6">
          <AppBar position="static" className="bg-white rounded-t-2xl shadow-none">
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab value="pickup" label="Pickup Requests" icon={<LocalShipping />} iconPosition="start" />
              <Tab value="confirmation" label="Confirmations" icon={<AssignmentTurnedIn />} iconPosition="start" />
              <Tab value="report" label="Reports" icon={<Report />} iconPosition="start" />
            </Tabs>
          </AppBar>
        </Box>

        {/* Pickup Requests */}
        {activeTab === "pickup" && (
          <Card className="rounded-2xl shadow-lg mb-6">
            <CardContent>
              <Typography variant="h6" className="mb-4 flex items-center gap-2">
                <LocalShipping /> Pickup Requests
              </Typography>
              <TableContainer component={Paper} sx={tableStyle}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Quantity (kg)</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Notes</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pickupRequests.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.user_name}</TableCell>
                        <TableCell>{row.user_email}</TableCell>
                        <TableCell>{row.user_phone}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>{row.notes}</TableCell>
                        <TableCell>
                          {row.image_url ? (
                            <img
                              src={row.image_url}
                              alt="pickup"
                              style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
                            />
                          ) : (
                            "No Image"
                          )}
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Edit">
                            <IconButton onClick={() => handleEditClick(row)}>
                              <EditIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleDeleteClick(row.id)}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {/* Confirmations */}
        {activeTab === "confirmation" && (
          <Card className="rounded-2xl shadow-lg mb-6">
            <CardContent>
              <Typography variant="h6" className="mb-4 flex items-center gap-2">
                <AssignmentTurnedIn /> Confirmations
              </Typography>
              <TableContainer component={Paper} sx={tableStyle}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Waste Type</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Amount Paid</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Collector</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {confirmations.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.user_name}</TableCell>
                        <TableCell>{row.user_email}</TableCell>
                        <TableCell>{row.user_phone}</TableCell>
                        <TableCell>{row.waste_type}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>{row.amount_paid}</TableCell>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>{row.collector_name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {/* Reports */}
        {activeTab === "report" && (
          <Card className="rounded-2xl shadow-lg mb-6">
            <CardContent>
              <Typography variant="h6" className="mb-4 flex items-center gap-2">
                <Report /> Reports
              </Typography>
              <TableContainer component={Paper} sx={tableStyle}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Notes</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reports.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.user_name}</TableCell>
                        <TableCell>{row.user_email}</TableCell>
                        <TableCell>{row.user_phone}</TableCell>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>{row.notes}</TableCell>
                        <TableCell>
                          <Tooltip title="Edit">
                            <IconButton onClick={() => handleEditReportClick(row)}>
                              <EditIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleDeleteReport(row.id)}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>Edit {selectedRequest?.type === "report" ? "Report" : "Pickup Request"}</DialogTitle>
          <DialogContent className="space-y-4">
            {selectedRequest && (
              <>
                <TextField
                  label="Location"
                  name="location"
                  fullWidth
                  value={selectedRequest.location}
                  onChange={handleEditChange}
                />
                <TextField
                  label="Notes"
                  name="notes"
                  fullWidth
                  multiline
                  rows={3}
                  value={selectedRequest.notes}
                  onChange={handleEditChange}
                />
                {selectedRequest.type === "pickup" && (
                  <TextField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    fullWidth
                    value={selectedRequest.quantity}
                    onChange={handleEditChange}
                  />
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleEditSave}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default UserHistoryRequest;
