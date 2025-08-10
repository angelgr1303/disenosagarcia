package com.disenosagarcia.domain.repository;

import com.disenosagarcia.domain.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Optional<Usuario> findByEmail(String email);
    
    Optional<Usuario> findByUsuario(String usuario);
    
    Optional<Usuario> findByEmailOrUsuario(String email, String usuario);
    
    boolean existsByEmail(String email);
    
    boolean existsByUsuario(String usuario);
    
    @Query("SELECT COUNT(f) FROM Usuario u JOIN u.favoritos f WHERE u.idUsuario = :idUsuario")
    Long countFavoritosByUsuarioId(@Param("idUsuario") Long idUsuario);
    
    @Query("SELECT COUNT(c) FROM Usuario u JOIN u.carrito c WHERE u.idUsuario = :idUsuario")
    Long countCarritoByUsuarioId(@Param("idUsuario") Long idUsuario);
} 