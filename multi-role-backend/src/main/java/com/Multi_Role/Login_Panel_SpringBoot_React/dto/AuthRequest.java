package com.Multi_Role.Login_Panel_SpringBoot_React.dto;

import jakarta.persistence.Entity;

//import lombok.Data;
//
//@Data

public class AuthRequest {
    public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	private String username;
    private String password;
}
