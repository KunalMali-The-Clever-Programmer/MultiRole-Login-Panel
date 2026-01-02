package com.Multi_Role.Login_Panel_SpringBoot_React.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {


    private final JwtTokenProvider jwtTokenProvider;

    public OAuth2SuccessHandler(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {
    	
    	System.out.println("**************IN Scucces handler OAuth");

        String email = authentication.getName();

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(email);
        System.out.println("Token "+token);

        // Set JWT as HttpOnly cookie
//        response.addHeader(
//            "Set-Cookie",
//            "token=" + token + "; Path=/; HttpOnly; SameSite=Lax"
//        );

        // Redirect directly to USER dashboard
//        response.sendRedirect("http://localhost:3000/user");
//        token="USER";
//        response.sendRedirect("http://localhost:3000/user?token=" + token);
        response.sendRedirect("http://localhost:3000/oauth2/redirect?token=" + token);



    }
}
