//package com.Multi_Role.Login_Panel_SpringBoot_React.OAUTH_2;
//
//import java.util.UUID;
//
//import org.hibernate.validator.internal.util.stereotypes.Lazy;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Service;
//
//import com.Multi_Role.Login_Panel_SpringBoot_React.Model.Role;
//import com.Multi_Role.Login_Panel_SpringBoot_React.Model.User;
//import com.Multi_Role.Login_Panel_SpringBoot_React.repository.RoleRepository;
//import com.Multi_Role.Login_Panel_SpringBoot_React.repository.UserRepository;
//
//@Service
//public class CustomOAuth2UserService extends DefaultOAuth2UserService {
//
//    private final UserRepository userRepository;
//    private final RoleRepository roleRepository;
//    
//    @Autowired
//    @Lazy  // prevent circular dependency
//    private PasswordEncoder passwordEncoder;
//    @Autowired
//    public CustomOAuth2UserService(
//            UserRepository userRepository,
//            RoleRepository roleRepository
//           // PasswordEncoder passwordEncoder
//            ) {
//        this.userRepository = userRepository;
//        this.roleRepository = roleRepository;
//      //  this.passwordEncoder=passwordEncoder;
//    }
//
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
//
//        OAuth2User oAuth2User = super.loadUser(userRequest);
//
//        String email = oAuth2User.getAttribute("email");
//        String name  = oAuth2User.getAttribute("name");
//
//        // 🔹 Always assign USER role for OAuth login
//        Role userRole = roleRepository.findByName("USER")
//                .orElseThrow(() -> new RuntimeException("Role USER not found"));
//
//        userRepository.findByEmail(email).orElseGet(() -> {
//            User user = new User();
//            user.setEmail(email);
//            user.setUsername(name);
//            user.setRole(userRole); // ✅ correct type
//            user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
//            return userRepository.save(user);
//        });
//
//        return oAuth2User;
//    }
//}


package com.Multi_Role.Login_Panel_SpringBoot_React.OAUTH_2;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;  // ✅ correct Lazy import
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.Multi_Role.Login_Panel_SpringBoot_React.Model.Role;
import com.Multi_Role.Login_Panel_SpringBoot_React.Model.User;
import com.Multi_Role.Login_Panel_SpringBoot_React.repository.RoleRepository;
import com.Multi_Role.Login_Panel_SpringBoot_React.repository.UserRepository;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    @Lazy  // ✅ Spring Lazy to break circular dependency
    private PasswordEncoder passwordEncoder;

    @Autowired
    public CustomOAuth2UserService(UserRepository userRepository,
                                   RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println("********** IN Custom oauth*************");

        String email = oAuth2User.getAttribute("email");
        System.out.println("User Email"+email);
        String name  = oAuth2User.getAttribute("name");
        System.out.println("NAme "+name);

        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Role USER not found"));

        userRepository.findByEmail(email).orElseGet(() -> {
            User user = new User();
            user.setEmail(email);
            user.setUsername(email);
            user.setRole(userRole);
            user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
            return userRepository.save(user);
        });

        return oAuth2User;
    }
}

