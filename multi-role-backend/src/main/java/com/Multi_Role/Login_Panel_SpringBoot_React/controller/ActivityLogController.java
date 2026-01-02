package com.Multi_Role.Login_Panel_SpringBoot_React.controller;

import com.Multi_Role.Login_Panel_SpringBoot_React.Model.ActivityLog;
import com.Multi_Role.Login_Panel_SpringBoot_React.repository.ActivityLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ActivityLogController {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    // Get logs for the logged-in user
    @GetMapping("/user/activity-log")
    public List<ActivityLog> getUserLogs(Principal principal) {
    	System.out.println("================= In AtiveLog Contolller =============");
        String username = principal.getName();
        return activityLogRepository.findByUsernameOrderByTimestampDesc(username);
    }
    
    // ADMIN logs
    @GetMapping("/admin/activity-log")
    public List<ActivityLog> getAdminLogs() {
        return activityLogRepository.findAllByOrderByTimestampDesc();
    }
}
