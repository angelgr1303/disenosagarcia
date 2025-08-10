package com.disenosagarcia.infrastructure.controller;

import com.disenosagarcia.application.dto.ProductoDTO;
import com.disenosagarcia.application.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/buscar")
@CrossOrigin(origins = "*")
public class BuscarController {
    
    @Autowired
    private ProductoService productoService;
    
    @GetMapping
    public ResponseEntity<?> buscarProductos(@RequestParam String query) {
        try {
            if (query == null || query.trim().isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("status", "error");
                response.put("message", "No se ingresó un término de búsqueda.");
                return ResponseEntity.badRequest().body(response);
            }
            
            List<ProductoDTO> productos = productoService.buscarProductos(query.trim());
            
            if (productos.isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("status", "error");
                response.put("message", "No se encontraron productos.");
                return ResponseEntity.ok(response);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("productos", productos);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
} 