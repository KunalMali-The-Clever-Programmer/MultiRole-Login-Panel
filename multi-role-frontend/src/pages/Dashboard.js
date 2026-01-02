import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";

const Dashboard = () => {
  const role = localStorage.getItem("role") || "USER";

  return (
    <Box sx={{ padding: 4 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          {role} Dashboard
        </Typography>
      </motion.div>

      <Box sx={{ display: "flex", gap: 3 }}>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Paper
            elevation={4}
            sx={{
              padding: 3,
              width: 250,
              height: 130,
              textAlign: "center",
            }}
          >
            Users
          </Paper>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Paper
            elevation={4}
            sx={{
              padding: 3,
              width: 250,
              height: 130,
              textAlign: "center",
            }}
          >
            Last Login
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Dashboard;
