package com.Multi_Role.Login_Panel_SpringBoot_React.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Multi_Role.Login_Panel_SpringBoot_React.repository.ActivityLogRepository;
import com.Multi_Role.Login_Panel_SpringBoot_React.Model.ActivityLog;
import java.time.LocalDateTime;

@Service
public class ActivityLogService {

    @Autowired
    private ActivityLogRepository repo;

    // Default SUCCESS log
    public void log(String username, String action, String details) {
        log(username, action, details, "SUCCESS");
    }

    // Custom status log
    public void log(String username, String action, String details, String status) {
        ActivityLog a = new ActivityLog();
        a.setUsername(username);
        a.setAction(action);
        a.setDetails(details);
        a.setStatus(status);
        a.setTimestamp(LocalDateTime.now());
        repo.save(a);
    }
}
