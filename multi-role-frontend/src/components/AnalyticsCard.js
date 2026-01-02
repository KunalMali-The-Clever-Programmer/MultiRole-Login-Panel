import React from "react";
import { Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";

const AnalyticsCard = ({ title, value }) => (
  <motion.div whileHover={{ scale: 1.05 }}>
    <Paper elevation={6} sx={{ padding: 3, width: 200, textAlign: "center", margin: 1 }}>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>{value}</Typography>
    </Paper>
  </motion.div>
);

export default AnalyticsCard;
