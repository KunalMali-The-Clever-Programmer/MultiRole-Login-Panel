package com.Multi_Role.Login_Panel_SpringBoot_React.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String role;
    private Long managerId;
}
