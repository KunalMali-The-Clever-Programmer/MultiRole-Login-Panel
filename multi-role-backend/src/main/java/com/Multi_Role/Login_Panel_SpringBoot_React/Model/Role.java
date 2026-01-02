package com.Multi_Role.Login_Panel_SpringBoot_React.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles")
@Data

public class Role {

    public Role(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;  // ADMIN, MANAGER, USER

	public Role() {
		super();
		// TODO Auto-generated constructor stub
	}
}
