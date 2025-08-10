package com.disenosagarcia.domain.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuario {
    
    @Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long idUsuario;
    
    @Column(name = "nombre_completo", nullable = false)
    private String nombreCompleto;
    
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    
    @Column(name = "usuario", nullable = false, unique = true)
    private String usuario;
    
    @Column(name = "contrasena", nullable = false)
    private String contrasena;
    
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Favorito> favoritos = new ArrayList<>();
    
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Carrito> carrito = new ArrayList<>();
    
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Compra> compras = new ArrayList<>();
    
    // Constructores
    public Usuario() {}
    
    public Usuario(String nombreCompleto, String email, String usuario, String contrasena) {
        this.nombreCompleto = nombreCompleto;
        this.email = email;
        this.usuario = usuario;
        this.contrasena = contrasena;
    }
    
    // Getters y Setters
public Long getIdUsuario() {
    return idUsuario;
}

public void setIdUsuario(Long idUsuario) {
    this.idUsuario = idUsuario;
}
    
    public String getNombreCompleto() {
        return nombreCompleto;
    }
    
    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getUsuario() {
        return usuario;
    }
    
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    
    public String getContrasena() {
        return contrasena;
    }
    
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
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
    public void agregarFavorito(Favorito favorito) {
        this.favoritos.add(favorito);
        favorito.setUsuario(this);
    }
    
    public void removerFavorito(Favorito favorito) {
        this.favoritos.remove(favorito);
        favorito.setUsuario(null);
    }
    
    public void agregarAlCarrito(Carrito itemCarrito) {
        this.carrito.add(itemCarrito);
        itemCarrito.setUsuario(this);
    }
    
    public void removerDelCarrito(Carrito itemCarrito) {
        this.carrito.remove(itemCarrito);
        itemCarrito.setUsuario(null);
    }
    
    public void realizarCompra(Compra compra) {
        this.compras.add(compra);
        compra.setUsuario(this);
    }
} 