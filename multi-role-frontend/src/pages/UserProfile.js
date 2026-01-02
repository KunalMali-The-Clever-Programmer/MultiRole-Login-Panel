import React, { useState, useEffect } from "react";
import { Paper, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    axios.get("http://localhost:1212/api/users/me", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then(res => setUser(res.data));
  }, []);

  const handleUpdate = () => {
    axios.put(`http://localhost:1212/api/users/${user.id}`, user, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then(() => alert("Profile updated!"));
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: 400 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Profile</Typography>
      <TextField label="Username" fullWidth sx={{ mb: 2 }} value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} />
      <TextField label="Email" fullWidth sx={{ mb: 2 }} value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
      <Button variant="contained" onClick={handleUpdate}>Update</Button>
    </Paper>
  );
};

export default UserProfile;
