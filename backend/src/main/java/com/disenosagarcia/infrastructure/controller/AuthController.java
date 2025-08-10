package com.disenosagarcia.infrastructure.controller;

import com.disenosagarcia.application.dto.AuthResponse;
import com.disenosagarcia.application.dto.LoginRequest;
import com.disenosagarcia.application.dto.RegisterRequest;
import com.disenosagarcia.application.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            // Validar que las contraseñas coincidan
            if (!request.getContrasena().equals(request.getConfirmarContrasena())) {
                Map<String, String> response = new HashMap<>();
                response.put("status", "error");
                response.put("message", "Las contraseñas no coinciden");
                return ResponseEntity.badRequest().body(response);
            }
            
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
} 