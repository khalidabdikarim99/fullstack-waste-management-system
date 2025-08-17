import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Alert,
  Box,
  Divider,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  History as HistoryIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

const API_BASE_URL = "http://127.0.0.1:5000/api";

const UserHistoryRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/collection-request`);
      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/collection-request/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete request");
      }
      setRequests(requests.filter((req) => req.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClick = (req) => {
    setCurrentRequest({ ...req });
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    setCurrentRequest({ ...currentRequest, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/collection-request/${currentRequest.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentRequest),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update request");
      }
      await fetchRequests();
      setEditOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: "white" }}>
        {/* Title */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "rgb(34, 197, 94)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <HistoryIcon sx={{ mr: 1 }} />
          Collection History
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{ mb: 3, color: "text.secondary" }}
        >
          View all your previous waste collection requests
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Loading */}
        {loading && (
          <Box display="flex" justifyContent="center" my={3}>
            <CircularProgress color="success" />
          </Box>
        )}

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Table */}
        {!loading && !error && requests.length > 0 && (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "rgb(240, 253, 244)" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Waste Type</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Frequency</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Notes</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Photo</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.wasteType}</TableCell>
                  <TableCell>{req.quantity}</TableCell>
                  <TableCell>{req.collectionDate}</TableCell>
                  <TableCell>{req.collectionTime}</TableCell>
                  <TableCell>{req.frequency}</TableCell>
                  <TableCell>{req.address}</TableCell>
                  <TableCell>{req.notes || "-"}</TableCell>
                  <TableCell>
                    {req.photo ? (
                      <a
                        href={`${API_BASE_URL}/uploads/${req.photo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "rgb(34, 197, 94)",
                          fontWeight: "bold",
                        }}
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(req)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(req.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* No Data */}
        {!loading && !error && requests.length === 0 && (
          <Alert severity="info">No collection requests found.</Alert>
        )}

        {/* Edit Dialog */}
        {currentRequest && (
          <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth>
            <DialogTitle>Edit Request</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Waste Type"
                name="wasteType"
                value={currentRequest.wasteType || ""}
                onChange={handleEditChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Quantity"
                name="quantity"
                value={currentRequest.quantity || ""}
                onChange={handleEditChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Collection Date"
                name="collectionDate"
                value={currentRequest.collectionDate || ""}
                onChange={handleEditChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Collection Time"
                name="collectionTime"
                value={currentRequest.collectionTime || ""}
                onChange={handleEditChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Frequency"
                name="frequency"
                value={currentRequest.frequency || ""}
                onChange={handleEditChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Address"
                name="address"
                value={currentRequest.address || ""}
                onChange={handleEditChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Notes"
                name="notes"
                value={currentRequest.notes || ""}
                onChange={handleEditChange}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditOpen(false)}>Cancel</Button>
              <Button onClick={handleEditSave} variant="contained" color="success">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Paper>
    </Container>
  );
};

export default UserHistoryRequest;
