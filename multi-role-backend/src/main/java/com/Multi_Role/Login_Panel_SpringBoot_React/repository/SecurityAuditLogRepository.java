package com.Multi_Role.Login_Panel_SpringBoot_React.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Multi_Role.Login_Panel_SpringBoot_React.Model.SecurityAuditLog;

public interface SecurityAuditLogRepository extends JpaRepository<SecurityAuditLog, Integer> {

	
	
	 List<SecurityAuditLog> findByUserId(Long userId);
	 
	 List<SecurityAuditLog> findAllByOrderByCreatedAtDesc();

}
