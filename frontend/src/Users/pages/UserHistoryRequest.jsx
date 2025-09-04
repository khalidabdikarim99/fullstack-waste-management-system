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

const UserHistoryRequest = () => {
  const [activeTab, setActiveTab] = useState("pickup");
  const [pickupRequests, setPickupRequests] = useState([]);
  const [confirmations, setConfirmations] = useState([]);
  const [reports, setReports] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchHistory = async () => {
    try {
      const [pickupRes, confirmRes, reportRes] = await Promise.all([
        axios.get("http://localhost:5000/pickup-request/me", { headers }),
        axios.get("http://localhost:5000/pickup-confirmation/me", { headers }),
        axios.get("http://localhost:5000/pickup-report/me", { headers }),
      ]);

      console.log("Pickup Requests:", pickupRes.data);
      setPickupRequests(pickupRes.data);
      setConfirmations(confirmRes.data);
      setReports(reportRes.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  useEffect(() => {
    if (token) fetchHistory();
  }, [token]);

  const handleEditClick = (request) => {
    setSelectedRequest({ ...request });
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
        await axios.delete(`http://localhost:5000/pickup-request/${id}`, { headers });
        Swal.fire("Deleted!", "Your pickup request has been deleted.", "success");
        fetchHistory();
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Failed to delete request.", "error");
      }
    }
  };

  const handleEditChange = (e) => {
    setSelectedRequest((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/pickup-request/${selectedRequest.id}`,
        selectedRequest,
        { headers }
      );
      Swal.fire("Success", "Pickup request updated successfully.", "success");
      setEditDialogOpen(false);
      fetchHistory();
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error", "Failed to update request.", "error");
    }
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
              <Tab
                value="pickup"
                label="Pickup Requests"
                icon={<LocalShipping />}
                iconPosition="start"
              />
              <Tab
                value="confirmation"
                label="Confirmations"
                icon={<AssignmentTurnedIn />}
                iconPosition="start"
              />
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
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>{row.notes}</TableCell>
                        <TableCell>
                          {row.image_url ? (
                            <img
                              src={row.image_url}
                              alt="pickup"
                              style={{
                                width: 80,
                                height: 80,
                                objectFit: "cover",
                                borderRadius: 4,
                              }}
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
                      <TableCell>Location</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reports.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>{row.notes}</TableCell>
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
          <DialogTitle>Edit Pickup Request</DialogTitle>
          <DialogContent className="space-y-4">
            {selectedRequest && (
              <>
                <TextField
                  label="Quantity"
                  name="quantity"
                  type="number"
                  fullWidth
                  value={selectedRequest.quantity}
                  onChange={handleEditChange}
                />
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
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default UserHistoryRequest;
