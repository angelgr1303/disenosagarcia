package com.disenosagarcia.infrastructure.controller;

import com.disenosagarcia.application.dto.CarritoDTO;
import com.disenosagarcia.application.dto.ToggleCarritoResponse;
import com.disenosagarcia.application.service.CarritoService;
import com.disenosagarcia.domain.model.Usuario;
import com.disenosagarcia.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "*")
public class CarritoController {
    
    @Autowired
    private CarritoService carritoService;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @GetMapping
    public ResponseEntity<?> getCarrito() {
        try {
            Long idUsuario = getCurrentUserId();
            List<CarritoDTO> carrito = carritoService.getCarritoByUsuario(idUsuario);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("carrito", carrito);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/toggle")
    public ResponseEntity<?> toggleCarrito(@RequestBody Map<String, Long> request) {
        try {
            Long idProducto = request.get("id_producto");
            if (idProducto == null) {
                Map<String, String> response = new HashMap<>();
                response.put("status", "error");
                response.put("message", "ID de producto requerido");
                return ResponseEntity.badRequest().body(response);
            }
            
            Long idUsuario = getCurrentUserId();
            ToggleCarritoResponse response = carritoService.toggleCarrito(idUsuario, idProducto);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/count")
    public ResponseEntity<?> getCarritoCount() {
        try {
            Long idUsuario = getCurrentUserId();
            Long count = carritoService.countCarritoByUsuario(idUsuario);
            
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
        
        // Buscar el usuario por username para obtener su ID
        Usuario usuario = usuarioRepository.findByUsuario(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        return usuario.getIdUsuario();
    }
} 