package com.disenosagarcia.infrastructure.controller;

import com.disenosagarcia.application.dto.CompraDTO;
import com.disenosagarcia.application.service.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = "*")
public class CompraController {
    
    @Autowired
    private CompraService compraService;
    
    @GetMapping
    public ResponseEntity<?> getCompras() {
        try {
            Long idUsuario = getCurrentUserId();
            List<CompraDTO> compras = compraService.getComprasByUsuario(idUsuario);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("compras", compras);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/realizar")
    public ResponseEntity<?> realizarCompra(@RequestBody Map<String, Long> request) {
        try {
            Long idProducto = request.get("id_producto");
            if (idProducto == null) {
                Map<String, String> response = new HashMap<>();
                response.put("status", "error");
                response.put("message", "ID de producto requerido");
                return ResponseEntity.badRequest().body(response);
            }
            
            Long idUsuario = getCurrentUserId();
            CompraDTO compra = compraService.realizarCompra(idUsuario, idProducto);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("compra", compra);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/verificar/{idProducto}")
    public ResponseEntity<?> verificarCompra(@PathVariable Long idProducto) {
        try {
            Long idUsuario = getCurrentUserId();
            boolean hasComprado = compraService.hasCompradoProducto(idUsuario, idProducto);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("hasComprado", hasComprado);
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