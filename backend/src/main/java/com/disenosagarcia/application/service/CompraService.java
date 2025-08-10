package com.disenosagarcia.application.service;

import com.disenosagarcia.domain.model.Compra;
import com.disenosagarcia.domain.model.Producto;
import com.disenosagarcia.domain.model.Usuario;
import com.disenosagarcia.domain.repository.CompraRepository;
import com.disenosagarcia.domain.repository.ProductoRepository;
import com.disenosagarcia.domain.repository.UsuarioRepository;
import com.disenosagarcia.application.dto.CompraDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompraService {
    
    @Autowired
    private CompraRepository compraRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private ProductoRepository productoRepository;
    
    public List<CompraDTO> getComprasByUsuario(Long idUsuario) {
        return compraRepository.findByUsuarioId(idUsuario)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    @Transactional
    public CompraDTO realizarCompra(Long idUsuario, Long idProducto) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        Producto producto = productoRepository.findById(idProducto)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        // Verificar si ya compró el producto
        if (compraRepository.existsByUsuarioAndProducto(usuario, producto)) {
            throw new RuntimeException("Ya has comprado este producto");
        }
        
        // Crear la compra
Compra compra = new Compra(usuario, producto, 1, producto.getPrecio());
        Compra savedCompra = compraRepository.save(compra);
        
        // Incrementar cantidad de ventas del producto
        producto.incrementarVentas();
        productoRepository.save(producto);
        
        return convertToDTO(savedCompra);
    }
    
    public boolean hasCompradoProducto(Long idUsuario, Long idProducto) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        Producto producto = productoRepository.findById(idProducto)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        return compraRepository.existsByUsuarioAndProducto(usuario, producto);
    }
    
    private CompraDTO convertToDTO(Compra compra) {
    CompraDTO dto = new CompraDTO();
    dto.setId(compra.getId());
    dto.setIdProducto(compra.getProducto().getIdProducto());
    dto.setIdProductoFormateado(compra.getProducto().getIdProductoFormateado());
    dto.setNombre(compra.getProducto().getNombre());
    dto.setPrecioCompra(compra.getTotal());
    dto.setFoto(compra.getProducto().getFoto());
    dto.setFicheroCorel(compra.getProducto().getFicheroCorel());
    dto.setFechaCompra(compra.getFechaCompra());
    
    if (compra.getProducto().getCategoria() != null) {
        dto.setCategoria(compra.getProducto().getCategoria().getNombre());
        dto.setSubcategoria(compra.getProducto().getCategoria().getSubcategoria());
    }
    
    return dto;
}
} 