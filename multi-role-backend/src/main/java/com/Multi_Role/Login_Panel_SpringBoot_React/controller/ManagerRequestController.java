package com.Multi_Role.Login_Panel_SpringBoot_React.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.Multi_Role.Login_Panel_SpringBoot_React.Model.ManagerRequest;
import com.Multi_Role.Login_Panel_SpringBoot_React.Model.User;
import com.Multi_Role.Login_Panel_SpringBoot_React.service.ManagerRequestService;
import com.Multi_Role.Login_Panel_SpringBoot_React.service.UserService;
import com.Smart.Contact.Manager.dao.userRepository;

import java.util.List;

@RestController
@RequestMapping("/api/manager-requests")
public class ManagerRequestController {

    private final ManagerRequestService service;
    @Autowired private UserService userService;

    public ManagerRequestController(ManagerRequestService service) {
        this.service = service;
    }

    /* ===== MANAGER ===== */
    @PostMapping("/create")
    @PreAuthorize("hasRole('MANAGER')")
    public void create(
            @RequestParam Long userId,
            Authentication auth
    ) {
        String username = auth.getName();   // email / username
        System.out.println("Manager name to find "+username);

        User manager = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Manager not found"));
        
        System.out.println("Manager Name"+manager.getId());

        service.createRequest(manager.getId(), userId);
    }
    /* ===== ADMIN ===== */
    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ManagerRequest> pending() {
    	System.out.println("**************************** In Pending Router  ****************************");
        return service.getPendingRequests();
    }

    @PostMapping("/approve/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void approve(@PathVariable Long id) {
        service.approveRequest(id);
    }

    @PostMapping("/reject/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void reject(@PathVariable Long id) {
        service.rejectRequest(id);
    }
}
