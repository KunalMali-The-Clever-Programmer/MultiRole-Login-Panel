import React, { useState, useEffect } from "react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { AccountCircle, Email, Lock, Shield } from "@mui/icons-material";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosConfig";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/user/profile");
      console.log("User data",res.data)
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   setSaving(true);
  //   try {
  //     await axiosInstance.put("/user/profile", profile);
  //     alert("Profile updated");
  //     fetchProfile();
  //   } catch (err) {
  //     alert("Update failed");
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  const handleSave = async (e) => {
  e.preventDefault();
  setSaving(true);
  try {
    // Only send the fields you want to update
    const updates = {
      email: profile.email
    };

    await axiosInstance.put("/user/profile", updates);
    alert("Profile updated");
    fetchProfile();
  } catch (err) {
    alert("Update failed");
  } finally {
    setSaving(false);
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
          <Container maxWidth="sm">
            {/* Page Title */}
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
                My Profile
              </Typography>
            </motion.div>

            {/* Form Card */}
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
                  boxShadow: "0 16px 36px rgba(15,23,42,0.15)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 22px 42px rgba(15,23,42,0.25)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {/* Username */}
                <Tooltip title="Your unique username" arrow>
                  <TextField
                    label="Username"
                    value={profile.username || ""}
                    disabled
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.75)",
                      borderRadius: 2,
                      transition: "all 0.25s ease",
                      "& .MuiInputBase-root": {
                        "&:hover fieldset": { borderColor: "#3b82f6" },
                        "&.Mui-focused fieldset": {
                          borderColor: "#2563eb",
                          boxShadow: "0 0 8px rgba(37,99,235,0.3)",
                        },
                      },
                    }}
                  />
                </Tooltip>

                {/* Email */}
                <Tooltip title="Your registered email" arrow>
                  <TextField
                    label="Email"
                    value={profile.email || ""}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.75)",
                      borderRadius: 2,
                      transition: "all 0.25s ease",
                      "& .MuiInputBase-root": {
                        "&:hover fieldset": { borderColor: "#3b82f6" },
                        "&.Mui-focused fieldset": {
                          borderColor: "#2563eb",
                          boxShadow: "0 0 8px rgba(37,99,235,0.3)",
                        },
                      },
                    }}
                  />
                </Tooltip>

                {/* Role */}
                <Tooltip title="Your role in the system" arrow>
                  <TextField
                    label="Role"
                    value="USER"
                    disabled
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Shield color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.75)",
                      borderRadius: 2,
                      transition: "all 0.25s ease",
                      "& .MuiInputBase-root": {
                        "&:hover fieldset": { borderColor: "#3b82f6" },
                        "&.Mui-focused fieldset": {
                          borderColor: "#2563eb",
                          boxShadow: "0 0 8px rgba(37,99,235,0.3)",
                        },
                      },
                    }}
                  />
                </Tooltip>

                {/* Save Button */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
                    color: "#fff",
                    fontWeight: 700,
                    py: 1.5,
                    borderRadius: 3,
                    boxShadow: "0 8px 18px rgba(59,130,246,0.28)",
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 12px 28px rgba(59,130,246,0.35)",
                      background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                    },
                  }}
                  onClick={handleSave}
                  disabled={saving}
                >
                  Save
                </Button>
              </Paper>
            </motion.div>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
