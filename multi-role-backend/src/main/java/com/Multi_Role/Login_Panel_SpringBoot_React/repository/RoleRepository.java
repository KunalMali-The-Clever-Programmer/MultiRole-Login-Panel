package com.Multi_Role.Login_Panel_SpringBoot_React.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Multi_Role.Login_Panel_SpringBoot_React.Model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	
	Optional<Role> findByName(String name);

}
