package com.Multi_Role.Login_Panel_SpringBoot_React.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import com.Multi_Role.Login_Panel_SpringBoot_React.service.UserService;
import com.Multi_Role.Login_Panel_SpringBoot_React.Model.User;
import com.Multi_Role.Login_Panel_SpringBoot_React.repository.UserRepository;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired private UserService userService;
    @Autowired private UserRepository userRepository;

    // Get profile of logged-in user
    @GetMapping("/profile")
    public User myProfile(Principal principal) {
        return userService.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Update profile
//    @PutMapping("/profile")
//    public User updateProfile(@RequestBody User payload, Principal principal) {
//        User u = userService.findByUsername(principal.getName())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        System.out.println("Password "+payload.getPassword());
//      //  if (payload.getEmail() != null) u.setEmail(payload.getEmail());
////        if (payload.getPassword() != null) u.setPassword(payload.getPassword()); // encode in real app
//        return userService.updateUser(u.getId(), u);
//    }
//    
//    @PutMapping("/changePassword")
//    public User updatePassword(@RequestBody User payload, Principal principal) {
//        User u = userService.findByUsername(principal.getName())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
////        if (payload.getEmail() != null) u.setEmail(payload.getEmail());
//        String password=payload.getPassword();
//        if (payload.getPassword() != null) u.setPassword(password); // encode in real app
//        return userService.updateUser(u.getId(), u);
//    }
//
//    
    
    @PutMapping("/profile")
    public User updateProfile(@RequestBody Map<String, String> updates,Principal principal) {
    	User user = userService.findByUsername(principal.getName())
    			.orElseThrow(() -> new RuntimeException("User not found"));

        if (updates.containsKey("email")) {
            user.setEmail(updates.get("email"));
        }

        // Don't update password here, it has separate endpoint
               //userRepository.save(user);
        return userRepository.save(user);
    }
    
    @PutMapping("/changePassword")
    public ResponseEntity<?> updatePassword(@RequestBody Map<String,String> payload, Principal principal){
    	
    	String newPassword = payload.get("newPassword");

        if (newPassword == null || newPassword.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Password cannot be empty");
        }

        userService.updatePassword(principal.getName(), newPassword);
        
        System.out.println(" ===================================== Password updated successfully =================== ");

        return ResponseEntity.ok("Password updated successfully");
    }
    
    
    // ADMIN → assign user to manager
    @PutMapping("/assign/{userId}/{managerId}")
    public User assignUserToManager(@PathVariable Long userId, @PathVariable Long managerId) {
        return userService.assignUserToManager(userId, managerId);
    }

    // MANAGER → get users assigned under them
    @GetMapping("/assigned-users")
    public List<User> getAssignedUsers(Principal principal) {
        User manager = userService.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("Manager not found"));

        return userService.getUsersUnderManager(manager.getId());
    }

    // ADMIN → get all users
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    
   
    
    // 🔥 MANAGER: fetch users without manager
    @GetMapping("/unassigned")
    @PreAuthorize("hasRole('MANAGER')")
    public List<User> getUnassignedUsers() {
        return userRepository.findByManagerIsNull();
    }
}
