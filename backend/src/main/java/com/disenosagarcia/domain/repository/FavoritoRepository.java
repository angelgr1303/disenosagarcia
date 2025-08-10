package com.disenosagarcia.domain.repository;

import com.disenosagarcia.domain.model.Favorito;
import com.disenosagarcia.domain.model.Producto;
import com.disenosagarcia.domain.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
    
    List<Favorito> findByUsuario(Usuario usuario);
    
    @Query("SELECT f FROM Favorito f JOIN f.producto p JOIN p.categoria c WHERE f.usuario.idUsuario = :idUsuario ORDER BY p.nombre")
    List<Favorito> findByUsuarioIdOrderByProductoNombre(@Param("idUsuario") Long idUsuario);
    
    @Query("SELECT f FROM Favorito f JOIN f.producto p JOIN p.categoria c WHERE f.usuario.idUsuario = :idUsuario ORDER BY p.precio")
    List<Favorito> findByUsuarioIdOrderByProductoPrecioAsc(@Param("idUsuario") Long idUsuario);
    
    @Query("SELECT f FROM Favorito f JOIN f.producto p JOIN p.categoria c WHERE f.usuario.idUsuario = :idUsuario ORDER BY p.precio DESC")
    List<Favorito> findByUsuarioIdOrderByProductoPrecioDesc(@Param("idUsuario") Long idUsuario);
    
    @Query("SELECT f FROM Favorito f JOIN f.producto p JOIN p.categoria c WHERE f.usuario.idUsuario = :idUsuario ORDER BY p.cantidadVendidos DESC")
    List<Favorito> findByUsuarioIdOrderByProductoCantidadVendidosDesc(@Param("idUsuario") Long idUsuario);
    
    Optional<Favorito> findByUsuarioAndProducto(Usuario usuario, Producto producto);
    
    boolean existsByUsuarioAndProducto(Usuario usuario, Producto producto);
    
    void deleteByUsuarioAndProducto(Usuario usuario, Producto producto);
    
    @Query("SELECT COUNT(f) FROM Favorito f WHERE f.usuario.idUsuario = :idUsuario")
    Long countFavoritosByUsuarioId(@Param("idUsuario") Long idUsuario);
} 