package com.disenosagarcia.application.dto;

public class CategoriaDTO {
    private Long idCategoria;
    private String nombre;
    private String subcategoria;

    public CategoriaDTO() {}

    public CategoriaDTO(Long idCategoria, String nombre, String subcategoria) {
        this.idCategoria = idCategoria;
        this.nombre = nombre;
        this.subcategoria = subcategoria;
    }

    public Long getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Long idCategoria) {
        this.idCategoria = idCategoria;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getSubcategoria() {
        return subcategoria;
    }

    public void setSubcategoria(String subcategoria) {
        this.subcategoria = subcategoria;
    }
} 