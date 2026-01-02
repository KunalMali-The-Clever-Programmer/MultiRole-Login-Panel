// import React, { useContext } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// /* Public pages */
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ForgotPassword from "./components/ForgotPassword";

// /* Dashboards */
// import AdminDashboard from "./pages/dashboards/AdminDashboard";
// import ManagerDashboard from "./pages/dashboards/ManagerDashboard";
// import UserDashboard from "./pages/dashboards/UserDashboard";

// /* Admin pages */
// import AddUser from "./pages/users/AddUser";
// import EditUser from "./pages/users/EditUser";
// import AssignManager from "./pages/admin/AssignManager";
// import AssignUserToManager from "./pages/AssignUserToManager";
// import AdminUserRequests from "./pages/admin/AdminUserRequests";

// /* Manager pages */
// import ManagerRequestUser from "./pages/manager/ManagerRequestUser";

// /* User pages */
// import Profile from "./pages/users/Profile";
// import ChangePassword from "./pages/users/ChangePassword";
// import MyManager from "./pages/users/MyManager";
// import ActivityLog from "./pages/users/ActivityLog";

// /* Auth */
// import { AuthContext } from "./context/AuthContext";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import OAuthRedirect from "./pages/OAuthRedirect";

// function App() {
//   const { role } = useContext(AuthContext);

//   const redirectByRole = () => {
//     if (role === "ADMIN") return <Navigate to="/admin" replace />;
//     if (role === "MANAGER") return <Navigate to="/manager" replace />;
//     if (role === "USER") return <Navigate to="/user" replace />;
//     return null;
//   };

//   return (
//     <Routes>
//       {/* ================= PUBLIC ================= */}
//       <Route path="/" element={<Home />} />
//       <Route path="/home" element={<Home />} />

//       <Route
//         path="/login"
//         element={role ? redirectByRole() : <Login />}
//       />

//       <Route
//         path="/register"
//         element={role ? redirectByRole() : <Register />}
//       />

//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/oauth2/redirect" element={<OAuthRedirect />} />


//       {/* ================= ADMIN ================= */}
//       <Route
//         path="/admin/*"
//         element={<ProtectedRoute requiredRole="ADMIN" />}
//       >
//         <Route index element={<AdminDashboard />} />
//         <Route path="users/add" element={<AddUser />} />
//         <Route path="users/edit/:id" element={<EditUser />} />
//         <Route path="users/assignmanager" element={<AssignManager />} />
//         <Route path="assign-user" element={<AssignUserToManager />} />

//         {/* 🔥 NEW FEATURE */}
//         <Route path="requests" element={<AdminUserRequests />} />
//       </Route>

//       {/* ================= MANAGER ================= */}
//       <Route
//         path="/manager/*"
//         element={<ProtectedRoute requiredRole="MANAGER" />}
//       >
//         <Route index element={<ManagerDashboard />} />

//         {/* 🔥 NEW FEATURE */}
//         <Route path="request-user" element={<ManagerRequestUser />} />
//       </Route>

//       {/* ================= USER ================= */}
//       <Route
//         path="/user/*"
//         element={<ProtectedRoute requiredRole="USER" />}
//       >
//         <Route index element={<UserDashboard />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="change-password" element={<ChangePassword />} />
//         <Route path="manager" element={<MyManager />} />
//         <Route path="activity-log" element={<ActivityLog />} />
//       </Route>

//       {/* ================= FALLBACK ================= */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// export default App;


import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* Public pages */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./components/ForgotPassword";
import OAuthRedirect from "./pages/OAuthRedirect";

/* Dashboards */
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import ManagerDashboard from "./pages/dashboards/ManagerDashboard";
import UserDashboard from "./pages/dashboards/UserDashboard";

/* Admin pages */
import AddUser from "./pages/users/AddUser";
import EditUser from "./pages/users/EditUser";
import AssignManager from "./pages/admin/AssignManager";
import AssignUserToManager from "./pages/AssignUserToManager";
import AdminUserRequests from "./pages/admin/AdminUserRequests";

/* Manager pages */
import ManagerRequestUser from "./pages/manager/ManagerRequestUser";

/* User pages */
import Profile from "./pages/users/Profile";
import ChangePassword from "./pages/users/ChangePassword";
import MyManager from "./pages/users/MyManager";
import ActivityLog from "./pages/users/ActivityLog";

/* Auth */
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminActivityLog from "./pages/admin/AdminActivityLog";

/*  Security Logs  */
import SecurityLogs from "./pages/SecurityLogs/SecurityLogs";

function App() {
  const { role } = useContext(AuthContext);

  return (
    <Routes>

      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      <Route
        path="/login"
        element={
          role ? <Navigate to={`/${role.toLowerCase()}`} replace /> : <Login />
        }
      />

      <Route
        path="/register"
        element={
          role ? <Navigate to={`/${role.toLowerCase()}`} replace /> : <Register />
        }
      />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/oauth2/redirect" element={<OAuthRedirect />} />


      {/* ================= ADMIN ================= */}
      <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users/add" element={<AddUser />} />
        <Route path="/admin/users/edit/:id" element={<EditUser />} />
        <Route path="/admin/users/assignmanager" element={<AssignManager />} />
        <Route path="/admin/assign-user" element={<AssignUserToManager />} />
        <Route path="/admin/requests" element={<AdminUserRequests />} />
        <Route path="/admin/activity-log" element={<AdminActivityLog />} />
         <Route path="/admin/security-logs" element={<SecurityLogs />} />


      </Route>


      {/* ================= MANAGER ================= */}
      <Route element={<ProtectedRoute requiredRole="MANAGER" />}>
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/manager/request-user" element={<ManagerRequestUser />} />
      </Route>


      {/* ================= USER ================= */}
      <Route element={<ProtectedRoute requiredRole="USER" />}>
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/change-password" element={<ChangePassword />} />
        <Route path="/user/manager" element={<MyManager />} />
        <Route path="/user/activity-log" element={<ActivityLog />} />
      </Route>


      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;
