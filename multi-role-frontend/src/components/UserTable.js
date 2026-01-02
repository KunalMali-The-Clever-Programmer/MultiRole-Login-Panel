import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Chip,
  TextField,
  MenuItem,
  Typography,
  Paper,
  TablePagination,
} from "@mui/material";
import {
  EditRounded,
  DeleteRounded,
  AdminPanelSettingsRounded,
  SupervisorAccountRounded,
  PersonRounded,
  SearchRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionTableRow = motion(TableRow);

const roleIcon = (role) => {
  switch (role) {
    case "ADMIN":
      return <AdminPanelSettingsRounded fontSize="small" />;
    case "MANAGER":
      return <SupervisorAccountRounded fontSize="small" />;
    default:
      return <PersonRounded fontSize="small" />;
  }
};

const UserTable = ({ users = [], onDelete }) => {
  const nav = useNavigate();
  const [filterRole, setFilterRole] = useState("ALL");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  useEffect(() => setPage(0), [filterRole, search]);

  const filteredUsers = users
    .filter((u) =>
      filterRole === "ALL" ? true : (u.role?.name || u.role) === filterRole
    )
    .filter(
      (u) =>
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ borderRadius: 3, overflow: "hidden" }}>
      {/* FILTER BAR */}
      <Paper
        sx={{
          mb: 3,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 3,
          backdropFilter: "blur(18px)",
          backgroundColor: "rgba(255,255,255,0.85)",
          boxShadow: "0 12px 28px rgba(15,23,42,0.12)",
          border: "1px solid rgba(59,130,246,0.25)",
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
          Filter Users
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* 🔥 PREMIUM SEARCH */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: 2,
              px: 1.8,
              height: 40,
              borderRadius: 2,
              minWidth: 280,
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(59,130,246,0.35)",
              boxShadow: "0 6px 16px rgba(59,130,246,0.15)",
              transition: "0.3s",
              "&:focus-within": {
                boxShadow: "0 0 0 3px rgba(59,130,246,0.25)",
                transform: "scale(1.02)",
              },
            }}
          >
            <SearchRounded sx={{ fontSize: 18, color: "#2563eb", mr: 1 }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users by username or email"
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 13.5,
                color: "#0f172a",
              }}
            />
          </Box>

          {/* ROLE FILTER */}
          <TextField
            select
            size="small"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            sx={{
              minWidth: 160,
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              background: "rgba(243,244,246,0.8)",
              borderRadius: 1,
            }}
          >
            <MenuItem value="ALL">All</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="MANAGER">Manager</MenuItem>
            <MenuItem value="USER">User</MenuItem>
          </TextField>
        </Box>
      </Paper>

      {/* TABLE */}
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {["ID", "Username", "Email", "Role", "Manager ID", "Last Login", "Actions"].map(
              (h) => (
                <TableCell key={h} sx={{
                  fontWeight: 700,
                  fontSize: 13,
                  backgroundColor: "rgba(59,130,246,0.05)",
                  position: "sticky",
                  top: 0,
                  zIndex: 1000,
                }}>{h}</TableCell>
              )
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedUsers.map((u, i) => {
            const role = u.role?.name || u.role;
            return (
              <MotionTableRow
                key={u.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                whileHover={{ scale: 1.01 }}
                sx={{
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, rgba(59,130,246,0.08), rgba(147,197,253,0.08))",
                  },
                }}
              >
                <TableCell>{u.id}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{u.username}</TableCell>
                <TableCell sx={{ color: "#475569" }}>{u.email}</TableCell>

                <TableCell>
                  <Chip
                    icon={roleIcon(role)}
                    label={role}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      ...(role === "ADMIN" && { background: "#fee2e2", color: "#991b1b" }),
                      ...(role === "MANAGER" && { background: "#dcfce7", color: "#166534" }),
                    }}
                  />
                </TableCell>

                <TableCell>{u.manager ? u.manager.id : u.managerId || "-"}</TableCell>
                <TableCell sx={{ color: "#475569" }}>
                  {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : "-"}
                </TableCell>

                <TableCell>
                  <IconButton
                    size="small"
                    sx={{ mr: 0.5, background: "#e0f2fe" }}
                    onClick={() => nav(`/admin/users/edit/${u.id}`)}
                  >
                    <EditRounded fontSize="small" />
                  </IconButton>

                  <IconButton
                    size="small"
                    sx={{ background: "#fee2e2" }}
                    onClick={() => onDelete(u.id)}
                  >
                    <DeleteRounded fontSize="small" />
                  </IconButton>
                </TableCell>
              </MotionTableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <TablePagination
        component="div"
        count={filteredUsers.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 8, 10, 20]}
        sx={{
          background: "rgba(255,255,255,0.9)",
          borderTop: "1px solid rgba(0,0,0,0.1)",
        }}
      />
    </Box>
  );
};

export default UserTable;
