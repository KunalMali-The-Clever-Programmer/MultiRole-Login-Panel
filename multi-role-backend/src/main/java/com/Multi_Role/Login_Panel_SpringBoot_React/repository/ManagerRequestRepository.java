package com.Multi_Role.Login_Panel_SpringBoot_React.repository;

import java.util.*;

import org.hibernate.boot.models.JpaAnnotations;
import org.springframework.data.jpa.repository.JpaRepository;

import com.Multi_Role.Login_Panel_SpringBoot_React.Model.ManagerRequest;

public interface ManagerRequestRepository extends JpaRepository<ManagerRequest, Long> {

List<ManagerRequest> findByStatus(ManagerRequest.Status status);

Optional<ManagerRequest> findByManagerIdAndUserId(Long managerId, Long userId);
}