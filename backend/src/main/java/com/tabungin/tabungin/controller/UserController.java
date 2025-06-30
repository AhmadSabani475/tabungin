package com.tabungin.tabungin.controller;

import com.tabungin.tabungin.model.User;
import com.tabungin.tabungin.payload.ApiResponse;
import com.tabungin.tabungin.payload.UserResponseDTO;
import com.tabungin.tabungin.repository.UserRepository;
import com.tabungin.tabungin.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepo;
    private final JwtUtil jwtUtil;

    public UserController(UserRepository userRepo, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getCurrentUser(Authentication authentication) {
        String email = authentication.getName(); // diambil dari JWT
        User user = userRepo.findByEmail(email).orElseThrow();

        var userDTO = new UserResponseDTO
                (user.getId(), user.getName(), user.getEmail());
        return ResponseEntity.ok(
                new ApiResponse<>("success", "ok", Map.of("user", userDTO))
        );

    }
}
