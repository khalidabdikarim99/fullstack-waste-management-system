import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const API_URL = "http://127.0.0.1:5000";

const CollectorPickups = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/pickup-request/all`, { headers });
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to fetch pickup requests");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.patch(
        `${API_URL}/pickup-request/${id}/status`,
        { status },
        { headers }
      );

      // Set user-friendly message based on status
      let message = "";
      switch (status) {
        case "Pending":
          message = "Pickup is pending. The user has been notified to wait for acceptance.";
          break;
        case "Accepted":
          message = "Pickup has been accepted. The user has been notified and will await completion.";
          break;
        case "Completed":
          message = "Pickup successfully completed. Notification sent to the user.";
          break;
        case "Deleted":
          message = "Pickup request deleted. User has been notified.";
          break;
        default:
          message = `Pickup status updated to "${status}"`;
      }

      setSuccessMsg(message);
      fetchRequests(); // Refresh list
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to update status");
    }
  };

  const deleteRequest = async (id) => {
    try {
      await axios.delete(`${API_URL}/pickup-request/${id}`, { headers });
      setSuccessMsg("Pickup request deleted. User has been notified.");
      fetchRequests(); // Refresh list
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to delete request");
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMsg("");
    setError("");
  };

  return (
    <Paper className="p-6">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="600">
          Pickup Requests
        </Typography>
        <Button variant="outlined" onClick={fetchRequests}>
          Refresh
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((req) => {
              const isFinal = req.status === "Completed" || req.status === "Deleted";
              return (
                <TableRow key={req.id}>
                  <TableCell>{req.user_name}</TableCell>
                  <TableCell>{req.user_email}</TableCell>
                  <TableCell>{req.user_phone}</TableCell>
                  <TableCell>{req.quantity}</TableCell>
                  <TableCell>{req.location}</TableCell>
                  <TableCell>{req.notes}</TableCell>
                  <TableCell>
                    {isFinal ? (
                      <Typography>{req.status}</Typography>
                    ) : (
                      <Select
                        value={req.status || "Pending"}
                        onChange={(e) => updateStatus(req.id, e.target.value)}
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Accepted">Accepted</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Deleted">Deleted</MenuItem>
                      </Select>
                    )}
                  </TableCell>
                  <TableCell>
                    {!isFinal && (
                      <Button color="error" onClick={() => deleteRequest(req.id)}>
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      {/* Snackbar for success messages */}
      <Snackbar
        open={!!successMsg}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {successMsg}
        </Alert>
      </Snackbar>

      {/* Snackbar for error messages */}
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CollectorPickups;
