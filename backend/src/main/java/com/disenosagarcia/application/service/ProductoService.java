package com.disenosagarcia.application.service;

import com.disenosagarcia.domain.model.Producto;
import com.disenosagarcia.domain.repository.ProductoRepository;
import com.disenosagarcia.application.dto.ProductoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;
    
    public List<ProductoDTO> getAllProductos() {
        return productoRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<ProductoDTO> getAllProductosOrderBy(String orden) {
        List<Producto> productos;
        
        switch (orden) {
            case "nombre":
                productos = productoRepository.findAllOrderByNombre();
                break;
            case "precioMenor":
                productos = productoRepository.findAllOrderByPrecioAsc();
                break;
            case "precioMayor":
                productos = productoRepository.findAllOrderByPrecioDesc();
                break;
            case "cantidad_vendidos":
                productos = productoRepository.findAllOrderByCantidadVendidosDesc();
                break;
            default:
                productos = productoRepository.findAll();
        }
        
        return productos.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<ProductoDTO> getMasVendidos() {
        return productoRepository.findTopByCantidadVendidosOrderByCantidadVendidosDesc(PageRequest.of(0, 3))
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<ProductoDTO> buscarProductos(String query) {
        return productoRepository.findByNombreOrCategoriaContainingIgnoreCase(query)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public Optional<ProductoDTO> getProductoById(Long id) {
        return productoRepository.findById(id)
            .map(this::convertToDTO);
    }
    
    public Optional<ProductoDTO> getProductoByIdProducto(Long idProducto) {
        return productoRepository.findByIdProducto(idProducto)
            .map(this::convertToDTO);
    }
    
    private ProductoDTO convertToDTO(Producto producto) {
        ProductoDTO dto = new ProductoDTO();
        dto.setIdProducto(producto.getIdProducto());
        dto.setIdProductoFormateado(producto.getIdProductoFormateado());
        dto.setNombre(producto.getNombre());
        dto.setPrecio(producto.getPrecio());
        dto.setFoto(producto.getFoto());
        dto.setFicheroCorel(producto.getFicheroCorel());
        dto.setCantidadVendidos(producto.getCantidadVendidos());
        
        if (producto.getCategoria() != null) {
            dto.setCategoria(producto.getCategoria().getNombre());
            dto.setSubcategoria(producto.getCategoria().getSubcategoria());
        }
        
        return dto;
    }
} 