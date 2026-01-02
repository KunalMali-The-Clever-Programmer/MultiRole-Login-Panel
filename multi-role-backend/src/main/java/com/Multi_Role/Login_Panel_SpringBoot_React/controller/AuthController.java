//package com.Multi_Role.Login_Panel_SpringBoot_React.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import com.Multi_Role.Login_Panel_SpringBoot_React.Email.EmailService;
//import com.Multi_Role.Login_Panel_SpringBoot_React.service.AuthService;
//
//import java.util.HashMap;
//import java.util.Map;
//import java.util.Random;
//
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//
//    @Autowired
//    private AuthService authService;
//    
//    @Autowired 
//    private EmailService emailService;
//    
//    // In-memory OTP store (email → otp)
//    private final Map<String, String> otpStore = new HashMap<>();
//
//    // Registration
//    @PostMapping("/register")
//    public String register(@RequestParam String username,
//                           @RequestParam String email,
//                           @RequestParam String password,
//                           @RequestParam String role) {
//        return authService.register(username, email, password, role);
//    }
//
//    // Login
//    @PostMapping("/login")
//    public Map<String, Object> login(@RequestBody Map<String, String> loginData) {
//        String username = loginData.get("username");
//        String password = loginData.get("password");
//
//        return authService.loginUser(username, password);
//    }
//    
//    // ================= SEND OTP =================
//    @PostMapping("/send-otp")
//    public String sendOtp(@RequestBody Map<String, String> req) {
//
//        String email = req.get("email");
//
//        if (!authService.isEmailRegistered(email)) {
//            throw new RuntimeException("Email not registered");
//        }
//
//        String otp = String.valueOf(100000 + new Random().nextInt(900000));
//        otpStore.put(email, otp);
//
//        emailService.sendEmail(
//                email,
//                "Password Reset OTP",
//                "Your OTP is: " + otp + "\nDo not share it."
//        );
//
//        return "OTP sent successfully";
//    }
//
//    // ================= RESET PASSWORD =================
//    @PostMapping("/reset-password")
//    public String resetPassword(@RequestBody Map<String, String> req) {
//
//        String email = req.get("email");
//        String otp = req.get("otp");
//        String newPassword = req.get("newPassword");
//
//        if (!otp.equals(otpStore.get(email))) {
//            throw new RuntimeException("Invalid OTP");
//        }
//
//        authService.updatePassword(email, newPassword);
//        otpStore.remove(email);
//
//        return "Password reset successful";
//    }
//}
//
package com.Multi_Role.Login_Panel_SpringBoot_React.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.Multi_Role.Login_Panel_SpringBoot_React.Email.EmailService;
import com.Multi_Role.Login_Panel_SpringBoot_React.service.AuthService;
import com.Multi_Role.Login_Panel_SpringBoot_React.service.SecurityAuditLogService;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private SecurityAuditLogService auditLogService;

    private final Map<String, String> otpStore = new HashMap<>();

    private final String RECAPTCHA_SECRET_KEY = "6LePtz0sAAAAAP3SUTe1gTEJu3NXNu0Nr6gbrLPm";

    // ================= REGISTER =================
    @PostMapping("/register")
    public String register(@RequestParam String username,
                           @RequestParam String email,
                           @RequestParam String password,
                           @RequestParam String role) {
        return authService.register(username, password, email, role);
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> loginData,
                                     HttpServletRequest request) {

        // ===== Verify reCAPTCHA =====
        String captchaToken = loginData.get("captchaToken");
        if (captchaToken == null || captchaToken.isEmpty() || !verifyRecaptcha(captchaToken)) {
            throw new RuntimeException("Captcha verification failed");
        }

        // ===== Extract frontend info with safe fallback =====
        String latitude = loginData.getOrDefault("latitude", "0.0");
        String longitude = loginData.getOrDefault("longitude", "0.0");
        String device = loginData.getOrDefault("device", "Unknown Device");
        String browser = loginData.getOrDefault("browser", "Unknown Browser");

        // ===== Login via AuthService =====
        Map<String, Object> response = authService.loginUser(
                loginData.get("username"),
                loginData.get("password"),
                latitude,
                longitude,
                device,
                browser,
                request
        );

        String email = (String) response.getOrDefault("email", loginData.get("username"));
        String status = Boolean.TRUE.equals(response.get("success")) ? "SUCCESS" : "FAILED";
        String clientIp = auditLogService.getClientIP(request);

        // ===== Log login attempt =====
        auditLogService.logLogin(
                (Long) response.getOrDefault("userId", 0L),
                email,
                "User Login",
                clientIp,
                latitude,
                longitude,
                device,
                browser,
                status
        );

        return response;
    }

    // ================= SEND OTP =================
    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody Map<String, String> req) {
        String email = req.get("email");

        if (!authService.isEmailRegistered(email)) {
            throw new RuntimeException("Email not registered");
        }

        String otp = String.valueOf(100000 + new Random().nextInt(900000));
        otpStore.put(email, otp);

        emailService.sendEmail(email, "Password Reset OTP", "Your OTP is: " + otp + "\nDo not share it.");
        return "OTP sent successfully";
    }

    // ================= RESET PASSWORD =================
    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String otp = req.get("otp");
        String newPassword = req.get("newPassword");

        if (!otp.equals(otpStore.get(email))) {
            throw new RuntimeException("Invalid OTP");
        }

        authService.updatePassword(email, newPassword);
        otpStore.remove(email);
        return "Password reset successful";
    }

    // ================= RECAPTCHA VERIFICATION =================
    private boolean verifyRecaptcha(String token) {
        try {
            String url = "https://www.google.com/recaptcha/api/siteverify?secret="
                    + RECAPTCHA_SECRET_KEY + "&response=" + token;

            RestTemplate restTemplate = new RestTemplate();
            Map<String, Object> googleResponse = restTemplate.postForObject(url, null, Map.class);

            return googleResponse != null && Boolean.TRUE.equals(googleResponse.get("success"));
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
