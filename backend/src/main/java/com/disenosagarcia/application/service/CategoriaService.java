package com.disenosagarcia.application.service;

import com.disenosagarcia.application.dto.CategoriaDTO;
import com.disenosagarcia.domain.model.Categoria;
import com.disenosagarcia.domain.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<CategoriaDTO> getAllCategorias() {
        return categoriaRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<CategoriaDTO> getSubcategoriasByNombre(String nombre) {
        return categoriaRepository.findByNombre(nombre).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private CategoriaDTO toDTO(Categoria categoria) {
        return new CategoriaDTO(
                categoria.getIdCategoria(),
                categoria.getNombre(),
                categoria.getSubcategoria()
        );
    }
} 