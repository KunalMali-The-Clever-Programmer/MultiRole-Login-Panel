package com.Multi_Role.Login_Panel_SpringBoot_React.dto;

import jakarta.persistence.Entity;

//import lombok.Data;

//@Data
//@Entity
public class RegisterRequest {
    public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	private String username;
    private String email;
    private String password;
    private String role; // ADMIN / MANAGER / USER
}
