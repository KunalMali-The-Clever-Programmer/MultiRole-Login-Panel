import React, { useEffect, useState } from "react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import { Box, Container, Paper, Typography, Button, Tooltip } from "@mui/material";
import axios from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SIDEBAR_WIDTH = 260;

const UserDashboard = () => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/user/profile");
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "linear-gradient(135deg, #f0f9ff, #e0f2fe)" }}>
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
                User Dashboard
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
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 3, fontWeight: 700, color: "#0f172a", letterSpacing: 0.5 }}
                >
                  Profile
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
                  <Tooltip title="Your unique username" arrow>
                    <Typography>👤 <strong>Username:</strong> {profile.username}</Typography>
                  </Tooltip>
                  <Tooltip title="Your registered email" arrow>
                    <Typography>📧 <strong>Email:</strong> {profile.email}</Typography>
                  </Tooltip>
                  <Tooltip title="Your role in the system" arrow>
                    <Typography>🛡 <strong>Role:</strong> {profile.role?.name || profile.role}</Typography>
                  </Tooltip>
                  <Tooltip title="Your manager info" arrow>
                    <Typography>
                      🧑‍💼 <strong>Manager:</strong>{" "}
                      {profile.manager ? `${profile.manager.username} (${profile.manager.email})` : "None"}
                    </Typography>
                  </Tooltip>
                </Box>

                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
                    color: "#fff",
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: "none",
                    boxShadow: "0 8px 18px rgba(59,130,246,0.28)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 12px 28px rgba(59,130,246,0.35)",
                      background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                    },
                  }}
                  onClick={() => navigate("/user/profile")}
                >
                  Edit Profile
                </Button>
              </Paper>
            </motion.div>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDashboard;
