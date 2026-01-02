package com.Multi_Role.Login_Panel_SpringBoot_React.service;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Multi_Role.Login_Panel_SpringBoot_React.Model.SecurityAuditLog;
import com.Multi_Role.Login_Panel_SpringBoot_React.repository.SecurityAuditLogRepository;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class SecurityAuditLogService {

    @Autowired
    private SecurityAuditLogRepository repo;

    @Autowired
    private GeoLocationService geoLocationService;

    public void logLogin(Long userId, String email, String action, String ipAddress,
                         String latitude, String longitude, String device, String browser,
                         String status) {

        SecurityAuditLog log = new SecurityAuditLog();
        log.setUserId(userId);
        log.setEmail(email);
        log.setAction(action);
        log.setIpAddress(ipAddress);
        log.setDevice(device);
        log.setBrowser(browser);
        log.setLoginStatus(status);
        log.setCreatedAt(LocalDateTime.now());

        boolean hasLatLon = latitude != null && !latitude.isEmpty() && !latitude.equals("0.0") &&
                            longitude != null && !longitude.isEmpty() && !longitude.equals("0.0");

        if (hasLatLon) {
            log.setLatitude(latitude);
            log.setLongitude(longitude);
        } else {
            Map<String, String> geo = geoLocationService.getLocation(ipAddress);
            log.setLatitude(geo.get("lat"));
            log.setLongitude(geo.get("lon"));
        }

        Map<String, String> geo = geoLocationService.getLocation(ipAddress);
        log.setCity(geo.get("city"));
        log.setState(geo.get("state"));
        log.setCountry(geo.get("country"));

        repo.save(log);
    }

    public String getClientIP(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
}
