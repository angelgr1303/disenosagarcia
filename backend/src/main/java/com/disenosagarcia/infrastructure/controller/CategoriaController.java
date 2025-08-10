package com.disenosagarcia.infrastructure.controller;

import com.disenosagarcia.application.dto.CategoriaDTO;
import com.disenosagarcia.application.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<?> getCategorias() {
        try {
            List<CategoriaDTO> categorias = categoriaService.getAllCategorias();
            Map<String, Object> res = new HashMap<>();
            res.put("status", "success");
            res.put("categorias", categorias);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            Map<String, String> res = new HashMap<>();
            res.put("status", "error");
            res.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(res);
        }
    }

    @GetMapping("/{nombre}/subcategorias")
    public ResponseEntity<?> getSubcategorias(@PathVariable String nombre) {
        try {
            List<CategoriaDTO> categorias = categoriaService.getSubcategoriasByNombre(nombre);
            Map<String, Object> res = new HashMap<>();
            res.put("status", "success");
            res.put("categorias", categorias);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            Map<String, String> res = new HashMap<>();
            res.put("status", "error");
            res.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(res);
        }
    }
} 