package com.disenosagarcia.application.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class FavoritoDTO {
    
    private Long id;
    private Long idProducto;
    private String idProductoFormateado;
    private String nombre;
    private BigDecimal precio;
    private String foto;
    private String categoria;
    private String subcategoria;
    private LocalDateTime fechaAgregado;
    
    // Constructores
    public FavoritoDTO() {}
    
    // Getters y Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getIdProducto() {
        return idProducto;
    }
    
    public void setIdProducto(Long idProducto) {
        this.idProducto = idProducto;
    }
    
    public String getIdProductoFormateado() {
        return idProductoFormateado;
    }
    
    public void setIdProductoFormateado(String idProductoFormateado) {
        this.idProductoFormateado = idProductoFormateado;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public BigDecimal getPrecio() {
        return precio;
    }
    
    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }
    
    public String getFoto() {
        return foto;
    }
    
    public void setFoto(String foto) {
        this.foto = foto;
    }
    
    public String getCategoria() {
        return categoria;
    }
    
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
    
    public String getSubcategoria() {
        return subcategoria;
    }
    
    public void setSubcategoria(String subcategoria) {
        this.subcategoria = subcategoria;
    }
    
    public LocalDateTime getFechaAgregado() {
        return fechaAgregado;
    }
    
    public void setFechaAgregado(LocalDateTime fechaAgregado) {
        this.fechaAgregado = fechaAgregado;
    }
} 