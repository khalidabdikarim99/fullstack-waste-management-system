import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";

const API_URL = "http://127.0.0.1:5000";

const History = () => {
  const [requests, setRequests] = useState({
    pending: [],
    accepted: [],
    completed: [],
    deleted: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/pickup-request/all`, { headers });

      // Categorize by status
      const categorized = {
        pending: res.data.filter((r) => r.status === "Pending"),
        accepted: res.data.filter((r) => r.status === "Accepted"),
        completed: res.data.filter((r) => r.status === "Completed"),
        deleted: res.data.filter((r) => r.status === "Deleted"),
      };

      setRequests(categorized);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  const renderList = (title, items, color) => (
    <Paper className="p-4 mb-4" elevation={3}>
      <Typography variant="h6" sx={{ color, mb: 2 }}>
        {title} ({items.length})
      </Typography>
      {items.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No records found.
        </Typography>
      ) : (
        <List>
          {items.map((req) => (
            <React.Fragment key={req.id}>
              <ListItem>
                <ListItemText
                  primary={`${req.user_name} - ${req.quantity} items`}
                  secondary={`Location: ${req.location} | Notes: ${req.notes || "None"}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );

  return (
    <Box className="p-6">
      <Typography variant="h5" fontWeight="600" gutterBottom>
        Pickup Request History
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          {renderList("Pending Requests", requests.pending, "orange")}
          {renderList("Accepted Requests", requests.accepted, "blue")}
          {renderList("Completed Requests", requests.completed, "green")}
          {renderList("Deleted Requests", requests.deleted, "red")}
        </>
      )}
    </Box>
  );
};

export default History;
