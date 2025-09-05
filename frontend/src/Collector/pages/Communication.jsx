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
  TextField,
  Checkbox,
} from "@mui/material";
import { Add, Edit, Delete, Save, Send } from "@mui/icons-material";

const API_URL = "http://127.0.0.1:5000";

const Communication = () => {
  const [completedPickups, setCompletedPickups] = useState([]);
  const [collectorStore, setCollectorStore] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    pickup_request_id: "",
    stored_quantity: "",
    stored_at: "",
    sent_to_recycler: false,
  });

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // logged-in collector

  const axiosAuth = axios.create({
    baseURL: API_URL,
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });

  // Fetch completed pickups
  useEffect(() => {
    axiosAuth
      .get(`/pickup-request/all`)
      .then((res) => {
        const completed = res.data.filter((req) => req.status === "Completed");
        setCompletedPickups(completed);
      })
      .catch((err) => console.error(err));
  }, []);

  // Fetch collector store entries
  useEffect(() => {
    fetchCollectorStore();
  }, []);

  const fetchCollectorStore = () => {
    axiosAuth
      .get(`/collector-store/`)
      .then((res) => {
        setCollectorStore(res.data);
        // Mark pickups as Done automatically
        const storedIds = res.data.map((entry) => entry.pickup_request_id);
        setCompletedPickups((prev) =>
          prev.map((p) =>
            storedIds.includes(p.id) ? { ...p, selected: true } : p
          )
        );
      })
      .catch((err) => console.error(err));
  };

  const handleSelectPickup = (pickup) => {
    setFormData((prev) => ({
      ...prev,
      pickup_request_id: pickup.id,
      stored_quantity: pickup.quantity,
      stored_at: new Date().toISOString().slice(0, 16),
    }));
    // Mark pickup as selected
    setCompletedPickups((prev) =>
      prev.map((p) => (p.id === pickup.id ? { ...p, selected: true } : p))
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleAdd = () => {
    if (!user) {
      console.error("Collector not logged in");
      return;
    }

    const dataToSend = {
      pickup_request_id: formData.pickup_request_id,
      stored_quantity: formData.stored_quantity,
    };

    axiosAuth
      .post(`/collector-store/`, dataToSend)
      .then((res) => {
        fetchCollectorStore();
        setFormData({
          id: null,
          pickup_request_id: "",
          stored_quantity: "",
          stored_at: "",
          sent_to_recycler: false,
        });
        // Mark pickup as Done based on backend response
        const pickupId = res.data.pickup_request_id;
        setCompletedPickups((prev) =>
          prev.map((p) => (p.id === pickupId ? { ...p, selected: true } : p))
        );
      })
      .catch((err) => console.error(err));
  };

  const handleUpdate = () => {
    axiosAuth
      .patch(`/collector-store/${formData.id}`, formData)
      .then(() => {
        fetchCollectorStore();
        setFormData({
          id: null,
          pickup_request_id: "",
          stored_quantity: "",
          stored_at: "",
          sent_to_recycler: false,
        });
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axiosAuth
      .delete(`/collector-store/${id}`)
      .then(() => fetchCollectorStore())
      .catch((err) => console.error(err));
  };

  const handleMarkSent = (entry) => {
    axiosAuth
      .patch(`/collector-store/${entry.id}`, { sent_to_recycler: true })
      .then(() => fetchCollectorStore())
      .catch((err) => console.error(err));
  };

  const handleEdit = (entry) => {
    setFormData({
      id: entry.id,
      pickup_request_id: entry.pickup_request_id,
      stored_quantity: entry.stored_quantity,
      stored_at: entry.stored_at.slice(0, 16),
      sent_to_recycler: entry.sent_to_recycler,
    });
  };

  const sentEntries = collectorStore.filter((entry) => entry.sent_to_recycler);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Communication
      </Typography>

      {/* Completed Pickups Table */}
      <Typography variant="h6">Completed Pickups</Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completedPickups.map((pickup) => (
              <TableRow key={pickup.id}>
                <TableCell>{pickup.id}</TableCell>
                <TableCell>{pickup.quantity}</TableCell>
                <TableCell>{pickup.location}</TableCell>
                <TableCell>{pickup.status}</TableCell>
                <TableCell>
                  {pickup.selected ? (
                    <Button variant="contained" size="small" disabled>
                      Done
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleSelectPickup(pickup)}
                    >
                      Select
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Collector Store Form */}
      <Typography variant="h6">Add / Update Collector Store Entry</Typography>
      <Box mb={2} display="flex" gap={2} flexWrap="wrap">
        <TextField
          label="Pickup Request ID"
          name="pickup_request_id"
          value={formData.pickup_request_id}
          onChange={handleChange}
          disabled
        />
        <TextField
          label="Stored Quantity"
          name="stored_quantity"
          value={formData.stored_quantity}
          onChange={handleChange}
        />
        <TextField
          type="datetime-local"
          label="Stored At"
          name="stored_at"
          value={formData.stored_at}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <Checkbox
          name="sent_to_recycler"
          checked={formData.sent_to_recycler}
          onChange={handleChange}
        />
        <Typography>Sent?</Typography>
      </Box>

      <Box mb={3} display="flex" gap={2}>
        {formData.id ? (
          <Button
            variant="contained"
            color="success"
            startIcon={<Save />}
            onClick={handleUpdate}
          >
            Update
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAdd}
          >
            Add
          </Button>
        )}
      </Box>

      {/* Collector Store Table */}
      <Typography variant="h6">Collector Store Entries</Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Collector Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Waste Image</TableCell>
              <TableCell>Stored Quantity</TableCell>
              <TableCell>Stored At</TableCell>
              <TableCell>Sent</TableCell>
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
                    <img src={entry.pickup_request.image_url} alt="Waste" width={50} />
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>{entry.stored_quantity}</TableCell>
                <TableCell>{entry.stored_at}</TableCell>
                <TableCell>{entry.sent_to_recycler ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="secondary"
                    startIcon={<Edit />}
                    onClick={() => handleEdit(entry)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(entry.id)}
                  >
                    Delete
                  </Button>
                  {!entry.sent_to_recycler && (
                    <Button
                      size="small"
                      color="primary"
                      startIcon={<Send />}
                      onClick={() => handleMarkSent(entry)}
                    >
                      Mark Sent
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Sent Entries Table */}
      <Typography variant="h6">Sent to Recycler</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Collector Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Waste Image</TableCell>
              <TableCell>Stored Quantity</TableCell>
              <TableCell>Stored At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sentEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.id}</TableCell>
                <TableCell>{entry.collector?.name || "-"}</TableCell>
                <TableCell>{entry.collector?.email || "-"}</TableCell>
                <TableCell>{entry.collector?.phone_number || "-"}</TableCell>
                <TableCell>{entry.pickup_request?.location || "-"}</TableCell>
                <TableCell>
                  {entry.pickup_request?.image_url ? (
                    <img src={entry.pickup_request.image_url} alt="Waste" width={50} />
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>{entry.stored_quantity}</TableCell>
                <TableCell>{entry.stored_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Communication;
