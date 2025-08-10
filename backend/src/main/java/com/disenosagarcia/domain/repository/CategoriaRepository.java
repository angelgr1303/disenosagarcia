package com.disenosagarcia.domain.repository;

import com.disenosagarcia.domain.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
    List<Categoria> findByNombre(String nombre);
    
    List<Categoria> findBySubcategoria(String subcategoria);
    
    List<Categoria> findByNombreAndSubcategoria(String nombre, String subcategoria);
} 