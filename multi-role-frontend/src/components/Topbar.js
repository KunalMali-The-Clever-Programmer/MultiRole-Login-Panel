import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const SidebarWidth = 260;
const SidebarCollapsedWidth = 82;

const Topbar = () => {
  const { username, role, logout } = useContext(AuthContext);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Calculate dynamic margin for sidebar
  const sidebarWidth = sidebarCollapsed ? SidebarCollapsedWidth : SidebarWidth;

  const MotionSpan = motion.span;
  const MotionButton = motion.button;

  return (
    <div
      style={{
        ...styles.topbarWrapper,
        marginLeft: sidebarWidth + 20, // minor extra space on left
        marginRight: sidebarWidth + 20, // optional extra space on right for balance
      }}
    >
      <div style={styles.topbar}>
        <div style={styles.left}>
          <MotionSpan
            style={styles.title}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.05, textShadow: "0 0 12px rgba(59,130,246,0.6), 0 0 25px rgba(37,99,235,0.5)" }}
          >
         {role === "USER"
      ? "User Dashboard"
      : role === "MANAGER"
      ? "Manager Dashboard"
      : "Admin Dashboard"}
          </MotionSpan>
        </div>

        <div style={styles.right}>
          {role && (
            <MotionSpan
              style={styles.roleBadge}
              initial={{ y: 0 }}
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              whileHover={{ scale: 1.12, boxShadow: "0 6px 18px rgba(56,189,248,0.35)" }}
            >
              {role}
            </MotionSpan>
          )}

          {username && (
            <MotionSpan
              style={styles.username}
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              whileHover={{
                scale: 1.12,
                color: "#2563eb",
                textShadow: "0 0 8px rgba(37,99,235,0.6)",
              }}
            >
              {username}
            </MotionSpan>
          )}

          <MotionButton
            style={styles.logoutBtn}
            onClick={logout}
            whileHover={{ scale: 1.12, rotateZ: 2, boxShadow: "0 12px 28px rgba(239,68,68,0.45)" }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </MotionButton>
        </div>
      </div>
    </div>
  );
};

const styles = {
  topbarWrapper: {
    width: "calc(100% - 2 * 260px)", // dynamically adjusted
    display: "flex",
    justifyContent: "center",
    padding: 0,
    position: "fixed",
    top: 0,
    zIndex: 999,
    transition: "margin 0.35s ease, width 0.35s ease",
  },
  topbar: {
    width: "100%",
    maxWidth: 1320,
    height: 62,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    background: "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(240,249,255,0.6))",
    backdropFilter: "blur(18px)",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.45)",
    boxShadow: "0 12px 28px rgba(15,23,42,0.12)",
    overflow: "hidden",
  },
  left: { display: "flex", alignItems: "center", gap: 12 },
  title: {
    fontSize: 18,
    fontWeight: 800,
    background: "linear-gradient(90deg, #3b82f6, #60a5fa, #2563eb)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: 1,
  },
  right: { display: "flex", alignItems: "center", gap: 16 },
  roleBadge: {
    padding: "6px 16px",
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 999,
    color: "#fff",
    background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
    boxShadow: "0 4px 12px rgba(59,130,246,0.3)",
    cursor: "default",
  },
  username: {
    fontSize: 14,
    fontWeight: 700,
    background: "linear-gradient(90deg, #2563eb, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: 0.5,
  },
  logoutBtn: {
    padding: "8px 22px",
    borderRadius: 999,
    border: "none",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    color: "#fff",
    background: "linear-gradient(135deg, #ef4444, #f87171)",
    boxShadow: "0 8px 20px rgba(239,68,68,0.3)",
  },
};

export default Topbar;
