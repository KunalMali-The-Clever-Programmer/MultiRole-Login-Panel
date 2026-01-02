import React, { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

const Layout = ({ children, role }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={styles.app}>
      <Sidebar role={role} collapsed={collapsed} />
      <div style={styles.main}>
        <Topbar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafc",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    padding: 24,
  },
};

export default Layout;
