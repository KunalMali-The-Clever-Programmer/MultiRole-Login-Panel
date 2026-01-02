package com.Multi_Role.Login_Panel_SpringBoot_React.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.Multi_Role.Login_Panel_SpringBoot_React.repository.UserRepository;
import com.Multi_Role.Login_Panel_SpringBoot_React.repository.RoleRepository;
import com.Multi_Role.Login_Panel_SpringBoot_React.Model.User;
import com.Multi_Role.Login_Panel_SpringBoot_React.Model.Role;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired private UserRepository userRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private ActivityLogService activityLogService;
    @Autowired private PasswordEncoder passwordEncoder;

    // Get all users
    public List<User> getAllUsers() { 
        return userRepository.findAll(); 
    }

    // Find user by id
    public User getUser(Long id) { 
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found")); 
    }

    // Find user by username
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Create new user
    public User createUser(String username, String email, String rawPassword, String roleName, Long managerId) {
        try {
            Role role = roleRepository.findByName(roleName.toUpperCase())
                    .orElseThrow(() -> new RuntimeException("Role not found"));
            User manager = null;
            if (managerId != null) manager = userRepository.findById(managerId).orElse(null);
            System.out.println("***********In Create usere **************** PASSWORD"+rawPassword);

            User u = new User();
            u.setUsername(username);
            u.setEmail(email);
            u.setPassword(passwordEncoder.encode(rawPassword));
            
            System.out.println("***********Encodeed paddwoed **************** PASSWORD"+passwordEncoder.encode(rawPassword));
            u.setRole(role);
            u.setManager(manager);

            User saved = userRepository.save(u);
            activityLogService.log("system", "CREATE_USER", "Created user " + username, "SUCCESS");
            return saved;
        } catch (Exception e) {
            activityLogService.log("system", "CREATE_USER", "Failed to create user " + username, "FAILED");
            throw e;
        }
    }

 // Update user
    public User updateUser(Long id, User payload) {
        try {
            User u = getUser(id);
            boolean managerChanged = false;

            // Update basic fields
            if (payload.getUsername() != null) u.setUsername(payload.getUsername());
            if (payload.getEmail() != null) u.setEmail(payload.getEmail());

            // Update password if provided
            String password = payload.getPassword();
            if (password != null && !password.isEmpty()) {
                u.setPassword(passwordEncoder.encode(password));
            }

            // Update role if provided
            if (payload.getRole() != null) u.setRole(payload.getRole());

            // Update manager if it changed
            if (payload.getManager() != null) {
                Long newManagerId = payload.getManager().getId();
                Long oldManagerId = u.getManager() != null ? u.getManager().getId() : null;

                if (oldManagerId == null || !oldManagerId.equals(newManagerId)) {
                    u.setManager(payload.getManager());
                    managerChanged = true;
                }
            }

            User saved = userRepository.save(u);

            // Log appropriately
            if (managerChanged) {
                activityLogService.log(
                    "system",
                    "ASSIGN_MANAGER",
                    "Assigned user " + u.getUsername() + " to manager " + u.getManager().getUsername(),
                    "SUCCESS"
                );
            } else {
                activityLogService.log(
                    "system",
                    "UPDATE_USER",
                    "Updated user " + u.getUsername(),
                    "SUCCESS"
                );
            }

            return saved;

        } catch (Exception e) {
            activityLogService.log(
                "system",
                "UPDATE_USER",
                "Failed to update user id " + id,
                "FAILED"
            );
            throw e;
        }
    }



    // Delete user
    public void deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
            activityLogService.log("system", "DELETE_USER", "Deleted user id " + id, "SUCCESS");
        } catch (Exception e) {
            activityLogService.log("system", "DELETE_USER", "Failed to delete user id " + id, "FAILED");
            throw e;
        }
    }

    // Assign user to manager
    public User assignUserToManager(Long userId, Long managerId) {
        try {
            User user = getUser(userId);
            User manager = getUser(managerId);

            if (!"MANAGER".equals(manager.getRole().getName())) {
                activityLogService.log("system", "ASSIGN_USER", "Failed: Assigned user is not a manager", "FAILED");
                throw new RuntimeException("Assigned user is not a manager");
            }

            user.setManager(manager);
            User saved = userRepository.save(user);
            System.out.println("************************ Log is Printing ***********************88 ");
            activityLogService.log("system", "ASSIGN_USER",
                    "Assigned user " + user.getUsername() + " to manager " + manager.getUsername(), "SUCCESS");
            return saved;
        } catch (Exception e) {
            System.out.println("************************ Log is not Printing ***********************88 ");

            activityLogService.log("system", "ASSIGN_USER",
                    "Failed to assign user id " + userId + " to manager id " + managerId, "FAILED");
            throw e;
        }
    }

    // Get all users under a manager
    public List<User> getUsersUnderManager(Long managerId) {
        return userRepository.findAll().stream()
                .filter(u -> u.getManager() != null && u.getManager().getId().equals(managerId))
                .collect(Collectors.toList());
    }

    // Update password
    public void updatePassword(String username, String newPassword) {
        try {
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            System.out.println("******************* In updat password  ***************  NEW PASSWORD "+newPassword);
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            activityLogService.log(username, "CHANGE_PASSWORD", "Password updated successfully", "SUCCESS");
        } catch (Exception e) {
            activityLogService.log(username, "CHANGE_PASSWORD", "Failed to update password", "FAILED");
            throw e;
        }
    }

    public long countUsers() {
        return userRepository.count();
    }
    
    public AnalyticsResponse getUserAnalytics() {
        List<User> allUsers = getAllUsers();

        long totalUsers = allUsers.size();
        long totalManagers = allUsers.stream()
                .filter(u -> u.getRole() != null && "MANAGER".equals(u.getRole().getName()))
                .count();
        long totalAdmins = allUsers.stream()
                .filter(u -> u.getRole() != null && "ADMIN".equals(u.getRole().getName()))
                .count();

        return new AnalyticsResponse(totalUsers, totalManagers, totalAdmins);
    }

    // AnalyticsResponse record
    public record AnalyticsResponse(long totalUsers, long totalManagers, long totalAdmins) {}
    
    
    
    

}
