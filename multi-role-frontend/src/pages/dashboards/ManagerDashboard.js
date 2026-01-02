import React, { useEffect, useState, useContext } from "react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import axios from "../../api/axiosConfig";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { PersonRounded, AlternateEmailRounded } from "@mui/icons-material";

const SIDEBAR_WIDTH = 260;
const TOPBAR_HEIGHT = 72;

const MotionTableRow = motion(TableRow);

const ManagerDashboard = () => {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/user/assigned-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching assigned users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Topbar />
      <Sidebar role="MANAGER" />

      <Box
        sx={{
          ml: `${SIDEBAR_WIDTH + 28}px`,
          mt: `${TOPBAR_HEIGHT + 28}px`,
          mr: 3,
        }}
      >
        <Container maxWidth="lg">
          {/* Page Title */}
          <Typography sx={styles.title}>Manager Dashboard</Typography>
          <Typography sx={styles.subtitle}>Users assigned to you</Typography>

          {/* Table Card */}
          <Box sx={styles.card}>
            {loading ? (
              <Typography sx={styles.stateText}>
                Loading assigned users...
              </Typography>
            ) : users.length === 0 ? (
              <Typography sx={styles.stateText}>
                No assigned users found.
              </Typography>
            ) : (
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {["ID", "Username", "Email"].map((h) => (
                      <TableCell
                        key={h}
                        sx={{
                          ...styles.headCell,
                          position: "sticky",
                          top: 0,
                          zIndex: 1000,
                          backgroundColor: "#e0f2fe", // aligned with page
                          color: "#1e293b", // dark text
                          fontWeight: 700,
                          borderBottom: "1px solid rgba(0,0,0,0.1)",
                        }}
                      >
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {users.map((u, i) => (
                    <MotionTableRow
                      key={u.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.04 }}
                      whileHover={{
                        scale: 1.01,
                        background:
                          "linear-gradient(90deg, rgba(59,130,246,0.05), rgba(147,197,253,0.05))",
                      }}
                      sx={styles.row}
                    >
                      <TableCell sx={styles.cell}>{u.id}</TableCell>

                      <TableCell sx={styles.cellStrong}>
                        <Chip
                          icon={<PersonRounded fontSize="small" />}
                          label={u.username}
                          size="small"
                          sx={styles.userChip}
                        />
                      </TableCell>

                      <TableCell sx={styles.cellMuted}>
                        <AlternateEmailRounded sx={{ fontSize: 14, mr: 0.5 }} />
                        {u.email}
                      </TableCell>
                    </MotionTableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

/* ---------------- STYLES ---------------- */
const styles = {
  title: {
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: 1,
    background: "linear-gradient(90deg, #2563eb, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#475569",
    mb: 3,
  },
  card: {
    borderRadius: 4,
    overflow: "hidden",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,249,255,0.75))",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.45)",
    boxShadow: "0 35px 80px rgba(15,23,42,0.18)",
  },
  headCell: {
    fontSize: 13,
    letterSpacing: 0.6,
    textAlign: "left",
  },
  row: {
    transition: "all 0.25s ease",
    "&:hover": {
      boxShadow: "inset 0 0 0 1px rgba(59,130,246,0.2)",
    },
  },
  cell: {
    fontSize: 13,
    borderBottom: "1px solid rgba(226,232,240,0.6)",
    padding: "12px 16px",
  },
  cellStrong: {
    fontSize: 13,
    fontWeight: 700,
    borderBottom: "1px solid rgba(226,232,240,0.6)",
    padding: "12px 16px",
  },
  cellMuted: {
    fontSize: 12.5,
    color: "#475569",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid rgba(226,232,240,0.6)",
    padding: "12px 16px",
  },
  userChip: {
    fontWeight: 700,
    fontSize: 12,
    background: "linear-gradient(135deg, #e0f2fe, #bae6fd)",
    color: "#0369a1",
  },
  stateText: {
    p: 3,
    fontSize: 14,
    color: "#475569",
  },
};

export default ManagerDashboard;
