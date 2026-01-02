// import axios from "axios";
// import React, { useState, useContext, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   InputAdornment,
//   Divider,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { useNavigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { FaUser, FaLock, FaGoogle } from "react-icons/fa";

// /* ================= STYLES ================= */
// const styles = `
// .login-page {
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: #f5f7fa;
// }

// .login-card-container {
//   width: 400px;
// }

// .login-card {
//   display: flex;
//   flex-direction: column;
//   gap: 18px;
//   padding: 45px 35px;
//   border-radius: 16px;
//   background: #fff;
//   border: 1px solid #e0e0e0;
//   box-shadow: 0 15px 40px rgba(0,0,0,0.1);
// }

// .login-title {
//   font-weight: 700;
//   text-align: center;
//   color: #0d47a1;
// }

// .login-subtitle {
//   font-size: 15px;
//   text-align: center;
//   color: #616161;
// }

// .login-input .MuiOutlinedInput-root {
//   background: #f9f9f9;
//   border-radius: 8px;
// }

// .login-btn {
//   background: #1976d2;
//   color: #fff;
//   font-weight: 600;
//   padding: 14px 0;
//   border-radius: 8px;
// }

// .login-btn:hover {
//   background: #1565c0;
// }

// .google-btn {
//   border-color: #db4437;
//   color: #db4437;
//   font-weight: 600;
// }

// .google-btn:hover {
//   background: #db4437;
//   color: #fff;
// }

// .link-text {
//   text-align: center;
//   font-size: 14px;
//   color: #1976d2;
//   cursor: pointer;
//   font-weight: 500;
// }

// .signup-text {
//   text-align: center;
//   font-size: 14px;
// }

// .signup-btn {
//   text-transform: none;
//   font-weight: 600;
//   color: #1976d2;
// }
// `;

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { token, role, login } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // /* HANDLE GOOGLE OAUTH REDIRECT */
//   // useEffect(() => {
//   //   const params = new URLSearchParams(location.search);
//   //   const tokenFromGoogle = params.get("token");
//   //   if (tokenFromGoogle) {
//   //     login({ token: tokenFromGoogle, role: "USER", username: "GoogleUser" });
//   //     navigate("/user");
//   //   }
//   // }, [location.search, login, navigate]);

//   /* AUTO REDIRECT IF ALREADY LOGGED IN */
//   // useEffect(() => {
//   //   console.log("TOKEN  for GOOLGE LOgin",token,role)
//   //   if (token) {
//   //     if (role === "ADMIN") navigate("/admin");
//   //     else if (role === "MANAGER") navigate("/manager");
//   //     else if (role === "MANAGER") navigate("/manager");
//   //     else navigate("/user");
//   //   }
//   // }, [token, role, navigate]);

// //   useEffect(() => {
// //     console.log("TOKEN  for GOOLGE LOgin",token,role)
// //   const params = new URLSearchParams(window.location.search);
// //   console.log(params);
// //   const tokenFromGoogle = params.get("token");
// //   console.log("tokenFromGoogle",tokenFromGoogle)
// //   if (tokenFromGoogle) {
// //     login({ token: tokenFromGoogle, role: "USER", username: "GoogleUser" });
// //     navigate("/user", { replace: true }); 
// //   }
// // }, [location.search, login, navigate]);


//   /* NORMAL LOGIN */
//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:1212/api/auth/login",
//         { username, password }
//       );

//       const { token: newToken, role: newRole, username: uname } = res.data;
//       login({ token: newToken, role: newRole, username: uname });

//       if (newRole === "ADMIN") navigate("/admin");
//       else if (newRole === "MANAGER") navigate("/manager");
//       else navigate("/user");
//     } catch {
//       alert("Invalid username or password");
//     }
//   };

//   /* GOOGLE LOGIN */
//   // const handleGoogleLogin = () => {
//   //   window.location.href = "http://localhost:1212/oauth2/authorization/google";
//   // };
//   // Google Login
//   const handleGoogleLogin = () => {
//     window.location.href = "http://localhost:1212/oauth2/authorization/google";
//   };

//   return (
//     <Box className="login-page">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="login-card-container"
//       >
//         <Paper className="login-card" elevation={12}>
//           <Typography variant="h4" className="login-title">
//             Welcome Back
//           </Typography>

//           <Typography className="login-subtitle">
//             Sign in to continue
//           </Typography>

//           <TextField
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             fullWidth
//             className="login-input"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <FaUser style={{ color: "#1976d2" }} />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <TextField
//             placeholder="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             fullWidth
//             className="login-input"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <FaLock style={{ color: "#1976d2" }} />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <Button className="login-btn" fullWidth onClick={handleLogin}>
//             Login
//           </Button>

