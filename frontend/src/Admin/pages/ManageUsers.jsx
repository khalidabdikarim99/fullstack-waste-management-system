import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Delete, CheckCircle } from "@mui/icons-material";

const API_URL = "http://127.0.0.1:5000";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/users`);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      Swal.fire("Error", "Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await axios.put(`${API_URL}/admin/users/approve/${userId}`);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, status: "accepted" } : user
        )
      );
      Swal.fire("Success", "User approved successfully", "success");
    } catch (err) {
      console.error("Error approving user:", err);
      Swal.fire("Error", "Failed to approve user", "error");
    }
  };

  const handleDelete = async (userId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be marked as deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(`${API_URL}/admin/users/delete/${userId}`);
        setUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, status: "deleted" } : user
          )
        );
        Swal.fire("Deleted!", "User has been deleted", "success");
      } catch (err) {
        console.error("Error deleting user:", err);
        Swal.fire("Error", "Failed to delete user", "error");
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center mt-6">
        <CircularProgress />
      </div>
    );

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>

      {users.length === 0 ? (
        <Typography>No users found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  style={{
                    backgroundColor:
                      user.status === "deleted" ? "#f5f5f5" : "transparent",
                  }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.phone_number}</TableCell>
                  <TableCell>{user.address || "-"}</TableCell>
                  <TableCell>
                    {user.status === "accepted" ? (
                      <Typography color="green">Approved</Typography>
                    ) : user.status === "deleted" ? (
                      <Typography color="red">Deleted</Typography>
                    ) : (
                      <Typography color="orange">Pending</Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {user.status === "pending" && (
                      <IconButton
                        color="success"
                        onClick={() => handleApprove(user.id)}
                      >
                        <CheckCircle />
                      </IconButton>
                    )}
                    {user.status !== "deleted" && (
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ManageUsers;
