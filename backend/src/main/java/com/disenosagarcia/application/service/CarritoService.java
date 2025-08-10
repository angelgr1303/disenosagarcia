package com.disenosagarcia.application.service;

import com.disenosagarcia.domain.model.Carrito;
import com.disenosagarcia.domain.model.Producto;
import com.disenosagarcia.domain.model.Usuario;
import com.disenosagarcia.domain.repository.CarritoRepository;
import com.disenosagarcia.domain.repository.ProductoRepository;
import com.disenosagarcia.domain.repository.UsuarioRepository;
import com.disenosagarcia.application.dto.CarritoDTO;
import com.disenosagarcia.application.dto.ToggleCarritoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarritoService {
    
    @Autowired
    private CarritoRepository carritoRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private ProductoRepository productoRepository;
    
    public List<CarritoDTO> getCarritoByUsuario(Long idUsuario) {
        return carritoRepository.findByUsuarioId(idUsuario)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    @Transactional
    public ToggleCarritoResponse toggleCarrito(Long idUsuario, Long idProducto) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        Producto producto = productoRepository.findById(idProducto)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        if (carritoRepository.existsByUsuarioAndProducto(usuario, producto)) {
            // Remover del carrito
            carritoRepository.deleteByUsuarioAndProducto(usuario, producto);
            return new ToggleCarritoResponse("removed", "Eliminado del carrito", idProducto);
        } else {
            // Agregar al carrito
            Carrito carrito = new Carrito(usuario, producto);
            carritoRepository.save(carrito);
            return new ToggleCarritoResponse("added", "Añadido al carrito", idProducto);
        }
    }
    
    public Long countCarritoByUsuario(Long idUsuario) {
        return carritoRepository.countCarritoByUsuarioId(idUsuario);
    }
    
    private CarritoDTO convertToDTO(Carrito carrito) {
    CarritoDTO dto = new CarritoDTO();
    dto.setId(carrito.getId());
    dto.setIdProducto(carrito.getProducto().getIdProducto());
    dto.setIdProductoFormateado(carrito.getProducto().getIdProductoFormateado());
    dto.setNombre(carrito.getProducto().getNombre());
    dto.setPrecio(carrito.getProducto().getPrecio());
    dto.setFoto(carrito.getProducto().getFoto());
    
    if (carrito.getProducto().getCategoria() != null) {
        dto.setCategoria(carrito.getProducto().getCategoria().getNombre());
        dto.setSubcategoria(carrito.getProducto().getCategoria().getSubcategoria());
    }
    
    return dto;
}
} 