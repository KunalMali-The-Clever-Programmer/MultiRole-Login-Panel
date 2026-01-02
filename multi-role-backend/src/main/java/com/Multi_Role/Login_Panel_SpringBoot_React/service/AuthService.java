//package com.Multi_Role.Login_Panel_SpringBoot_React.service;
//
//import java.time.LocalDateTime;
//import java.util.*;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.Multi_Role.Login_Panel_SpringBoot_React.Model.Role;
//import com.Multi_Role.Login_Panel_SpringBoot_React.Model.User;
//import com.Multi_Role.Login_Panel_SpringBoot_React.repository.RoleRepository;
//import com.Multi_Role.Login_Panel_SpringBoot_React.repository.UserRepository;
//import com.Multi_Role.Login_Panel_SpringBoot_React.security.JwtTokenProvider;
//
//
//@Service
//public class AuthService {
//	
//	@Autowired
//	private UserRepository userRepository;
//
//	@Autowired
//	private RoleRepository roleRepository;
//
//	@Autowired
//	private JwtTokenProvider jwtTokenProvider;
//
//	@Autowired
//	private PasswordEncoder passwordEncoder;
//	
//	@Autowired
//    private ActivityLogService activityLogService;
//	
//	
//	public String register(String username, String password, String email, String roleName) {
//		
//		// Check if username already exists
//		if (userRepository.findByUsername(username).isPresent()) {
//			
//            return "Username already exists";
//        }
//
//		// Check if role exists
//		Optional<Role> roleOpt = roleRepository.findByName(roleName.toUpperCase());
//	    if (!roleOpt.isPresent()) {
//	        return "Role not found";
//	    }
//	    
//	    System.out.println("Password : -"+password);
//	    // Create user
//	    User user = new User();
//	    user.setUsername(username);
//	    user.setEmail(email);
//	    user.setPassword(passwordEncoder.encode(password));
//	    user.setRole(roleOpt.get());   // ✅ Correct setter
//	    
//	    userRepository.save(user);
//	    System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!   User Registered Successfully !!!!!!!!!!!!!!!!!!!!!!!!!11 ");
//		
//	    activityLogService.log(username, "REGISTER", "User registered");
//		return "User Registered Successfully!";
//	}
//	
//	
//	public Map<String, Object> loginUser(String username, String password) {
//	    Optional<User> userOpt = userRepository.findByUsername(username);
//	    if (!userOpt.isPresent()) return Map.of("error", "User not found");
//
//	    User user = userOpt.get();
//	    if (!passwordEncoder.matches(password, user.getPassword())) {
//	    	 activityLogService.log(username, "LOGIN", "Invalid password");
//	        return Map.of("error", "Invalid password");
//	    }
//
//	    String token = jwtTokenProvider.generateToken(user.getUsername());
//
//	    activityLogService.log(username, "LOGIN", "User logged in successfully");
//	    
//	    Map<String, Object> response = new HashMap<>();
//	    response.put("token", token);
//	    response.put("username", user.getUsername());
//	    response.put("role", user.getRole().getName());
//
//	    return response;
//	}
//	
//	   // ================= FORGOT PASSWORD HELPERS =================
//    public boolean isEmailRegistered(String email) {
//        return userRepository.findByEmail(email).isPresent();
//    }
//
//    public void updatePassword(String email, String newPassword) {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        user.setPassword(passwordEncoder.encode(newPassword));
//        userRepository.save(user);
//    }
//	
//
//}


package com.Multi_Role.Login_Panel_SpringBoot_React.service;

import java.util.*;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Multi_Role.Login_Panel_SpringBoot_React.Model.Role;
import com.Multi_Role.Login_Panel_SpringBoot_React.Model.User;
import com.Multi_Role.Login_Panel_SpringBoot_React.Model.SecurityAuditLog;
import com.Multi_Role.Login_Panel_SpringBoot_React.repository.RoleRepository;
import com.Multi_Role.Login_Panel_SpringBoot_React.repository.UserRepository;
import com.Multi_Role.Login_Panel_SpringBoot_React.repository.SecurityAuditLogRepository;
import com.Multi_Role.Login_Panel_SpringBoot_React.security.JwtTokenProvider;

@Service
public class AuthService {

    @Autowired private UserRepository userRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private JwtTokenProvider jwtTokenProvider;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private ActivityLogService activityLogService;

    // 🔥 NEW
    @Autowired private SecurityAuditLogRepository securityAuditLogRepository;
    @Autowired private GeoLocationService geoLocationService;

    // ================= REGISTER =================
    public String register(String username, String password, String email, String roleName) {

        if (userRepository.findByUsername(username).isPresent())
            return "Username already exists";

        Optional<Role> roleOpt = roleRepository.findByName(roleName.toUpperCase());
        if (!roleOpt.isPresent()) return "Role not found";

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(roleOpt.get());

        userRepository.save(user);

        // OLD LOG
        activityLogService.log(username, "REGISTER", "User registered");

        return "User Registered Successfully!";
    }

    // ================= LOGIN (UPGRADED) =================
    public Map<String, Object> loginUser(String username, String password,
                                         String latitude, String longitude,
                                         String device, String browser,
                                         HttpServletRequest request) {

        Optional<User> userOpt = userRepository.findByUsername(username);

        String ip = request.getRemoteAddr(); // 🔥 IP
        Map<String, String> geo = geoLocationService.getLocation(ip); // 🔥 City/Country

        // USER NOT FOUND
        if (!userOpt.isPresent()) {
            saveSecurityLog(null, username, "LOGIN", "FAILED",
                    latitude, longitude, device, browser, ip, geo);
            return Map.of("error", "User not found");
        }

        User user = userOpt.get();

        // WRONG PASSWORD
        if (!passwordEncoder.matches(password, user.getPassword())) {

            // OLD LOG
            activityLogService.log(username, "LOGIN", "Invalid password");

            // NEW SECURITY LOG
            saveSecurityLog(user.getId(), username, "LOGIN", "FAILED",
                    latitude, longitude, device, browser, ip, geo);

            return Map.of("error", "Invalid password");
        }

        // SUCCESS
        String token = jwtTokenProvider.generateToken(user.getUsername());

        // OLD LOG
        activityLogService.log(username, "LOGIN", "User logged in successfully");

        // NEW SECURITY LOG
        saveSecurityLog(user.getId(), username, "LOGIN", "SUCCESS",
                latitude, longitude, device, browser, ip, geo);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("username", user.getUsername());
        response.put("role", user.getRole().getName());

        return response;
    }

    // ================= FORGOT PASSWORD =================
    public boolean isEmailRegistered(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public void updatePassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    // ================= NEW SECURITY LOGGER =================
    private void saveSecurityLog(Long userId, String username, String action, String status,
                                 String latitude, String longitude,
                                 String device, String browser,
                                 String ip, Map<String, String> geo) {

        SecurityAuditLog log = new SecurityAuditLog();
        log.setUserId(userId);
        log.setEmail(username);
        log.setAction(action);
        log.setLoginStatus(status);
        log.setIpAddress(ip);
        log.setCity(geo.get("city"));
        log.setState(geo.get("state"));
        log.setCountry(geo.get("country"));
        log.setLatitude(latitude);
        log.setLongitude(longitude);
        log.setDevice(device);
        log.setBrowser(browser);
        securityAuditLogRepository.save(log);
    }
}

