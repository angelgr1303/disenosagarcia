package com.disenosagarcia.domain.model;

import jakarta.persistence.*;

@Entity
@Table(name = "carrito")
public class Carrito {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_carrito")
    private Long id;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_usuario")
private Usuario usuario;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_producto")
private Producto producto;
    
    // Constructores
public Carrito() {
}

public Carrito(Usuario usuario, Producto producto) {
    this.usuario = usuario;
    this.producto = producto;
}
    
    // Getters y Setters
public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}
    
    public Usuario getUsuario() {
        return usuario;
    }
    
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    
    public Producto getProducto() {
    return producto;
}

public void setProducto(Producto producto) {
    this.producto = producto;
}
} 