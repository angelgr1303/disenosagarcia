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
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;
    
    @GetMapping
    public ResponseEntity<?> getAllProductos(@RequestParam(required = false) String orden) {
        try {
            List<ProductoDTO> productos;
            if (orden != null && !orden.isEmpty()) {
                productos = productoService.getAllProductosOrderBy(orden);
            } else {
                productos = productoService.getAllProductos();
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
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductoById(@PathVariable Long id) {
        try {
            return productoService.getProductoById(id)
                    .map(producto -> {
                        Map<String, Object> response = new HashMap<>();
                        response.put("status", "success");
                        response.put("producto", producto);
                        return ResponseEntity.ok(response);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/id-producto/{idProducto}")
    public ResponseEntity<?> getProductoByIdProducto(@PathVariable Long idProducto) {
        try {
            return productoService.getProductoByIdProducto(idProducto)
                    .map(producto -> {
                        Map<String, Object> response = new HashMap<>();
                        response.put("status", "success");
                        response.put("producto", producto);
                        return ResponseEntity.ok(response);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/mas-vendidos")
    public ResponseEntity<?> getMasVendidos() {
        try {
            List<ProductoDTO> productos = productoService.getMasVendidos();
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