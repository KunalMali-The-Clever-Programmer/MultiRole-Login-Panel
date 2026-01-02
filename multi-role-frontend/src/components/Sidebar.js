import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import PersonIcon from "@mui/icons-material/Person";
import LockResetIcon from "@mui/icons-material/LockReset";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import HistoryIcon from "@mui/icons-material/History";

import SecurityIcon from '@mui/icons-material/Security';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const drawerWidth = 260;

const Sidebar = () => {
  const { role } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        ...styles.sidebar,
        width: collapsed ? 82 : drawerWidth,
      }}
    >
      {/* Header */}
      <div style={styles.header}>
        <button
          style={styles.hamburgerBtn}
          onClick={() => setCollapsed(!collapsed)}
        >
          ☰
        </button>
        {!collapsed && <span style={styles.logo}>Multi-Role Panel</span>}
      </div>

      {/* Menu */}
      <div style={styles.menu}>
        <NavItem to="/" label="Home" icon="🏠" collapsed={collapsed} />

        {/* ADMIN */}
        {role === "ADMIN" && (
          <>
            {!collapsed && <Section title="Admin" />}
            <NavItem to="/admin" label="Dashboard" icon="📊" collapsed={collapsed} />
            <NavItem to="/admin/users/add" label="Add User" icon="➕" collapsed={collapsed} />
            <NavItem to="/admin/users/assignmanager" label="Assigned Manager" icon="🧑‍💼" collapsed={collapsed} />
            <NavItem
              to="/admin/requests"
              label="Manager Requests"
              icon="✅"
              collapsed={collapsed}
            />

            <NavItem
              to="/admin/activity-log"
              label="Activity Log"
              icon={<HistoryIcon />}
              collapsed={collapsed}
            />    
               
            <NavItem
              to="/admin/security-logs"
              label="Security Logs"
              icon={<VpnKeyIcon  />}
              collapsed={collapsed}
            />       
          </>
        )}

        {/* MANAGER */}
        {role === "MANAGER" && (
          <>
            {!collapsed && <Section title="Manager" />}
            <NavItem to="/manager" label="Dashboard" icon="👥" collapsed={collapsed} />
            <NavItem
              to="/manager/request-user"
              label="Request User"
              icon="📩"
              collapsed={collapsed}
            />
          </>
        )}

        {/* USER */}
        {role === "USER" && (
          <>
            {!collapsed && <Section title="User" />}
            <NavItem
              to="/user"
              label="Dashboard"
              icon={<DashboardCustomizeIcon />}
              collapsed={collapsed}
            />
            <NavItem
              to="/user/profile"
              label="My Profile"
              icon={<PersonIcon />}
              collapsed={collapsed}
            />
            <NavItem
              to="/user/change-password"
              label="Change Password"
              icon={<LockResetIcon />}
              collapsed={collapsed}
            />
            <NavItem
              to="/user/manager"
              label="My Manager"
              icon={<SupervisorAccountIcon />}
              collapsed={collapsed}
            />
            <NavItem
              to="/user/activity-log"
              label="Activity Log"
              icon={<HistoryIcon />}
              collapsed={collapsed}
            />
          </>
        )}
      </div>
    </div>
  );
};

const NavItem = ({ to, label, icon, collapsed }) => (
  <NavLink
    to={to}
    style={({ isActive }) => ({
      ...styles.item,
      ...(isActive ? styles.activeItem : {}),
      justifyContent: collapsed ? "center" : "flex-start",
    })}
  >
    <span style={styles.icon}>{icon}</span>
    {!collapsed && <span>{label}</span>}
  </NavLink>
);

const Section = ({ title }) => <div style={styles.section}>{title}</div>;

const styles = {
  sidebar: {
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    transition: "width 0.3s",
    background: "#f8fafc",
    borderRight: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    height: 72,
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    gap: 12,
  },
  hamburgerBtn: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
  },
  logo: {
    fontWeight: 900,
    fontSize: 16,
  },
  menu: {
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  section: {
    marginTop: 16,
    marginBottom: 6,
    fontSize: 11,
    fontWeight: 700,
    color: "#64748b",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 14px",
    borderRadius: 10,
    textDecoration: "none",
    color: "#334155",
    fontWeight: 600,
  },
  activeItem: {
    background: "#e0f2fe",
    color: "#0369a1",
  },
  icon: {
    width: 22,
    textAlign: "center",
  },
};

export default Sidebar;
