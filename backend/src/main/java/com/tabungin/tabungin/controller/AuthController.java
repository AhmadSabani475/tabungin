package com.tabungin.tabungin.controller;

import com.tabungin.tabungin.model.User;
import com.tabungin.tabungin.payload.ApiResponse;
import com.tabungin.tabungin.payload.LoginResponseDTO;
import com.tabungin.tabungin.payload.RegisterResponseDTO;
import com.tabungin.tabungin.repository.UserRepository;
import com.tabungin.tabungin.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepo;
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepo, AuthenticationManager authManager,
                          JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Map<String, RegisterResponseDTO>>> register(@RequestBody User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ApiResponse<>("fail", "Email sudah terdaftar", null)
            );
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User saved = userRepo.save(user);

        var userDTO = new RegisterResponseDTO(
                saved.getId(),
                saved.getName(),
                saved.getEmail()
        );

        return ResponseEntity.ok(new ApiResponse<>("success", "User created", Map.of("user", userDTO)));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, LoginResponseDTO>>> login(@RequestBody User user) {
        try {
            System.out.println("Try login for: " + user.getEmail());

            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );

            String token = jwtUtil.generateToken(user.getEmail());

            var response = ApiResponse.<Map<String, LoginResponseDTO>>builder()
                    .status("success")
                    .message("ok")
                    .data(Map.of("token", new LoginResponseDTO(token)))
                    .build();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            var errorResponse = ApiResponse.<Map<String, LoginResponseDTO>>builder()
                    .status("fail")
                    .message("Login gagal: " + e.getMessage())
                    .data(null)
                    .build();

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

}
