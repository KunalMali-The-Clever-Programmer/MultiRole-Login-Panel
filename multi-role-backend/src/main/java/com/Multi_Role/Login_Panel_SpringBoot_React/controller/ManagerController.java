package com.Multi_Role.Login_Panel_SpringBoot_React.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import com.Multi_Role.Login_Panel_SpringBoot_React.service.UserService;
import com.Multi_Role.Login_Panel_SpringBoot_React.Model.User;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/manager")
@PreAuthorize("hasRole('MANAGER')")
public class ManagerController {

    @Autowired private UserService userService;

    // Manager can view assigned users
    @GetMapping("/users")
    public List<User> usersForManager(Principal principal) {
        // find manager's user id and return assigned users
        // For simplicity, find manager by username
        User manager = userService.getAllUsers().stream()
                .filter(u -> u.getUsername().equals(principal.getName()))
                .findFirst().orElseThrow();
        return userService.getUsersUnderManager(manager.getId());
    }
}
