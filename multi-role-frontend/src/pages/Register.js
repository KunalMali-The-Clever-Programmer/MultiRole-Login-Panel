// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
//   MenuItem,
//   InputAdornment,
//   FormControl,
//   Select,
//   InputLabel,
//   Divider,
//   Stack,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { FaUser, FaEnvelope, FaLock, FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
// import axios from "axios";

// const Register = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("USER");

//   const handleRegister = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("username", username);
//       formData.append("email", email);
//       formData.append("password", password);
//       formData.append("role", role);

//       const res = await axios.post(
//         "http://localhost:1212/api/auth/register",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

// //       const res = await axios.post(
// //   "/api/auth/register",
// //   { username, email, password, role },
// //   { headers: { "Content-Type": "application/json" } }
// // );

//       alert(res.data);
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       alert("Registration Failed");
//     }
//   };

//   // const handleOAuthLogin = (provider) => {
//   //   window.location.href = `http://localhost:1212/oauth2/authorization/${provider}`;
//   // };
//   const handleOAuthLogin = (provider) => {
//   window.location.href = `http://localhost:1212/oauth2/authorization/${provider}`;
// };

//   return (
//     <Box className="login-page">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="login-card-container"
//       >
//         <Paper className="login-card" elevation={12}>
//           <Typography variant="h5" className="login-title">
//             Create Account
//           </Typography>
//           <Typography className="login-subtitle">
//             Sign up to get started
//           </Typography>

//           {/* Username */}
//           <TextField
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             fullWidth
//             className="login-input"
//             sx={{ mb: 1.5 }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <FaUser style={{ color: "#1976d2" }} />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* Email */}
//           <TextField
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             fullWidth
//             className="login-input"
//             sx={{ mb: 1.5 }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <FaEnvelope style={{ color: "#1976d2" }} />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* Password */}
//           <TextField
//             placeholder="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             fullWidth
//             className="login-input"
//             sx={{ mb: 1.5 }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <FaLock style={{ color: "#1976d2" }} />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* Role */}
//           <FormControl fullWidth sx={{ mb: 1.5 }}>
//             <InputLabel>Role</InputLabel>
//             <Select
//               value={role}
//               label="Role"
//               onChange={(e) => setRole(e.target.value)}
//             >
//               <MenuItem value="USER">User</MenuItem>
//               <MenuItem value="MANAGER">Manager</MenuItem>
//               <MenuItem value="ADMIN">Admin</MenuItem>
//             </Select>
//           </FormControl>

//           {/* Register Button */}
//           <Button fullWidth className="login-btn" onClick={handleRegister} sx={{ mb: 1.5 }}>
//             Register
//           </Button>

//           {/* OR Divider */}
//           <Divider sx={{ my: 1 }}>OR</Divider>

//           {/* Social Login Buttons */}
//           <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mb: 1.5 }}>
//             <Button
//               variant="outlined"
//               startIcon={<FaGoogle />}
//               className="social-btn google-btn"
//               onClick={() => handleOAuthLogin("google")}
//             >
//               Google
//             </Button>
//             <Button
//               variant="outlined"
//               startIcon={<FaGithub />}
//               className="social-btn github-btn"
//               onClick={() => handleOAuthLogin("github")}
//             >
//               GitHub
//             </Button>
//             <Button
//               variant="outlined"
//               startIcon={<FaFacebook />}
//               className="social-btn facebook-btn"
//               onClick={() => handleOAuthLogin("facebook")}
//             >
//               Facebook
//             </Button>
//           </Stack>

//           {/* Login Link */}
//           <Typography className="signup-text">
//             Already have an account?{" "}
//             <Button className="signup-btn" onClick={() => navigate("/login")}>
//               Login
//             </Button>
//           </Typography>
//         </Paper>
//       </motion.div>

//       <style>{`
//         .login-page {
//           height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: linear-gradient(135deg, #ece9e6, #ffffff);
//           font-family: 'Roboto', sans-serif;
//         }
//         .login-card-container { width: 360px; z-index: 2; }
//         .login-card {
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//           padding: 30px 25px;
//           border-radius: 14px;
//           background: #fff;
//           border: 1px solid #e0e0e0;
//           box-shadow: 0 10px 25px rgba(0,0,0,0.08);
//           transition: all 0.3s ease;
//         }
//         .login-card:hover { transform: translateY(-3px); box-shadow: 0 18px 45px rgba(0,0,0,0.12); }
//         .login-title { font-weight: 700; text-align: center; color: #0d47a1; font-size: 20px; }
//         .login-subtitle { font-size: 14px; text-align: center; color: #616161; margin-bottom: 10px; }
//         .login-input .MuiOutlinedInput-root { color: #212121; background: #f9f9f9; border-radius: 6px; font-size: 14px; }
//         .login-input .MuiOutlinedInput-notchedOutline { border-color: #bdbdbd; }
//         .login-input:hover .MuiOutlinedInput-notchedOutline { border-color: #1976d2; }
//         .login-input.Mui-focused .MuiOutlinedInput-notchedOutline { border-color: #1976d2; }
//         .login-btn {
//           background: #1976d2; color: #fff; font-weight: 600; padding: 10px 0; border-radius: 6px; font-size: 15px;
//           transition: all 0.3s ease;
//         }
//         .login-btn:hover { background: #1565c0; box-shadow: 0 4px 12px rgba(25,118,210,0.3); }
//         .signup-text { text-align: center; font-size: 13px; margin-top: 5px; }
//         .signup-btn { text-transform: none; font-weight: 600; color: #1976d2; font-size: 13px; }
//         .social-btn { text-transform: none; font-weight: 600; border-radius: 6px; padding: 6px 10px; font-size: 13px; min-width: 85px; }
//         .google-btn { border-color: #db4437; color: #db4437; }
//         .google-btn:hover { background: #db4437; color: #fff; }
//         .github-btn { border-color: #333; color: #333; }
//         .github-btn:hover { background: #333; color: #fff; }
//         .facebook-btn { border-color: #1877f2; color: #1877f2; }
//         .facebook-btn:hover { background: #1877f2; color: #fff; }
//       `}</style>
//     </Box>
//   );
// };

