import React, { useEffect, useState } from "react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
//   Tooltip,
  Chip,
  MenuItem,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosConfig";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const SIDEBAR_WIDTH = 260;

const AdminActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    axiosInstance.get("/admin/activity-log").then((res) => setLogs(res.data));
  }, []);

  const icon = (status) => {
    switch (status?.toLowerCase()) {
      case "success":
        return <CheckCircleIcon sx={{ color: "#16a34a" }} />;
      case "failed":
        return <CancelIcon sx={{ color: "#dc2626" }} />;
      default:
        return <HourglassEmptyIcon sx={{ color: "#b45309" }} />;
    }
  };

  const filtered = filter === "ALL" ? logs : logs.filter((l) => l.action === filter);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
      }}
    >
      <Sidebar role="ADMIN" />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Topbar stays full width */}
        <Box sx={{ position: "sticky", top: 0, zIndex: 900 }}>
          <Topbar />
        </Box>

        {/* Content with left margin only */}
        <Box sx={{ mt: 12, px: 4, pb: 6, ml: `${SIDEBAR_WIDTH + 50}px` }}>
          <Container maxWidth="lg">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Typography
                sx={{
                  mb: 3,
                  fontWeight: 900,
                  fontSize: 32,
                  letterSpacing: 1,
                  background: "linear-gradient(90deg,#2563eb,#3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Admin Activity Log
              </Typography>
            </motion.div>

            {/* FILTER DROPDOWN */}
            <TextField
              select
              size="small"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{ mb: 3, width: 260, "& .MuiInputLabel-root": { fontWeight: 600 } }}
              label="Filter by Action"
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="LOGIN">LOGIN</MenuItem>
              <MenuItem value="CREATE_USER">CREATE_USER</MenuItem>
              <MenuItem value="UPDATE_USER">UPDATE_USER</MenuItem>
              <MenuItem value="DELETE_USER">DELETE_USER</MenuItem>
              <MenuItem value="ASSIGN_MANAGER">ASSIGN_MANAGER</MenuItem>
              <MenuItem value="APPROVE_MANAGER_REQUEST">APPROVE_MANAGER_REQUEST</MenuItem>
              <MenuItem value="REJECT_MANAGER_REQUEST">REJECT_MANAGER_REQUEST</MenuItem>
              
            </TextField>

            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                border: "1px solid rgba(59,130,246,0.25)",
                overflowX: "auto",
              }}
            >
              {filtered.length === 0 ? (
                <Typography sx={{ textAlign: "center", py: 6, color: "#64748b", fontStyle: "italic" }}>
                  No activity found.
                </Typography>
              ) : (
                <Table sx={{ minWidth: 700 }}>
                  <TableHead>
                    <TableRow
                      sx={{
                        background: "rgba(59,130,246,0.05)",
                        "& th": { fontWeight: 700, color: "#0f172a" },
                      }}
                    >
                      <TableCell>Action</TableCell>
                      <TableCell>By</TableCell>
                      <TableCell>Details</TableCell>
                      <TableCell>Date / Time</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filtered.map((log, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                        }}
                      >
                        <TableCell sx={{ fontWeight: 600 }}>{log.action}</TableCell>
                        <TableCell>{log.username}</TableCell>
                        <TableCell>{log.details}</TableCell>
                        <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                        <TableCell>
                          <Chip
                            icon={icon(log.status)}
                            label={log.status?.toUpperCase()}
                            sx={{
                              fontWeight: 600,
                              bgcolor:
                                log.status?.toLowerCase() === "success"
                                  ? "rgba(34,197,94,0.18)"
                                  : log.status?.toLowerCase() === "failed"
                                  ? "rgba(239,68,68,0.18)"
                                  : "rgba(245,158,11,0.18)",
                              color:
                                log.status?.toLowerCase() === "success"
                                  ? "#15803d"
                                  : log.status?.toLowerCase() === "failed"
                                  ? "#b91c1c"
                                  : "#b45309",
                            }}
                          />
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Paper>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminActivityLog;
