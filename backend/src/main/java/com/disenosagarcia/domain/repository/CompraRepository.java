package com.disenosagarcia.domain.repository;

import com.disenosagarcia.domain.model.Compra;
import com.disenosagarcia.domain.model.Producto;
import com.disenosagarcia.domain.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompraRepository extends JpaRepository<Compra, Long> {
    
    List<Compra> findByUsuario(Usuario usuario);
    
    @Query("SELECT c FROM Compra c JOIN c.producto p JOIN p.categoria cat WHERE c.usuario.idUsuario = :idUsuario")
    List<Compra> findByUsuarioId(@Param("idUsuario") Long idUsuario);
    
    Optional<Compra> findByUsuarioAndProducto(Usuario usuario, Producto producto);
    
    boolean existsByUsuarioAndProducto(Usuario usuario, Producto producto);
} 