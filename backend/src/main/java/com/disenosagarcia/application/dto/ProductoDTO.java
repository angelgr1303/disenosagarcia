package com.disenosagarcia.application.dto;

import java.math.BigDecimal;

public class ProductoDTO {
    
    private Long idProducto;
    private String idProductoFormateado;
    private String nombre;
    private BigDecimal precio;
    private String foto;
    private String ficheroCorel;
    private Integer cantidadVendidos;
    private String categoria;
    private String subcategoria;
    
    // Constructores
    public ProductoDTO() {}
    
    // Getters y Setters
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
    
    public String getFicheroCorel() {
        return ficheroCorel;
    }
    
    public void setFicheroCorel(String ficheroCorel) {
        this.ficheroCorel = ficheroCorel;
    }
    
    public Integer getCantidadVendidos() {
        return cantidadVendidos;
    }
    
    public void setCantidadVendidos(Integer cantidadVendidos) {
        this.cantidadVendidos = cantidadVendidos;
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
} 