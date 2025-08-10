package com.disenosagarcia.domain.repository;

import com.disenosagarcia.domain.model.Producto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
    @Query("SELECT p FROM Producto p JOIN p.categoria c ORDER BY p.cantidadVendidos DESC")
    List<Producto> findTopByCantidadVendidosOrderByCantidadVendidosDesc(Pageable pageable);
    
    @Query("SELECT p FROM Producto p JOIN p.categoria c WHERE " +
           "LOWER(p.nombre) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(c.nombre) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(c.subcategoria) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Producto> findByNombreOrCategoriaContainingIgnoreCase(@Param("query") String query);
    
    @Query("SELECT p FROM Producto p JOIN p.categoria c ORDER BY p.nombre")
    List<Producto> findAllOrderByNombre();
    
    @Query("SELECT p FROM Producto p JOIN p.categoria c ORDER BY p.precio")
    List<Producto> findAllOrderByPrecioAsc();
    
    @Query("SELECT p FROM Producto p JOIN p.categoria c ORDER BY p.precio DESC")
    List<Producto> findAllOrderByPrecioDesc();
    
    @Query("SELECT p FROM Producto p JOIN p.categoria c ORDER BY p.cantidadVendidos DESC")
    List<Producto> findAllOrderByCantidadVendidosDesc();
    
    Optional<Producto> findByIdProducto(Long idProducto);
} 