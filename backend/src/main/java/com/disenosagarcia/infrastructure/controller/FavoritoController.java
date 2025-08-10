package com.disenosagarcia.infrastructure.controller;

import com.disenosagarcia.application.dto.FavoritoDTO;
import com.disenosagarcia.application.dto.ToggleFavoritoResponse;
import com.disenosagarcia.application.service.FavoritoService;
import com.disenosagarcia.domain.model.Usuario;
import com.disenosagarcia.domain.repository.UsuarioRepository;
import com.disenosagarcia.infrastructure.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favoritos")
@CrossOrigin(origins = "*")
public class FavoritoController {
    
    @Autowired
    private FavoritoService favoritoService;
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @GetMapping
    public ResponseEntity<?> getFavoritos(@RequestParam(required = false) String orden) {
        try {
            Long idUsuario = getCurrentUserId();
            List<FavoritoDTO> favoritos;
            
            if (orden != null && !orden.isEmpty()) {
                favoritos = favoritoService.getFavoritosByUsuarioOrderBy(idUsuario, orden);
            } else {
                favoritos = favoritoService.getFavoritosByUsuario(idUsuario);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("favoritos", favoritos);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/toggle")
    public ResponseEntity<?> toggleFavorito(@RequestBody Map<String, Long> request) {
        try {
            Long idProducto = request.get("id_producto");
            if (idProducto == null) {
                Map<String, String> response = new HashMap<>();
                response.put("status", "error");
                response.put("message", "ID de producto requerido");
                return ResponseEntity.badRequest().body(response);
            }
            
            Long idUsuario = getCurrentUserId();
            ToggleFavoritoResponse response = favoritoService.toggleFavorito(idUsuario, idProducto);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/count")
    public ResponseEntity<?> getFavoritosCount() {
        try {
            Long idUsuario = getCurrentUserId();
            Long count = favoritoService.countFavoritosByUsuario(idUsuario);
            
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
        
        System.out.println("DEBUG: Username from authentication: " + username);
        
        // Buscar el usuario por username para obtener su ID
        Usuario usuario = usuarioRepository.findByUsuario(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + username));
        
        System.out.println("DEBUG: Found user: " + usuario.getUsuario() + " with ID: " + usuario.getIdUsuario());
        
        return usuario.getIdUsuario();
    }
} 