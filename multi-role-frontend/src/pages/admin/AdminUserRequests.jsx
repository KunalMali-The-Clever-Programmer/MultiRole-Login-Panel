import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
} from "@mui/material";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import axios from "../../api/axiosConfig";

const SIDEBAR_WIDTH = 260;
const TOPBAR_HEIGHT = 72;

const AdminUserRequests = () => {
  const [requests, setRequests] = useState([]);

  const load = async () => {
    const res = await axios.get("manager-requests/pending");
    setRequests(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Topbar />
      <Sidebar />

      <Box sx={{ ml: `${SIDEBAR_WIDTH + 28}px`, mt: `${TOPBAR_HEIGHT + 28}px` }}>
        <Container maxWidth="lg">
          <Paper sx={{ p: 3 }}>
            <Typography fontWeight={900} fontSize={22}>
              Manager Requests
            </Typography>

            <Table sx={{ mt: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Manager ID</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {requests.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.id}</TableCell>
                    <TableCell>{r.managerId}</TableCell>
                    <TableCell>{r.userId}</TableCell>
                    <TableCell>
                      <Button onClick={() => axios.post(`manager-requests/approve/${r.id}`).then(load)}>
                        Approve
                      </Button>
                      <Button color="error" onClick={() => axios.post(`manager-requests/reject/${r.id}`).then(load)}>
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default AdminUserRequests;
