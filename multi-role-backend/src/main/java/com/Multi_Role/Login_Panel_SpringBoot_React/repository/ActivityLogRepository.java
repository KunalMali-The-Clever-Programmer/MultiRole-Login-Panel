package com.Multi_Role.Login_Panel_SpringBoot_React.repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Multi_Role.Login_Panel_SpringBoot_React.Model.ActivityLog;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
	
//	Optional<ActivityLog> findById(Long userId);
    List<ActivityLog> findByUsernameOrderByTimestampDesc(String username);
    
    List<ActivityLog> findAllByOrderByTimestampDesc();



}
