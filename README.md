# Multi-Role Login Panel

A full-stack **Multi-Role Login System** built with **Spring Boot** (backend) and **ReactJS** (frontend).  
Supports multiple user roles (Admin, Manager, User), role-based authentication, JWT security, OAuth2 login, and activity tracking.

---

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Security](#security)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

---

## Features

### Common Features for All Users
- Register / Login (normal + Google OAuth2)
- Forgot Password with Email OTP
- Email OTP Verification
- Update Profile & Change Password
- Activity Logs (view your own actions)
- Logout functionality
- Security logs: device info, IP, browser, geolocation

### User Dashboard
- View Manager details
- Track your own activities

### Manager Dashboard
- View assigned users
- Request to add new users
- Track user activity

### Admin Dashboard
- Add / Edit / Delete Users, Managers, Admins
- Approve manager requests
- Filter and view activity logs for all users
- View security logs (device, location, IP)
- Full control over system users

---

## Screenshots

> Add your project screenshots in this section to showcase UI & functionality.

![Login Page](screenshots/login.png)
![User Dashboard](screenshots/user-dashboard.png)
![Manager Dashboard](screenshots/manager-dashboard.png)
![Admin Dashboard](screenshots/admin-dashboard.png)
![Activity Log](screenshots/activity-log.png)

> Replace the file paths with your actual screenshot filenames in the `screenshots/` folder.

---

## Tech Stack
**Frontend:** ReactJS, React-Bootstrap, SCSS, Framer Motion  
**Backend:** Java, Spring Boot, Spring Security, JWT, OAuth2  
**Database:** MySQL  
**Tools & Libraries:** Axios, Material-UI, Node.js, Git  

---

## Installation

### Backend
```bash
cd multi-role-backend
mvn clean install
mvn spring-boot:run
