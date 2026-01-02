package com.Multi_Role.Login_Panel_SpringBoot_React.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import com.Multi_Role.Login_Panel_SpringBoot_React.service.UserService;
import com.Multi_Role.Login_Panel_SpringBoot_React.Model.SecurityAuditLog;
import com.Multi_Role.Login_Panel_SpringBoot_React.Model.User;
import com.Multi_Role.Login_Panel_SpringBoot_React.repository.SecurityAuditLogRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired private UserService userService;
    @Autowired private PasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public List<User> allUsers() { return userService.getAllUsers(); }

    @PostMapping("/users")
    public User createUser(@RequestBody UserCreateRequest req) {
//        String encoded = passwordEncoder.encode(req.password());
    	System.out.println("*********REcieved password *********"+req.password());
        return userService.createUser(req.username(), req.email(), req.password(), req.role(), req.managerId());
    }

    @PutMapping("/users/{id}") 
    public User updateUser(@PathVariable Long id, @RequestBody User payload) {
        // if password is plain text in payload -> encode before update
    	User u=payload;
    	System.out.println("=================In updateUser ================ ");
    	String password=payload.getPassword();
    	
    	System.out.println("===================password ===="+password);
    	
    	System.out.println("Getting manager id form payload : "+u.getManager());
        if (payload.getPassword() != null) payload.setPassword(password);
        return userService.updateUser(id, payload);
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "Deleted";
    }

//    @GetMapping("/analytics")
//    public AnalyticsResponse analytics() {
//        long total = userService.countUsers();
//        // For demo counts, you can compute by role using repository queries (not included here)
//        return new AnalyticsResponse(total, 0, 0);
//    }
    
    @GetMapping("/analytics")
    public AnalyticsResponse analytics() {
        List<User> allUsers = userService.getAllUsers();

        long totalUsers = allUsers.size();
        long totalManagers = allUsers.stream()
                .filter(u -> u.getRole() != null && "MANAGER".equals(u.getRole().getName()))
                .count();
        long totalAdmins = allUsers.stream()
                .filter(u -> u.getRole() != null && "ADMIN".equals(u.getRole().getName()))
                .count();

        return new AnalyticsResponse(totalUsers, totalManagers, totalAdmins);
    }

    public record AnalyticsResponse(long totalUsers, long totalManagers, long totalAdmins) {}


    public record UserCreateRequest(String username, String email, String password, String role, Long managerId) {}
//    public record AnalyticsResponse(long totalUsers, long totalManagers, long totalAdmins) {}
    
    
    
    
    // for security logs 
    
    @Autowired
    private SecurityAuditLogRepository repo;

    @GetMapping("/logs")
    public List<SecurityAuditLog> getAll() {
        return repo.findAllByOrderByCreatedAtDesc();
    }
}
