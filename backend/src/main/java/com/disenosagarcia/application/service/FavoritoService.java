package com.disenosagarcia.application.service;

import com.disenosagarcia.domain.model.Favorito;
import com.disenosagarcia.domain.model.Producto;
import com.disenosagarcia.domain.model.Usuario;
import com.disenosagarcia.domain.repository.FavoritoRepository;
import com.disenosagarcia.domain.repository.ProductoRepository;
import com.disenosagarcia.domain.repository.UsuarioRepository;
import com.disenosagarcia.application.dto.FavoritoDTO;
import com.disenosagarcia.application.dto.ToggleFavoritoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoritoService {
    
    @Autowired
    private FavoritoRepository favoritoRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private ProductoRepository productoRepository;
    
    public List<FavoritoDTO> getFavoritosByUsuario(Long idUsuario) {
        return favoritoRepository.findByUsuarioIdOrderByProductoNombre(idUsuario)
            .stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<FavoritoDTO> getFavoritosByUsuarioOrderBy(Long idUsuario, String orden) {
        List<Favorito> favoritos;
        
        switch (orden) {
            case "nombre":
                favoritos = favoritoRepository.findByUsuarioIdOrderByProductoNombre(idUsuario);
                break;
            case "precioMenor":
                favoritos = favoritoRepository.findByUsuarioIdOrderByProductoPrecioAsc(idUsuario);
                break;
            case "precioMayor":
                favoritos = favoritoRepository.findByUsuarioIdOrderByProductoPrecioDesc(idUsuario);
                break;
            case "cantidad_vendidos":
                favoritos = favoritoRepository.findByUsuarioIdOrderByProductoCantidadVendidosDesc(idUsuario);
                break;
            default:
                favoritos = favoritoRepository.findByUsuarioIdOrderByProductoNombre(idUsuario);
        }
        
        return favoritos.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    @Transactional
    public ToggleFavoritoResponse toggleFavorito(Long idUsuario, Long idProducto) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        Producto producto = productoRepository.findById(idProducto)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        if (favoritoRepository.existsByUsuarioAndProducto(usuario, producto)) {
            // Remover de favoritos
            favoritoRepository.deleteByUsuarioAndProducto(usuario, producto);
            return new ToggleFavoritoResponse("removed", "Eliminado de favoritos", idProducto);
        } else {
            // Agregar a favoritos
            Favorito favorito = new Favorito(usuario, producto);
            favoritoRepository.save(favorito);
            return new ToggleFavoritoResponse("added", "Añadido a favoritos", idProducto);
        }
    }
    
    public Long countFavoritosByUsuario(Long idUsuario) {
        return favoritoRepository.countFavoritosByUsuarioId(idUsuario);
    }
    
    private FavoritoDTO convertToDTO(Favorito favorito) {
    FavoritoDTO dto = new FavoritoDTO();
    dto.setId(favorito.getId());
    dto.setIdProducto(favorito.getProducto().getIdProducto());
    dto.setIdProductoFormateado(favorito.getProducto().getIdProductoFormateado());
    dto.setNombre(favorito.getProducto().getNombre());
    dto.setPrecio(favorito.getProducto().getPrecio());
    dto.setFoto(favorito.getProducto().getFoto());
    
    if (favorito.getProducto().getCategoria() != null) {
        dto.setCategoria(favorito.getProducto().getCategoria().getNombre());
        dto.setSubcategoria(favorito.getProducto().getCategoria().getSubcategoria());
    }
    
    return dto;
}
} 