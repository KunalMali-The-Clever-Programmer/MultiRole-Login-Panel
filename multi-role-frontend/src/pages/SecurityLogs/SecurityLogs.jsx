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
  Chip,
  TextField,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosConfig";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const SecurityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/admin/logs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(res.data);
    } catch (err) {
      console.error("Error fetching logs:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((l) =>
    ((l.email || "") + (l.ipAddress || "") + (l.device || "") + (l.browser || ""))
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <Box sx={{ width: "100%", position: "sticky", top: 0, zIndex: 900 }}>
          <Topbar />
        </Box>

        {/* Content */}
        <Box sx={{ mt: 12, px: 3, pb: 5, ml: "200px" }}>
          <Container maxWidth="lg">
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
                Security Login Logs
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by email / IP / device / browser"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 3 }}
              />

              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  boxShadow: "0 12px 28px rgba(15,23,42,0.12)",
                  border: "1px solid rgba(59,130,246,0.25)",
                  overflowX: "auto",
                }}
              >
                {filteredLogs.length === 0 ? (
                  <Typography
                    sx={{
                      color: "#64748b",
                      fontStyle: "italic",
                      textAlign: "center",
                      py: 5,
                    }}
                  >
                    No logs found.
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
                        <TableCell>Email</TableCell>
                        <TableCell>IP</TableCell>
                        <TableCell>Device</TableCell>
                        <TableCell>Browser</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Map</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filteredLogs.map((l, idx) => (
                        <motion.tr
                          key={l.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell>{l.email || "Unknown"}</TableCell>
                          <TableCell>{l.ipAddress || "Unknown"}</TableCell>
                          <TableCell>{l.device || "Unknown"}</TableCell>
                          <TableCell>{l.browser ? l.browser.slice(0, 15) : "Unknown"}</TableCell>
                          <TableCell>
                            <Chip
                              label={l.loginStatus || "UNKNOWN"}
                              sx={{
                                fontWeight: 600,
                                color: l.loginStatus === "FAILED" ? "#ef4444" : "#87908aff",
                                backgroundColor:
                                  l.loginStatus === "FAILED"
                                    ? "rgba(239,68,68,0.1)"
                                    : "rgba(34,197,94,0.1)",
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            {l.createdAt ? new Date(l.createdAt).toLocaleString() : "Unknown"}
                          </TableCell>
                          <TableCell>
                            {l.latitude && l.longitude ? (
                              <Button
                                startIcon={<LocationOnIcon />}
                                size="small"
                                onClick={() =>
                                  window.open(
                                    `https://maps.google.com/?q=${l.latitude},${l.longitude}`
                                  )
                                }
                              >
                                Map
                              </Button>
                            ) : (
                              "N/A"
                            )}
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

export default SecurityLogs;
