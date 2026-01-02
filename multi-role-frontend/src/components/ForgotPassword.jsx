import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import { motion } from "framer-motion";
import { FaEnvelope, FaKey, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/* SAME STYLES */
const styles = `
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
}

.login-card-container {
  width: 400px;
}

.login-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 50px 35px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 15px 40px rgba(0,0,0,0.1);
}

.login-title {
  font-weight: 600;
  text-align: center;
  color: #0d47a1;
}

.login-subtitle {
  font-size: 15px;
  text-align: center;
  color: #616161;
}

.login-input .MuiOutlinedInput-root {
  background: #f9f9f9;
  border-radius: 8px;
}

.login-btn {
  background: #1976d2;
  color: #fff;
  font-weight: 600;
  padding: 14px 0;
  border-radius: 8px;
}

.login-btn:hover {
  background: #1565c0;
}

.link-text {
  text-align: center;
  font-size: 14px;
  color: #1976d2;
  cursor: pointer;
  font-weight: 500;
}
`;

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // ================= SEND OTP =================
  const sendOtp = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      await axios.post("http://localhost:1212/api/auth/send-otp", { email });
      alert("OTP sent to your email");
      setStep(2);
    } catch (err) {
      alert(err.response?.data || "Failed to send OTP");
    }
  };

  // ================= RESET PASSWORD =================
  const resetPassword = async () => {
    if (!otp || otp.length !== 6) {
      alert("Please enter valid 6-digit OTP");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await axios.post("http://localhost:1212/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Invalid OTP or reset failed");
    }
  };

  return (
    <Box className="login-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="login-card-container"
      >
        <Paper className="login-card" elevation={12}>
          <Typography variant="h4" className="login-title">
            Forgot Password
          </Typography>

          <Typography className="login-subtitle">
            {step === 1
              ? "Enter your registered email"
              : "Verify OTP & set new password"}
          </Typography>

          {step === 1 && (
            <>
              <TextField
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                className="login-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaEnvelope style={{ color: "#1976d2" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Button className="login-btn" fullWidth onClick={sendOtp}>
                Send OTP
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <TextField
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                fullWidth
                className="login-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaKey style={{ color: "#1976d2" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                placeholder="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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

              <Button className="login-btn" fullWidth onClick={resetPassword}>
                Reset Password
              </Button>
            </>
          )}

          <Typography className="link-text" onClick={() => navigate("/login")}>
            Back to Login
          </Typography>
        </Paper>
      </motion.div>

      <style>{styles}</style>
    </Box>
  );
};

export default ForgotPassword;
