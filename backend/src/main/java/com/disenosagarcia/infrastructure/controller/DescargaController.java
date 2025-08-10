package com.disenosagarcia.infrastructure.controller;

import com.disenosagarcia.application.service.CompraService;
import com.disenosagarcia.application.service.ProductoService;
import com.disenosagarcia.application.dto.ProductoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/descargas")
@CrossOrigin(origins = "*")
public class DescargaController {
    
    @Autowired
    private CompraService compraService;
    
    @Autowired
    private ProductoService productoService;
    
    @GetMapping("/{idProducto}")
    public ResponseEntity<?> descargarArchivo(@PathVariable Long idProducto) {
        try {
            Long idUsuario = getCurrentUserId();
            
            // Verificar si el usuario ha comprado el producto
            if (!compraService.hasCompradoProducto(idUsuario, idProducto)) {
                Map<String, String> response = new HashMap<>();
                response.put("status", "error");
                response.put("message", "No tienes permiso para descargar este archivo.");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Obtener información del producto
            ProductoDTO producto = productoService.getProductoById(idProducto)
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
            
            if (producto.getFicheroCorel() == null || producto.getFicheroCorel().isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("status", "error");
                response.put("message", "El archivo no existe.");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Construir la ruta del archivo
            Path filePath = Paths.get("assets/corel/" + producto.getFicheroCorel());
            Resource resource = new UrlResource(filePath.toUri());
            
            if (!resource.exists()) {
                Map<String, String> response = new HashMap<>();
                response.put("status", "error");
                response.put("message", "El archivo no existe.");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Generar nombre de descarga
            String nombreDescarga = producto.getNombre().replaceAll("[^a-zA-Z0-9_-]", "_") + ".cdr";
            
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + nombreDescarga + "\"")
                    .body(resource);
                    
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