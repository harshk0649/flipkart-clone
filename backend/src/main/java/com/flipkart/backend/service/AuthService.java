package com.flipkart.backend.service;

import com.flipkart.backend.config.JwtUtil;
import com.flipkart.backend.dto.LoginRequest;
import com.flipkart.backend.dto.SignupRequest;
import com.flipkart.backend.dto.UserResponse;
import com.flipkart.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public Map<String, Object> login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails);
            
            User user = userService.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", new UserResponse(user));
            response.put("success", true);
            
            return response;
            
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Invalid email or password");
        }
    }
    
    public Map<String, Object> signup(SignupRequest signupRequest) {
        if (userService.existsByEmail(signupRequest.getEmail())) {
            throw new RuntimeException("User with email " + signupRequest.getEmail() + " already exists");
        }
        
        User user = userService.createUser(
            signupRequest.getFirstName(),
            signupRequest.getLastName(),
            signupRequest.getEmail(),
            signupRequest.getPassword(),
            signupRequest.getPhone()
        );
        
        String token = jwtUtil.generateToken(user.getEmail());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", new UserResponse(user));
        response.put("success", true);
        
        return response;
    }
    
    public UserResponse getCurrentUser(String email) {
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserResponse(user);
    }
}
