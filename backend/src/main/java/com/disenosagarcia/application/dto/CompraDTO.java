package com.disenosagarcia.application.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CompraDTO {
    
    private Long id;
    private Long idProducto;
    private String idProductoFormateado;
    private String nombre;
    private BigDecimal precioCompra;
    private String foto;
    private String ficheroCorel;
    private String categoria;
    private String subcategoria;
    private LocalDateTime fechaCompra;
    
    // Constructores
    public CompraDTO() {}
    
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
    
    public BigDecimal getPrecioCompra() {
        return precioCompra;
    }
    
    public void setPrecioCompra(BigDecimal precioCompra) {
        this.precioCompra = precioCompra;
    }
    
    public String getFoto() {
        return foto;
    }
    
    public void setFoto(String foto) {
        this.foto = foto;
    }
    
    public String getFicheroCorel() {
        return ficheroCorel;
    }
    
    public void setFicheroCorel(String ficheroCorel) {
        this.ficheroCorel = ficheroCorel;
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
    
    public LocalDateTime getFechaCompra() {
        return fechaCompra;
    }
    
    public void setFechaCompra(LocalDateTime fechaCompra) {
        this.fechaCompra = fechaCompra;
    }
} 