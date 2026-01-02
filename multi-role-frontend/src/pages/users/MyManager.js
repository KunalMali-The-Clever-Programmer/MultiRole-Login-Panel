import React, { useEffect, useState } from "react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import { Box, Container, Paper, Typography, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import axios from "../../api/axiosConfig";

const MyManager = () => {
  const [manager, setManager] = useState(null);

  const fetchManager = async () => {
    try {
      const res = await axios.get("/user/profile");
      setManager(res.data.manager);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchManager();
  }, []);

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
                My Manager
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Paper
                sx={{
                  p: 5,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  boxShadow: "0 12px 28px rgba(15,23,42,0.12)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 18px 36px rgba(15,23,42,0.2)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {!manager ? (
                  <Typography sx={{ color: "#64748b", fontStyle: "italic" }}>
                    No manager assigned.
                  </Typography>
                ) : (
                  <>
                    <Tooltip title="Manager Name" arrow>
                      <Typography>👤 <strong>Name:</strong> {manager.username}</Typography>
                    </Tooltip>
                    <Tooltip title="Manager Email" arrow>
                      <Typography>📧 <strong>Email:</strong> {manager.email}</Typography>
                    </Tooltip>
                    <Tooltip title="Manager Role" arrow>
                      <Typography>🛡 <strong>Role:</strong> {manager.role?.name || manager.role}</Typography>
                    </Tooltip>
                  </>
                )}
              </Paper>
            </motion.div>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default MyManager;
