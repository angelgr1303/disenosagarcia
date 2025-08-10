package com.disenosagarcia.domain.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "compras")
public class Compra {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_compra")
    private Long id;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_usuario")
private Usuario usuario;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_producto")
private Producto producto;

@Column(name = "cantidad", nullable = false)
private Integer cantidad;

@Column(name = "total", nullable = false, precision = 10, scale = 2)
private BigDecimal total;

@Column(name = "fecha_compra", nullable = false)
private LocalDateTime fechaCompra;
    
    // Constructores
public Compra() {
    this.fechaCompra = LocalDateTime.now();
}

public Compra(Usuario usuario, Producto producto, Integer cantidad, BigDecimal total) {
    this();
    this.usuario = usuario;
    this.producto = producto;
    this.cantidad = cantidad;
    this.total = total;
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

public Integer getCantidad() {
    return cantidad;
}

public void setCantidad(Integer cantidad) {
    this.cantidad = cantidad;
}

public BigDecimal getTotal() {
    return total;
}

public void setTotal(BigDecimal total) {
    this.total = total;
}

public LocalDateTime getFechaCompra() {
    return fechaCompra;
}

public void setFechaCompra(LocalDateTime fechaCompra) {
    this.fechaCompra = fechaCompra;
}
} 