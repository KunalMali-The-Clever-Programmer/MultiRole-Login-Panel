import React, { useEffect, useState, useContext } from "react";
import { Box, Container, Typography, Select, MenuItem, Button, Paper } from "@mui/material";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import axios from "../../api/axiosConfig";
import { AuthContext } from "../../context/AuthContext";

const SIDEBAR_WIDTH = 260;
const TOPBAR_HEIGHT = 72;

const ManagerRequestUser = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    axios
      .get("/user/unassigned", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]));
  }, []);

  const submitRequest = async () => {
    await axios.post(
      `/manager-requests/create?userId=${userId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Request sent to Admin");
    setUserId("");
  };

  return (
    <>
      <Topbar />
      <Sidebar />

      <Box sx={{ ml: `${SIDEBAR_WIDTH + 28}px`, mt: `${TOPBAR_HEIGHT + 28}px` }}>
        <Container maxWidth="sm">
          <Paper sx={{ p: 4 }}>
            <Typography fontWeight={900} fontSize={22}>
              Request Existing User
            </Typography>

            <Select
              fullWidth
              sx={{ mt: 3 }}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            >
              {users.map((u) => (
                <MenuItem key={u.id} value={u.id}>
                  {u.username} ({u.email})
                </MenuItem>
              ))}
            </Select>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={!userId}
              onClick={submitRequest}
            >
              Send Request
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ManagerRequestUser;
