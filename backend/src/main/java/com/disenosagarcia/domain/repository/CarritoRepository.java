package com.disenosagarcia.domain.repository;

import com.disenosagarcia.domain.model.Carrito;
import com.disenosagarcia.domain.model.Producto;
import com.disenosagarcia.domain.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarritoRepository extends JpaRepository<Carrito, Long> {
    
    List<Carrito> findByUsuario(Usuario usuario);
    
    @Query("SELECT c FROM Carrito c JOIN c.producto p JOIN p.categoria cat WHERE c.usuario.idUsuario = :idUsuario")
    List<Carrito> findByUsuarioId(@Param("idUsuario") Long idUsuario);
    
    Optional<Carrito> findByUsuarioAndProducto(Usuario usuario, Producto producto);
    
    boolean existsByUsuarioAndProducto(Usuario usuario, Producto producto);
    
    void deleteByUsuarioAndProducto(Usuario usuario, Producto producto);
    
    @Query("SELECT COUNT(c) FROM Carrito c WHERE c.usuario.idUsuario = :idUsuario")
    Long countCarritoByUsuarioId(@Param("idUsuario") Long idUsuario);
} 