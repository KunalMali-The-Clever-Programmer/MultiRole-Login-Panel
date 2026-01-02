package com.Multi_Role.Login_Panel_SpringBoot_React.repository;

import java.util.*;

import org.springframework.boot.data.autoconfigure.web.DataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import com.Multi_Role.Login_Panel_SpringBoot_React.Model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	Optional<User> findByUsername(String username);

	Optional<User> findByEmail(String email);

//	Optional<User> findByEmail(String email);
	 List<User> findByManagerId(Long managerId);
	 List<User> findByManager(User manager);
	 List<User> findByManagerIsNull();
	 
	 // for pagination of code 
	 
	// Page<User> findByRole_Name(String role, Pageable pageable);

}
