import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  alpha,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import StoreIcon from "@mui/icons-material/Store";
import SendIcon from "@mui/icons-material/Send";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { motion } from "framer-motion";

const API_URL = "http://127.0.0.1:5000";
const COLORS = ["#FFBB28", "#00C49F", "#4CAF50", "#8884D8"];

// ---------------- Styled Components ----------------
const StatCard = styled(Paper, { shouldForwardProp: (prop) => prop !== "highlight" })(
  ({ theme, color, highlight }) => ({
    padding: theme.spacing(2.5),
    borderRadius: "16px",
    background: highlight
      ? `linear-gradient(135deg, ${alpha(theme.palette[color].light, 0.4)} 0%, ${alpha(
          theme.palette[color].light,
          0.2
        )} 100%)`
      : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(
          theme.palette.background.paper,
          0.9
        )} 100%)`,
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    backdropFilter: "blur(8px)",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: theme.shadows[8],
      borderColor: alpha(theme.palette[color].main, 0.4),
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 4,
      background: `linear-gradient(90deg, ${theme.palette[color].main}, ${theme.palette[color].light})`,
      borderRadius: "16px 16px 0 0",
    },
  })
);

const IconWrapper = styled(Box)(({ theme, color }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 50,
  height: 50,
  borderRadius: "12px",
  background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.15)} 0%, ${alpha(
    theme.palette[color].main,
    0.08
  )} 100%)`,
  marginBottom: theme.spacing(2),
  border: `1px solid ${alpha(theme.palette[color].main, 0.2)}`,
}));

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: "16px",
  background: theme.palette.background.paper,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const DashboardHeader = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(
    theme.palette.primary.light,
    0.05
  )} 100%)`,
  padding: theme.spacing(3),
  borderRadius: "16px",
  marginBottom: theme.spacing(4),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

// ---------------- Dashboard Component ----------------
const Dashboard = () => {
  const [stats, setStats] = useState({
    pending: 0,
    accepted: 0,
    completed: 0,
    deleted: 0,
    stored: 0,
    sentToRecycler: 0,
  });
  const [highlight, setHighlight] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lineData, setLineData] = useState([]);
  const [completedPickups, setCompletedPickups] = useState([]);
  const [collectorStore, setCollectorStore] = useState([]);
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  const prevStatsRef = useRef(stats);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const axiosAuth = axios.create({ baseURL: API_URL, headers });

  // ---------------- Fetch Dashboard Stats ----------------
  const fetchStats = async () => {
    try {
      const pickupRes = await axiosAuth.get("/pickup-request/all");
      const storeRes = await axiosAuth.get("/collector-store/");

      const completed = pickupRes.data.filter((r) => r.status === "Completed");

      const newStats = {
        pending: pickupRes.data.filter((r) => r.status === "Pending").length,
        accepted: pickupRes.data.filter((r) => r.status === "Accepted").length,
        completed: completed.length,
        deleted: pickupRes.data.filter((r) => r.status === "Deleted").length,
        stored: storeRes.data.length,
        sentToRecycler: storeRes.data.filter((r) => r.sent_to_recycler).length,
      };

      // Highlight effect
      const newHighlight = {};
      Object.keys(newStats).forEach((key) => {
        newHighlight[key] = newStats[key] > prevStatsRef.current[key];
      });
      setHighlight(newHighlight);
      setTimeout(() => setHighlight({}), 1000);

      prevStatsRef.current = newStats;
      setStats(newStats);
      setCompletedPickups(completed);
      setCollectorStore(storeRes.data);

      // Update line chart
      setLineData((prev) => {
        const newData = [...prev.slice(-9), { 
          name: new Date().toLocaleTimeString(), 
          ...newStats 
        }];
        return newData.length > 10 ? newData.slice(1) : newData;
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderCard = (title, count, color, Icon, statKey) => (
    <Grid item xs={6} md={4} lg={2}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <StatCard elevation={0} color={color} highlight={highlight[statKey]}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <IconWrapper color={color}>
              <Icon sx={{ fontSize: 24, color: `${color}.main` }} />
            </IconWrapper>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 600, 
                mb: 0.5, 
                color: "text.secondary", 
                textAlign: "center",
                fontSize: isMobile ? "0.7rem" : "0.875rem"
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: "bold", 
                color: "text.primary",
                fontSize: isMobile ? "1.2rem" : "1.5rem"
              }}
            >
              {count}
            </Typography>
          </Box>
        </StatCard>
      </motion.div>
    </Grid>
  );

  const barData = [
    { name: "Pending", value: stats.pending },
    { name: "Accepted", value: stats.accepted },
    { name: "Completed", value: stats.completed },
    { name: "Deleted", value: stats.deleted },
  ];

  const pieData = [
    { name: "Stored", value: stats.stored },
    { name: "Sent to Recycler", value: stats.sentToRecycler },
  ];

  // ---------------- Table Renderer ----------------
  const renderSimpleTable = (title, data, columns) => (
    <ChartContainer sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        <TrendingUpIcon sx={{ mr: 1, color: "primary.main" }} />
        {title}
      </Typography>
      <TableContainer sx={{ maxHeight: 400, borderRadius: "8px" }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell 
                  key={col}
                  sx={{ 
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    fontWeight: "bold",
                    py: 1
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0, 5).map((row) => (
              <TableRow key={row.id} hover>
                {columns.map((col) => (
                  <TableCell key={col} sx={{ py: 1.5 }}>
                    {col === "Collector Name" ? row.collector?.name || "-" :
                     col === "Email" ? row.collector?.email || "-" :
                     col === "Phone" ? row.collector?.phone_number || "-" :
                     col === "Location" ? row.pickup_request?.location || "-" :
                     col === "Waste Image" ? (row.pickup_request?.image_url ? 
                       <img src={row.pickup_request.image_url} alt="Waste" width={40} style={{ borderRadius: "4px" }} /> 
                       : "-") :
                     col === "Stored Quantity" ? row.stored_quantity || row.quantity :
                     col === "Stored At" ? new Date(row.stored_at || row.created_at).toLocaleDateString() :
                     col === "ID" ? `#${row.id}` : 
                     col === "Quantity" ? row.quantity :
                     col === "Status" ? 
                       <Chip 
                         label={row.status} 
                         size="small" 
                         color={
                           row.status === "Completed" ? "success" :
                           row.status === "Pending" ? "warning" :
                           row.status === "Accepted" ? "info" : "error"
                         }
                       /> : "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length === 0 && (
        <Typography variant="body2" sx={{ textAlign: "center", py: 3, color: "text.secondary" }}>
          No data available
        </Typography>
      )}
      {data.length > 5 && (
        <Typography variant="body2" sx={{ textAlign: "center", pt: 1, color: "primary.main" }}>
          Showing 5 of {data.length} entries
        </Typography>
      )}
    </ChartContainer>
  );

  return (
    <Box sx={{ p: { xs: 1.5, md: 3 }, minHeight: "100vh", background: alpha(theme.palette.primary.light, 0.03) }}>
      {/* Dashboard Header */}
      <DashboardHeader>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <DashboardIcon sx={{ fontSize: 32, color: "primary.main", mr: 1.5 }} />
          <Typography variant="h4" fontWeight="700" color="primary.dark">
            Dashboard Overview
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: "text.secondary", display: "flex", alignItems: "center" }}>
          <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
          Real-time statistics of your pickups and collector store
        </Typography>
      </DashboardHeader>

      {/* Loading/Error */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "300px" }}>
          <CircularProgress size={60} thickness={4} sx={{ color: "primary.main" }} />
        </Box>
      ) : error ? (
        <Paper sx={{ p: 3, textAlign: "center", background: alpha(theme.palette.error.light, 0.1) }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      ) : (
        <>
          {/* Stat Cards */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {renderCard("Pending", stats.pending, "warning", PendingActionsIcon, "pending")}
            {renderCard("Accepted", stats.accepted, "info", CheckCircleIcon, "accepted")}
            {renderCard("Completed", stats.completed, "success", TaskAltIcon, "completed")}
            {renderCard("Deleted", stats.deleted, "error", DeleteForeverIcon, "deleted")}
            {renderCard("Stored", stats.stored, "primary", StoreIcon, "stored")}
            {renderCard("To Recycler", stats.sentToRecycler, "success", SendIcon, "sentToRecycler")}
          </Grid>

          {/* Charts */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} lg={4}>
              <ChartContainer>
                <Typography variant="subtitle1" mb={2} color="primary.dark" fontWeight="600">
                  Pickup Status Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: "8px", 
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}` 
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[4, 4, 0, 0]}
                      fill={theme.palette.primary.main}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Grid>

            <Grid item xs={12} lg={4}>
              <ChartContainer>
                <Typography variant="subtitle1" mb={2} color="primary.dark" fontWeight="600">
                  Activity Trends
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: "8px", 
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}` 
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="pending" 
                      stroke="#FFBB28" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="accepted" 
                      stroke="#00C49F" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="completed" 
                      stroke={theme.palette.primary.main} 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="deleted" 
                      stroke="#FF8042" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Grid>

            <Grid item xs={12} lg={4}>
              <ChartContainer>
                <Typography variant="subtitle1" mb={2} color="primary.dark" fontWeight="600">
                  Storage Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie 
                      data={pieData} 
                      dataKey="value" 
                      nameKey="name" 
                      outerRadius={80} 
                      innerRadius={50}
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: "8px", 
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}` 
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Grid>
          </Grid>

          {/* Tables Section */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {renderSimpleTable("Recent Completed Pickups", completedPickups, ["ID", "Quantity", "Location", "Status"])}
            </Grid>
            <Grid item xs={12} md={6}>
              {renderSimpleTable("Collector Store Items", collectorStore, ["ID", "Collector Name", "Stored Quantity", "Stored At"])}
            </Grid>
            <Grid item xs={12}>
              {renderSimpleTable("Sent to Recycler", collectorStore.filter((c) => c.sent_to_recycler), ["ID", "Collector Name", "Email", "Stored Quantity", "Stored At"])}
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Dashboard;