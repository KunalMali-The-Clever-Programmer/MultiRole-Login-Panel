package com.Multi_Role.Login_Panel_SpringBoot_React.seeder;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import com.Multi_Role.Login_Panel_SpringBoot_React.repository.RoleRepository;
import com.Multi_Role.Login_Panel_SpringBoot_React.repository.UserRepository;
import com.Multi_Role.Login_Panel_SpringBoot_React.Model.Role;
import com.Multi_Role.Login_Panel_SpringBoot_React.Model.User;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired private RoleRepository roleRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        if (roleRepository.count() == 0) {
            roleRepository.save(new Role(null, "ADMIN"));
            roleRepository.save(new Role(null, "MANAGER"));
            roleRepository.save(new Role(null, "USER"));
        }

        if (userRepository.findByUsername("admin").isEmpty()) {
            Role adminRole = roleRepository.findByName("ADMIN").orElseThrow();
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(adminRole);
            userRepository.save(admin);
            System.out.println("Default admin created (admin/admin123)");
        }
    }
}
