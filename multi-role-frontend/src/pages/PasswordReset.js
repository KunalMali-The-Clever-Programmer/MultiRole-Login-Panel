import React, { useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import axios from "axios";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    axios.post("http://localhost:1212/api/auth/password-reset", { email })
      .then(() => alert("Password reset link sent!"));
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      <Paper sx={{ padding: 5, width: 350 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Reset Password</Typography>
        <TextField fullWidth label="Email" sx={{ mb: 3 }} value={email} onChange={e => setEmail(e.target.value)} />
        <Button variant="contained" fullWidth onClick={handleReset}>Send Link</Button>
      </Paper>
    </Box>
  );
};

export default PasswordReset;