// export default Register;
import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  MenuItem,
  InputAdornment,
  FormControl,
  Select,
  InputLabel,
  Divider,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);

      const res = await axios.post(
        "http://localhost:1212/api/auth/register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(res.data);
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration Failed");
    }
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `http://localhost:1212/oauth2/authorization/${provider}`;
  };

  return (
    <Box className="login-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="login-card-container"
      >
        <Paper className="login-card" elevation={12}>
          <Typography variant="h5" className="login-title">
            Create Account
          </Typography>
          <Typography className="login-subtitle">
            Sign up to get started
          </Typography>

          {/* Username */}
          <TextField
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            className="login-input"
            sx={{ mb: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaUser style={{ color: "#1976d2" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Email */}
          <TextField
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            className="login-input"
            sx={{ mb: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaEnvelope style={{ color: "#1976d2" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
          <TextField
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            className="login-input"
            sx={{ mb: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaLock style={{ color: "#1976d2" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Role */}
          <FormControl fullWidth sx={{ mb: 1.5 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="USER">User</MenuItem>
              <MenuItem value="MANAGER">Manager</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </Select>
          </FormControl>

          {/* Register Button */}
          <Button fullWidth className="login-btn" onClick={handleRegister} sx={{ mb: 1.5 }}>
            Register
          </Button>

          {/* OR Divider */}
          <Divider sx={{ my: 1 }}>OR</Divider>

          {/* Social Login Buttons */}
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 1.5 }}>
            <Button
              variant="outlined"
              startIcon={<FaGoogle />}
              className="social-btn google-btn"
              onClick={() => handleOAuthLogin("google")}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<FaGithub />}
              className="social-btn github-btn"
              onClick={() => handleOAuthLogin("github")}
            >
              GitHub
            </Button>
            <Button
              variant="outlined"
              startIcon={<FaFacebook />}
              className="social-btn facebook-btn"
              onClick={() => handleOAuthLogin("facebook")}
            >
              Facebook
            </Button>
          </Stack>

          {/* Login Link */}
          <Typography className="signup-text">
            Already have an account?{" "}
            <Button className="signup-btn" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Typography>
        </Paper>
      </motion.div>

      {/* Styles aligned for uniformity */}
      <style>{`
        .login-page {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #ece9e6, #ffffff);
          font-family: 'Roboto', sans-serif;
        }
        .login-card-container { width: 360px; z-index: 2; }
        .login-card {
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 35px 25px;
          border-radius: 14px;
          background: #fff;
          border: 1px solid #e0e0e0;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }
        .login-card:hover { transform: translateY(-3px); box-shadow: 0 18px 45px rgba(0,0,0,0.12); }
        .login-title { font-weight: 700; text-align: center; color: #0d47a1; font-size: 20px; }
        .login-subtitle { font-size: 14px; text-align: center; color: #616161; margin-bottom: 12px; }
        .login-input .MuiOutlinedInput-root { color: #212121; background: #f9f9f9; border-radius: 6px; font-size: 14px; }
        .login-input .MuiOutlinedInput-notchedOutline { border-color: #bdbdbd; }
        .login-input:hover .MuiOutlinedInput-notchedOutline { border-color: #1976d2; }
        .login-input.Mui-focused .MuiOutlinedInput-notchedOutline { border-color: #1976d2; }
        .login-btn {
          background: #1976d2; color: #fff; font-weight: 600; padding: 12px 0; border-radius: 6px; font-size: 15px;
          transition: all 0.3s ease;
        }
        .login-btn:hover { background: #1565c0; box-shadow: 0 4px 12px rgba(25,118,210,0.3); }
        .signup-text { text-align: center; font-size: 13px; margin-top: 5px; }
        .signup-btn { text-transform: none; font-weight: 600; color: #1976d2; font-size: 13px; }
        .social-btn { text-transform: none; font-weight: 600; border-radius: 6px; padding: 6px 10px; font-size: 13px; min-width: 85px; }
        .google-btn { border-color: #db4437; color: #db4437; }
        .google-btn:hover { background: #db4437; color: #fff; }
        .github-btn { border-color: #333; color: #333; }
        .github-btn:hover { background: #333; color: #fff; }
        .facebook-btn { border-color: #1877f2; color: #1877f2; }
        .facebook-btn:hover { background: #1877f2; color: #fff; }
      `}</style>
    </Box>
  );
};

export default Register;
