package com.disenosagarcia.domain.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "productos")
public class Producto {
    
    @Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long idProducto;
    
    @Column(name = "nombre", nullable = false)
    private String nombre;
    
    @Column(name = "precio", nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;
    
    @Column(name = "foto")
    private String foto;
    
    @Column(name = "fichero_corel")
    private String ficheroCorel;
    
    @Column(name = "cantidad_vendidos", nullable = false)
    private Integer cantidadVendidos = 0;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categoria", nullable = false)
    private Categoria categoria;
    
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Favorito> favoritos = new ArrayList<>();
    
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Carrito> carrito = new ArrayList<>();
    
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Compra> compras = new ArrayList<>();
    
    // Constructores
    public Producto() {}
    
    public Producto(String nombre, BigDecimal precio, String foto, String ficheroCorel, Categoria categoria) {
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
        this.ficheroCorel = ficheroCorel;
        this.categoria = categoria;
    }
    
    // Getters y Setters
public Long getIdProducto() {
    return idProducto;
}

public void setIdProducto(Long idProducto) {
    this.idProducto = idProducto;
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
    
    public Categoria getCategoria() {
        return categoria;
    }
    
    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
    
    public List<Favorito> getFavoritos() {
        return favoritos;
    }
    
    public void setFavoritos(List<Favorito> favoritos) {
        this.favoritos = favoritos;
    }
    
    public List<Carrito> getCarrito() {
        return carrito;
    }
    
    public void setCarrito(List<Carrito> carrito) {
        this.carrito = carrito;
    }
    
    public List<Compra> getCompras() {
        return compras;
    }
    
    public void setCompras(List<Compra> compras) {
        this.compras = compras;
    }
    
    // Métodos de dominio
    public void incrementarVentas() {
        this.cantidadVendidos++;
    }
    
    public String getIdProductoFormateado() {
        return String.format("%03d", this.idProducto);
    }
} 