//           <Typography
//             className="link-text"
//             onClick={() => navigate("/forgot-password")}
//           >
//             Forgot Password?
//           </Typography>

//           <Divider>OR</Divider>

//           <Button
//             variant="outlined"
//             fullWidth
//             className="google-btn"
//             startIcon={<FaGoogle />}
//             onClick={handleGoogleLogin}
//           >
//             Continue with Google
//           </Button>

//           <Typography className="signup-text">
//             Don&apos;t have an account?{" "}
//             <Button
//               className="signup-btn"
//               onClick={() => navigate("/register")}
//             >
//               Create Account
//             </Button>
//           </Typography>
//         </Paper>
//       </motion.div>

//       <style>{styles}</style>
//     </Box>
//   );
// };

// export default Login;
import axios from "axios";
import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaLock, FaGoogle } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";

/* ================= STYLES ================= */
const styles = `
.login-page { height: 100vh; display: flex; justify-content: center; align-items: center; background: #f5f7fa; }
.login-card-container { width: 400px; }
.login-card { display: flex; flex-direction: column; gap: 18px; padding: 45px 35px; border-radius: 16px; background: #fff; border: 1px solid #e0e0e0; box-shadow: 0 15px 40px rgba(0,0,0,0.1); }
.login-title { font-weight: 700; text-align: center; color: #0d47a1; }
.login-subtitle { font-size: 15px; text-align: center; color: #616161; }
.login-input .MuiOutlinedInput-root { background: #f9f9f9; border-radius: 8px; }
.login-btn { background: #1976d2; color: #fff; font-weight: 600; padding: 14px 0; border-radius: 8px; }
.login-btn:hover { background: #1565c0; }
.google-btn { border-color: #db4437; color: #db4437; font-weight: 600; }
.google-btn:hover { background: #db4437; color: #fff; }
.link-text { text-align: center; font-size: 14px; color: #1976d2; cursor: pointer; font-weight: 500; }
.signup-text { text-align: center; font-size: 14px; }
.signup-btn { text-transform: none; font-weight: 600; color: #1976d2; }
`;

const RECAPTCHA_SITE_KEY = "6LePtz0sAAAAANUOfVt7UFEd9N6OF70t_hksuY9i";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  /* ================= NORMAL LOGIN UPDATED ================= */
  const handleLogin = async () => {
    if (!captchaToken) {
      alert("Please complete the captcha");
      return;
    }

    try {
      let latitude = "";
      let longitude = "";

      if (navigator.geolocation) {
        await new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              latitude = position.coords.latitude;
              longitude = position.coords.longitude;
              resolve();
            },
            () => resolve()
          );
        });
      }

      const device = navigator.platform || "Unknown device";
      const browser = navigator.userAgent || "Unknown browser";

      const res = await axios.post("http://localhost:1212/api/auth/login", {
        username,
        password,
        latitude,
        longitude,
        device,
        browser,
        captchaToken, // send token to backend
      });

      const { token: newToken, role: newRole, username: uname } = res.data;
      login({ token: newToken, role: newRole, username: uname });

      if (newRole === "ADMIN") navigate("/admin");
      else if (newRole === "MANAGER") navigate("/manager");
      else navigate("/user");
    } catch {
      alert("Invalid username or password");
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:1212/oauth2/authorization/google";
  };

  return (
    <Box className="login-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="login-card-container"
      >
        <Paper className="login-card" elevation={12}>
          <Typography variant="h4" className="login-title">
            Welcome Back
          </Typography>

          <Typography className="login-subtitle">Sign in to continue</Typography>

          <TextField
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            className="login-input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaUser style={{ color: "#1976d2" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            className="login-input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaLock style={{ color: "#1976d2" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* ====== RECAPTCHA ====== */}
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={(token) => setCaptchaToken(token)}
            style={{ margin: "20px 0" }}
          />

          <Button className="login-btn" fullWidth onClick={handleLogin}>
            Login
          </Button>

          <Typography
            className="link-text"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </Typography>

          <Divider>OR</Divider>

          <Button
            variant="outlined"
            fullWidth
            className="google-btn"
            startIcon={<FaGoogle />}
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </Button>

          <Typography className="signup-text">
            Don&apos;t have an account?{" "}
            <Button className="signup-btn" onClick={() => navigate("/register")}>
              Create Account
            </Button>
          </Typography>
        </Paper>
      </motion.div>

      <style>{styles}</style>
    </Box>
  );
};

export default Login;
