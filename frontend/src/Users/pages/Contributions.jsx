// src/User/pages/Contribution.jsx
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
  LocalShipping as PickupIcon,
  AssignmentTurnedIn as ConfirmIcon,
  Report as ReportIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";

const API_URL = "http://127.0.0.1:5000"; // Flask backend URL

const Contribution = () => {
  const [activeTab, setActiveTab] = useState("pickup");
  const [pickupRequests, setPickupRequests] = useState([]);
  const [confirmations, setConfirmations] = useState([]);
  const [reports, setReports] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch all contributions
  const fetchContributions = async () => {
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
      console.error("Error fetching contributions:", err);
      Swal.fire("Error", "Failed to fetch contributions.", "error");
    }
  };

  useEffect(() => {
    if (token) fetchContributions();
  }, [token]);

  // Open edit dialog
  const handleEditClick = (item) => {
    setSelectedItem({ ...item });
    setEditDialogOpen(true);
  };

  // Delete contribution
  const handleDeleteClick = async (id, type) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete this item.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/${type}/${id}`, { headers });
        Swal.fire("Deleted!", "Item has been deleted.", "success");
        fetchContributions();
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Failed to delete item.", "error");
      }
    }
  };

  // Handle edit input change
  const handleEditChange = (e) => {
    setSelectedItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Save edited contribution
  const handleEditSave = async () => {
    try {
      let type = activeTab === "pickup" ? "pickup-request" : activeTab === "confirmation" ? "pickup-confirmation" : "pickup-report";

      await axios.put(`${API_URL}/${type}/${selectedItem.id}`, selectedItem, { headers });
      Swal.fire("Success", "Updated successfully.", "success");
      setEditDialogOpen(false);
      fetchContributions();
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error", "Failed to update item.", "error");
    }
  };

  const tableStyle = { maxHeight: 400 };

  return (
    <Box className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <Box className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <Typography variant="h4" align="center" gutterBottom>
          My Contributions
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
              <Tab value="pickup" label="Pickup Requests" icon={<PickupIcon />} iconPosition="start" />
              <Tab value="confirmation" label="Confirmations" icon={<ConfirmIcon />} iconPosition="start" />
              <Tab value="report" label="Reports" icon={<ReportIcon />} iconPosition="start" />
            </Tabs>
          </AppBar>
        </Box>

        {/* Tables */}
        {activeTab === "pickup" && (
          <Card className="rounded-2xl shadow-lg mb-6">
            <CardContent>
              <Typography variant="h6" className="mb-4 flex items-center gap-2">
                <PickupIcon /> Pickup Requests
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
                            <IconButton onClick={() => handleDeleteClick(row.id, "pickup-request")}>
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

        {activeTab === "confirmation" && (
          <Card className="rounded-2xl shadow-lg mb-6">
            <CardContent>
              <Typography variant="h6" className="mb-4 flex items-center gap-2">
                <ConfirmIcon /> Confirmations
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
                      <TableCell>Actions</TableCell>
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
                        <TableCell>
                          <Tooltip title="Edit">
                            <IconButton onClick={() => handleEditClick(row)}>
                              <EditIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleDeleteClick(row.id, "pickup-confirmation")}>
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

        {activeTab === "report" && (
          <Card className="rounded-2xl shadow-lg mb-6">
            <CardContent>
              <Typography variant="h6" className="mb-4 flex items-center gap-2">
                <ReportIcon /> Reports
              </Typography>
              <TableContainer component={Paper} sx={tableStyle}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Location</TableCell>
                      <TableCell>Notes</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reports.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>{row.notes}</TableCell>
                        <TableCell>
                          <Tooltip title="Edit">
                            <IconButton onClick={() => handleEditClick(row)}>
                              <EditIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleDeleteClick(row.id, "pickup-report")}>
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
          <DialogTitle>Edit Contribution</DialogTitle>
          <DialogContent className="space-y-4">
            {selectedItem && (
              <>
                {activeTab !== "report" && (
                  <>
                    {activeTab !== "confirmation" && (
                      <TextField
                        label="Quantity"
                        name="quantity"
                        type="number"
                        fullWidth
                        value={selectedItem.quantity}
                        onChange={handleEditChange}
                      />
                    )}
                    <TextField
                      label="Location"
                      name="location"
                      fullWidth
                      value={selectedItem.location}
                      onChange={handleEditChange}
                    />
                    {activeTab === "confirmation" && (
                      <>
                        <TextField
                          label="Waste Type"
                          name="waste_type"
                          fullWidth
                          value={selectedItem.waste_type}
                          onChange={handleEditChange}
                        />
                        <TextField
                          label="Amount Paid"
                          name="amount_paid"
                          type="number"
                          fullWidth
                          value={selectedItem.amount_paid}
                          onChange={handleEditChange}
                        />
                        <TextField
                          label="Collector Name"
                          name="collector_name"
                          fullWidth
                          value={selectedItem.collector_name}
                          onChange={handleEditChange}
                        />
                        <TextField
                          label="Collector Email"
                          name="collector_email"
                          fullWidth
                          value={selectedItem.collector_email}
                          onChange={handleEditChange}
                        />
                        <TextField
                          label="Collector Phone"
                          name="collector_phone"
                          fullWidth
                          value={selectedItem.collector_phone}
                          onChange={handleEditChange}
                        />
                      </>
                    )}
                  </>
                )}
                {activeTab === "report" && (
                  <TextField
                    label="Notes"
                    name="notes"
                    fullWidth
                    multiline
                    rows={3}
                    value={selectedItem.notes}
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
            <Button onClick={handleEditSave} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Contribution;
