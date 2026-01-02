import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HomePage = () => (
  <Box sx={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", background: "linear-gradient(135deg, #6A11CB, #2575FC)", color: "white", textAlign: "center" }}>
    <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
      <Typography variant="h2" sx={{ fontWeight: "bold" }}>Welcome to Multi-Role Panel</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Secure Login • Role Based Dashboard • User Management</Typography>
    </motion.div>
    <motion.div style={{ marginTop: "30px" }} initial={{ scale: 0.7 }} animate={{ scale: 1 }}>
      <Button component={Link} to="/login" variant="contained" sx={{ marginRight: 2 }}>Login</Button>
      <Button component={Link} to="/register" variant="outlined" sx={{ color: "white", borderColor: "white" }}>Register</Button>
    </motion.div>
  </Box>
);

export default HomePage;
