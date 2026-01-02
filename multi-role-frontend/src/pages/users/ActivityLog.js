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
  Tooltip,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosConfig";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await axiosInstance.get("/user/activity-log");
      setLogs(res.data);
    } catch (err) {
      console.error("Error fetching activity logs:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "success":
        return <CheckCircleIcon sx={{ color: "#22c55e" }} />;
      case "failed":
        return <CancelIcon sx={{ color: "#ef4444" }} />;
      default:
        return <HourglassEmptyIcon sx={{ color: "#f59e0b" }} />;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
      }}
    >
      {/* Sidebar */}
      <Sidebar role="USER" />

      {/* Main content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <Box sx={{ width: "100%", position: "sticky", top: 0, zIndex: 900 }}>
          <Topbar />
        </Box>

        {/* Content */}
        <Box sx={{ mt: 12, px: 3, pb: 5 }}>
          <Container maxWidth="md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h4"
                sx={{
                  mb: 4,
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: 0.5,
                  textShadow: "0 2px 6px rgba(0,0,0,0.08)",
                }}
              >
                Activity Log
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  boxShadow: "0 12px 28px rgba(15,23,42,0.12)",
                  border: "1px solid rgba(59,130,246,0.25)",
                  transition: "all 0.3s ease",
                  overflowX: "auto",
                }}
              >
                {logs.length === 0 ? (
                  <Typography
                    sx={{
                      color: "#64748b",
                      fontStyle: "italic",
                      textAlign: "center",
                      py: 5,
                    }}
                  >
                    No activity found.
                  </Typography>
                ) : (
                  <Table sx={{ minWidth: 600 }}>
                    <TableHead>
                      <TableRow
                        sx={{
                          background: "rgba(59,130,246,0.05)",
                          "& th": { fontWeight: 700, color: "#0f172a" },
                        }}
                      >
                        <TableCell>Action</TableCell>
                        <TableCell>Date / Time</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {logs.map((log, idx) => (
                        <motion.tr
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          style={{
                            cursor: "pointer",
                          }}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                          }}
                        >
                          <TableCell>
                            <Tooltip title="Performed action" arrow>
                              {log.action}
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Action date/time" arrow>
                              {new Date(log.timestamp).toLocaleString()}
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Status of action" arrow>
                              <Chip
                                icon={getStatusIcon(log.status)}
                                label={log.status}
                                sx={{
                                  background:
                                    log.status.toLowerCase() === "success"
                                      ? "rgba(34,197,94,0.1)"
                                      : log.status.toLowerCase() === "failed"
                                      ? "rgba(239,68,68,0.1)"
                                      : "rgba(245,158,11,0.1)",
                                  color:
                                    log.status.toLowerCase() === "success"
                                      ? "#16a34a"
                                      : log.status.toLowerCase() === "failed"
                                      ? "#b91c1c"
                                      : "#b45309",
                                  fontWeight: 600,
                                }}
                              />
                            </Tooltip>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </Paper>
            </motion.div>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default ActivityLog;
