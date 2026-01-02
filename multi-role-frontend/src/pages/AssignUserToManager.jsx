import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, Typography, Button, MenuItem, Select } from "@mui/material";

const AssignUserToManager = () => {
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedManager, setSelectedManager] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:1212/api/user/all");
      const allUsers = res.data;

      setUsers(allUsers.filter((u) => u.role.roleName === "USER"));
      setManagers(allUsers.filter((u) => u.role.roleName === "MANAGER"));
    } catch (err) {
      console.error(err);
    }
  };

  const assignUser = async () => {
    if (!selectedUser || !selectedManager) {
      alert("Please select user and manager");
      return;
    }

    try {
      await axios.put(
        `http://localhost:1212/api/user/assign/${selectedUser}/${selectedManager}`
      );

      alert("User assigned successfully!");
      setSelectedUser("");
      setSelectedManager("");
    } catch (err) {
      console.error(err);
      alert("Error assigning user");
    }
  };

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Card sx={{ width: 400, p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          Assign User to Manager
        </Typography>

        {/* Select User */}
        <Typography>Select User:</Typography>
        <Select
          fullWidth
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          sx={{ mb: 2 }}
        >
          {users.map((u) => (
            <MenuItem key={u.id} value={u.id}>
              {u.username}
            </MenuItem>
          ))}
        </Select>

        {/* Select Manager */}
        <Typography>Select Manager:</Typography>
        <Select
          fullWidth
          value={selectedManager}
          onChange={(e) => setSelectedManager(e.target.value)}
          sx={{ mb: 2 }}
        >
          {managers.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.username}
            </MenuItem>
          ))}
        </Select>

        <Button fullWidth variant="contained" onClick={assignUser}>
          Assign
        </Button>
      </Card>
    </Box>
  );
};

export default AssignUserToManager;
