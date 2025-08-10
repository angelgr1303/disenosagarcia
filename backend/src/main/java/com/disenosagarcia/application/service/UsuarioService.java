package com.disenosagarcia.application.service;

import com.disenosagarcia.domain.model.Usuario;
import com.disenosagarcia.domain.repository.UsuarioRepository;
import com.disenosagarcia.application.dto.UsuarioDTO;
import com.disenosagarcia.application.dto.UpdateUsuarioRequest;
import com.disenosagarcia.infrastructure.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;
    
    public UsuarioDTO getUsuarioById(Long idUsuario) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        return convertToDTO(usuario);
    }
    
    public UsuarioDTO updateUsuario(Long idUsuario, UpdateUsuarioRequest request) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // Verificar si el email ya existe (excluyendo el usuario actual)
        if (!usuario.getEmail().equals(request.getEmail()) && 
            usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        
        // Verificar si el usuario ya existe (excluyendo el usuario actual)
        if (!usuario.getUsuario().equals(request.getUsuario()) && 
            usuarioRepository.existsByUsuario(request.getUsuario())) {
            throw new RuntimeException("El nombre de usuario ya está registrado");
        }
        
        // Actualizar datos
        usuario.setNombreCompleto(request.getNombreCompleto());
        usuario.setEmail(request.getEmail());
        usuario.setUsuario(request.getUsuario());
        
        // Actualizar contraseña si se proporciona
        if (request.getContrasena() != null && !request.getContrasena().trim().isEmpty()) {
            usuario.setContrasena(passwordEncoder.encode(request.getContrasena()));
        }
        
        Usuario savedUsuario = usuarioRepository.save(usuario);
        
        return convertToDTO(savedUsuario);
    }
    
    public Long countFavoritosByUsuario(Long idUsuario) {
        return usuarioRepository.countFavoritosByUsuarioId(idUsuario);
    }
    
    public Long countCarritoByUsuario(Long idUsuario) {
        return usuarioRepository.countCarritoByUsuarioId(idUsuario);
    }
    
    private UsuarioDTO convertToDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setIdUsuario(usuario.getIdUsuario());
        dto.setNombreCompleto(usuario.getNombreCompleto());
        dto.setEmail(usuario.getEmail());
        dto.setUsuario(usuario.getUsuario());
        return dto;
    }
} 