import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const API_URL = "http://127.0.0.1:5000";

const Shipments = () => {
  const [collectorStore, setCollectorStore] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const axiosAuth = axios.create({
    baseURL: API_URL,
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });

  // Fetch collector store entries
  const fetchCollectorStore = async () => {
    setLoading(true);
    try {
      const res = await axiosAuth.get("/collector-store/");
      setCollectorStore(res.data);
    } catch (err) {
      console.error("Failed to fetch collector store:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollectorStore();
  }, []);

  // Determine status
  const getStatus = (entry) => {
    if (entry.sent_to_recycler) return "Completed";
    if (entry.accepted) return "Accepted";
    return "New";
  };

  // Accept a shipment (recycler)
  const handleAccept = async (entryId) => {
    try {
      await axiosAuth.patch(`/collector-store/${entryId}`, { accepted: true });
      setCollectorStore((prev) =>
        prev.map((entry) =>
          entry.id === entryId ? { ...entry, accepted: true } : entry
        )
      );
    } catch (err) {
      console.error("Failed to accept shipment:", err);
    }
  };

  // Delete a shipment (recycler)
  const handleDelete = async (entryId) => {
    try {
      // Fully remove from backend
      await axiosAuth.patch(`/collector-store/${entryId}`, { deleted: true });
      // Immediately remove from state
      setCollectorStore((prev) => prev.filter((entry) => entry.id !== entryId));
    } catch (err) {
      console.error("Failed to delete shipment:", err);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Recycler Dashboard: Shipments Overview
      </Typography>

      {loading ? (
        <Typography>Loading shipments...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Collector Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Pickup Location</TableCell>
                <TableCell>Waste Image</TableCell>
                <TableCell>Stored Quantity</TableCell>
                <TableCell>Stored At</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {collectorStore.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.id}</TableCell>
                  <TableCell>{entry.collector?.name || "-"}</TableCell>
                  <TableCell>{entry.collector?.email || "-"}</TableCell>
                  <TableCell>{entry.collector?.phone_number || "-"}</TableCell>
                  <TableCell>{entry.pickup_request?.location || "-"}</TableCell>
                  <TableCell>
                    {entry.pickup_request?.image_url ? (
                      <img
                        src={entry.pickup_request.image_url}
                        alt="Waste"
                        width={50}
                        style={{ borderRadius: "4px" }}
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>{entry.stored_quantity}</TableCell>
                  <TableCell>{entry.stored_at}</TableCell>
                  <TableCell>{getStatus(entry)}</TableCell>
                  <TableCell>
                    {!entry.accepted && (
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => handleAccept(entry.id)}
                        style={{ marginRight: 5 }}
                      >
                        Accept
                      </Button>
                    )}
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(entry.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Shipments;
