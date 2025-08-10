package com.disenosagarcia.infrastructure.controller;

import com.disenosagarcia.application.dto.UsuarioDTO;
import com.disenosagarcia.application.dto.UpdateUsuarioRequest;
import com.disenosagarcia.application.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;
    
    @GetMapping("/perfil")
    public ResponseEntity<?> getPerfil() {
        try {
            Long idUsuario = getCurrentUserId();
            UsuarioDTO usuario = usuarioService.getUsuarioById(idUsuario);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("usuario", usuario);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PutMapping("/perfil")
    public ResponseEntity<?> updatePerfil(@Valid @RequestBody UpdateUsuarioRequest request) {
        try {
            Long idUsuario = getCurrentUserId();
            UsuarioDTO usuario = usuarioService.updateUsuario(idUsuario, request);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("usuario", usuario);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/favoritos/count")
    public ResponseEntity<?> getFavoritosCount() {
        try {
            Long idUsuario = getCurrentUserId();
            Long count = usuarioService.countFavoritosByUsuario(idUsuario);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("count", count);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/carrito/count")
    public ResponseEntity<?> getCarritoCount() {
        try {
            Long idUsuario = getCurrentUserId();
            Long count = usuarioService.countCarritoByUsuario(idUsuario);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("count", count);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        // Aquí necesitarías obtener el ID del usuario desde el repositorio
        // Por simplicidad, asumimos que el username es el ID
        return Long.parseLong(username);
    }
} 