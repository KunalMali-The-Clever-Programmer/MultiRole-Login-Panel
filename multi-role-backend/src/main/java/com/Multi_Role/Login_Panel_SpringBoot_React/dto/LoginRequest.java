package com.Multi_Role.Login_Panel_SpringBoot_React.dto;


public class LoginRequest {
	
    private String email;
    private String password;
    private String latitude;
    private String longitude;
    private String device;
    private String browser;
    
    private String captchaToken;
    
	public String getCaptchaToken() {
		return captchaToken;
	}
	public void setCaptchaToken(String captchaToken) {
		this.captchaToken = captchaToken;
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
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getDevice() {
		return device;
	}
	public void setDevice(String device) {
		this.device = device;
	}
	public String getBrowser() {
		return browser;
	}
	public void setBrowser(String browser) {
		this.browser = browser;
	}
    
    
}
