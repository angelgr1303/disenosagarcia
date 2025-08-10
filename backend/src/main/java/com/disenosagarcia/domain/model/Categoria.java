package com.disenosagarcia.domain.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categorias")
public class Categoria {
    
    @Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long idCategoria;
    
    @Column(name = "nombre", nullable = false)
    private String nombre;
    
    @Column(name = "subcategoria")
    private String subcategoria;
    
    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Producto> productos = new ArrayList<>();
    
    // Constructores
    public Categoria() {}
    
    public Categoria(String nombre, String subcategoria) {
        this.nombre = nombre;
        this.subcategoria = subcategoria;
    }
    
    // Getters y Setters
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
    
    public List<Producto> getProductos() {
        return productos;
    }
    
    public void setProductos(List<Producto> productos) {
        this.productos = productos;
    }
    
    // Métodos de dominio
    public void agregarProducto(Producto producto) {
        this.productos.add(producto);
        producto.setCategoria(this);
    }
    
    public void removerProducto(Producto producto) {
        this.productos.remove(producto);
        producto.setCategoria(null);
    }
} 