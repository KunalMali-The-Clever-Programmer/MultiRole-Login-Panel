// import React from "react";
// import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const MotionButton = motion(Button);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <AppBar
//       position="sticky"
//       sx={{
//         background: "rgba(255, 255, 255, 0.1)",
//         backdropFilter: "blur(15px)",
//         boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
//         borderRadius: 3,
//         border: "1px solid rgba(255,255,255,0.18)",
//         zIndex: 2000,
//       }}
//     >
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: "bold",
//             fontSize: "1.7rem",
//             color: "#fff",
//             letterSpacing: 1.2,
//             textShadow: "0 0 10px rgba(0,255,255,0.5), 0 0 20px rgba(0, 128, 255,0.4)",
//             cursor: "pointer",
//           }}
//         >
//           Glass Panel
//         </Typography>

//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <MotionButton
//             component={Link}
//             to="/"
//             sx={styles.button}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Home
//           </MotionButton>

//           {!token && (
//             <>
//               <MotionButton
//                 component={Link}
//                 to="/login"
//                 sx={styles.button}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Login
//               </MotionButton>

//               <MotionButton
//                 component={Link}
//                 to="/register"
//                 sx={{ ...styles.button, background: "rgba(0, 245, 255, 0.3)", color: "#fff" }}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Register
//               </MotionButton>
//             </>
//           )}

//           {token && (
//             <MotionButton
//               onClick={handleLogout}
//               sx={{ ...styles.button, background: "rgba(255,76,41,0.3)", color: "#fff" }}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Logout
//             </MotionButton>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// const styles = {
//   button: {
//     mx: 1,
//     px: 3,
//     py: 1,
//     borderRadius: 3,
//     fontWeight: 600,
//     color: "#fff",
//     background: "rgba(0,198,255,0.3)",
//     backdropFilter: "blur(10px)",
//     border: "1px solid rgba(255,255,255,0.2)",
//     boxShadow: "0 4px 20px rgba(0,255,255,0.2)",
//     "&:hover": {
//       background: "rgba(0,198,255,0.5)",
//       boxShadow: "0 6px 30px rgba(0,255,255,0.4)",
//     },
//   },
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [hovered, setHovered] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const NavLinkItem = ({ label, path }) => (
    <Link
      to={path}
      onMouseEnter={() => setHovered(path)}
      onMouseLeave={() => setHovered(null)}
      style={{
        ...styles.link,
        ...(isActive(path) && styles.activeLink),
        ...(hovered === path && styles.hoverLink),
      }}
    >
      {label}
      {(hovered === path || isActive(path)) && (
        <span style={styles.linkGlow} />
      )}
    </Link>
  );

  return (
    <div style={styles.wrapper}>
      {/* Aurora glow layer */}
      <div style={styles.aurora} />

      <div style={styles.navbar}>
        {/* Brand */}
        <div style={styles.brand}>
          <div style={styles.logoOrb} />
          <span style={styles.brandText}>MultiRole</span>
        </div>

        {/* Nav Links */}
        <div style={styles.links}>
          <NavLinkItem label="Home" path="/" />

          {!token && <NavLinkItem label="Login" path="/login" />}
          {!token && <NavLinkItem label="Register" path="/register" />}

          {token && (
            <button
              onClick={handleLogout}
              style={styles.logoutBtn}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <span style={styles.logoutInnerGlow} />
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const styles = {
  wrapper: {
    position: "sticky",
    top: 12,
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    padding: 14,
  },

  /* Floating aurora light */
  aurora: {
    position: "absolute",
    width: "70%",
    height: 140,
    background:
      "radial-gradient(circle at 20% 50%, rgba(56,189,248,0.45), transparent 60%), radial-gradient(circle at 80% 50%, rgba(99,102,241,0.45), transparent 60%)",
    filter: "blur(60px)",
    zIndex: -1,
  },

  navbar: {
    width: "100%",
    maxWidth: 1320,
    padding: "22px 34px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    /* Deep glassmorphism */
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.04))",
    backdropFilter: "blur(26px)",
    WebkitBackdropFilter: "blur(26px)",
    borderRadius: 26,
    border: "1px solid rgba(255,255,255,0.28)",

    boxShadow:
      "0 35px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.35)",
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },

  logoOrb: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #38bdf8, #6366f1)",
    boxShadow: "0 0 35px rgba(99,102,241,1)",
  },

  brandText: {
    fontSize: 24,
    fontWeight: 800,
    background: "linear-gradient(90deg, #ffffff, #c7d2fe)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: 0.8,
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: 36,
  },

  link: {
    position: "relative",
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 500,
    color: "#e5e7eb",
    padding: "6px 6px",
    transition: "all 0.25s ease",
  },

  hoverLink: {
    color: "#ffffff",
    transform: "translateY(-1px)",
  },

  activeLink: {
    color: "#ffffff",
  },

  linkGlow: {
    position: "absolute",
    left: 0,
    bottom: -6,
    width: "100%",
    height: 2,
    borderRadius: 4,
    background: "linear-gradient(90deg, #38bdf8, #6366f1)",
    boxShadow: "0 0 14px rgba(99,102,241,1)",
  },

  /* ===== ULTRA RICH BUTTON ===== */
  logoutBtn: {
    position: "relative",
    padding: "10px 26px",
    borderRadius: 999,
    border: "1px solid rgba(239,68,68,0.55)",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 0.4,
    cursor: "pointer",
    color: "#fee2e2",
    background:
      "linear-gradient(135deg, rgba(239,68,68,0.45), rgba(239,68,68,0.15))",
    backdropFilter: "blur(8px)",
    boxShadow:
      "0 12px 30px rgba(239,68,68,0.55), inset 0 1px 0 rgba(255,255,255,0.35)",
    transition: "all 0.25s ease",
    overflow: "hidden",
  },

  logoutInnerGlow: {
    position: "absolute",
    inset: -20,
    background:
      "radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)",
    opacity: 0.6,
  },
};

export default Navbar;
