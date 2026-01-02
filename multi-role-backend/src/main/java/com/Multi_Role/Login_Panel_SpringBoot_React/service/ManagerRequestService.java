package com.Multi_Role.Login_Panel_SpringBoot_React.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Multi_Role.Login_Panel_SpringBoot_React.Model.ManagerRequest;
import com.Multi_Role.Login_Panel_SpringBoot_React.Model.User;
import com.Multi_Role.Login_Panel_SpringBoot_React.repository.ManagerRequestRepository;
import com.Multi_Role.Login_Panel_SpringBoot_React.repository.UserRepository;

import java.util.List;

@Service
public class ManagerRequestService {

    private final ManagerRequestRepository requestRepo;
    private final UserRepository userRepo;
    private final ActivityLogService activityLogService; // inject ActivityLogService

    public ManagerRequestService(
            ManagerRequestRepository requestRepo,
            UserRepository userRepo,
            ActivityLogService activityLogService
    ) {
        this.requestRepo = requestRepo;
        this.userRepo = userRepo;
        this.activityLogService = activityLogService;
    }

    /* ================= MANAGER ================= */

    public void createRequest(Long managerId, Long userId) {
        if (requestRepo.findByManagerIdAndUserId(managerId, userId).isPresent()) {
            throw new RuntimeException("Request already exists");
        }

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getManager() != null) {
            throw new RuntimeException("User already assigned");
        }

        ManagerRequest req = new ManagerRequest();
        req.setManagerId(managerId);
        req.setUserId(userId);

        requestRepo.save(req);

        // Log creation of manager request
        activityLogService.log("system", "MANAGER_REQUEST",
                "Manager request created for user " + user.getUsername(), "PENDING");
    }

    /* ================= ADMIN ================= */

    public List<ManagerRequest> getPendingRequests() {
        return requestRepo.findByStatus(ManagerRequest.Status.PENDING);
    }

    @Transactional
    public void approveRequest(Long requestId) {
        try {
            ManagerRequest req = requestRepo.findById(requestId)
                    .orElseThrow(() -> new RuntimeException("Request not found"));

            User user = userRepo.findById(req.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            User manager = userRepo.findById(req.getManagerId())
                    .orElseThrow(() -> new RuntimeException("Manager not found"));

            user.setManager(manager);
            req.setStatus(ManagerRequest.Status.APPROVED);

            userRepo.save(user);
            requestRepo.save(req);

            // Log activity
            activityLogService.log("system", "APPROVE_MANAGER_REQUEST",
                    "Approved manager request: user " + user.getUsername() + " assigned to manager " + manager.getUsername(),
                    "SUCCESS");

        } catch (Exception e) {
            activityLogService.log("system", "APPROVE_MANAGER_REQUEST",
                    "Failed to approve manager request id " + requestId, "FAILED");
            throw e;
        }
    }

    public void rejectRequest(Long requestId) {
        try {
            ManagerRequest req = requestRepo.findById(requestId)
                    .orElseThrow(() -> new RuntimeException("Request not found"));

            req.setStatus(ManagerRequest.Status.REJECTED);
            requestRepo.save(req);

            // Log activity
            activityLogService.log("system", "REJECT_MANAGER_REQUEST",
                    "Rejected manager request id " + requestId, "SUCCESS");

        } catch (Exception e) {
            activityLogService.log("system", "REJECT_MANAGER_REQUEST",
                    "Failed to reject manager request id " + requestId, "FAILED");
            throw e;
        }
    }
}
