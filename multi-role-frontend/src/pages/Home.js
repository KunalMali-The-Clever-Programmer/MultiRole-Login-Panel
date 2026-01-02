import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaUserShield, FaChartLine, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Home.css";

/* Floating animation for wireframes */
const float = {
  animate: {
    y: [0, -25, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  }
};

/* Fade up animation */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
};

const Home = () => {
  return (
    <div className="home-container">
      {/* Animated Background Blobs */}
      <div className="bg-animated">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Navbar */}
      <nav className="navbar glass">
        <h2 className="logo">Multi-Role SaaS Auth</h2>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1.3 }}
        >
          Secure & Intelligent <br />
          <span>Multi-Role Authentication</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Enterprise-level authentication for Admins, Managers, and Users with real-time analytics and monitoring.
        </motion.p>

        {/* Hero Buttons with Icons */}
        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Link to="/login" className="btn-primary btn-icon">
            <FaSignInAlt className="btn-icon-left" />
            Login
          </Link>
          <Link to="/register" className="btn-secondary btn-icon">
            <FaUserPlus className="btn-icon-left" />
            Create Account
          </Link>
        </motion.div>

        {/* Wireframes Section */}
        <div className="wireframes">
          <motion.div className="wf-wrapper" {...float} whileHover={{ scale: 1.05 }}>
            <img src="https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=600&q=80" alt="Dashboard UI" className="wf" />
          </motion.div>

          <motion.div className="wf-wrapper" {...float} whileHover={{ scale: 1.07 }}>
            <img src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" alt="Coding Animation" className="wf" />
          </motion.div>

          <motion.div className="wf-wrapper" {...float} whileHover={{ scale: 1.05 }}>
            <img src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=600&q=80" alt="Security UI" className="wf" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <FeatureCard
          icon={<FaUserShield />}
          title="Admin Control"
          desc="Full control over users, roles, permissions, and audit logs with advanced reporting."
        />
        <FeatureCard
          icon={<FaUsers />}
          title="Manager Dashboard"
          desc="Monitor teams, assignments, and performance insights in real-time."
        />
        <FeatureCard
          icon={<FaChartLine />}
          title="Activity Tracking"
          desc="Live logs with secure access history and analytics dashboards."
        />
      </section>

      {/* Stats Section */}
      <section className="stats">
        <Stat number="100%" label="Secure Auth" />
        <Stat number="3+" label="User Roles" />
        <Stat number="Live" label="Tracking" />
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Multi-Role SaaS Authentication System
      </footer>
    </div>
  );
};

/* Feature Card */
const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    className="feature-card glass"
    whileHover={{ y: -15, scale: 1.08 }}
    transition={{ duration: 0.3 }}
  >
    <div className="icon">{icon}</div>
    <h3>{title}</h3>
    <p>{desc}</p>
  </motion.div>
);

/* Stat Card */
const Stat = ({ number, label }) => (
  <motion.div
    className="stat"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
  >
    <h2>{number}</h2>
    <p>{label}</p>
  </motion.div>
);

export default Home;
