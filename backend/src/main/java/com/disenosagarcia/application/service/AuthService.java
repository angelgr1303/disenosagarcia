package com.disenosagarcia.application.service;

import com.disenosagarcia.domain.model.Usuario;
import com.disenosagarcia.domain.repository.UsuarioRepository;
import com.disenosagarcia.application.dto.LoginRequest;
import com.disenosagarcia.application.dto.RegisterRequest;
import com.disenosagarcia.application.dto.AuthResponse;
import com.disenosagarcia.infrastructure.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    public AuthResponse register(RegisterRequest request) {
        // Verificar si el email ya existe
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        
        // Verificar si el usuario ya existe
        if (usuarioRepository.existsByUsuario(request.getUsuario())) {
            throw new RuntimeException("El nombre de usuario ya está registrado");
        }
        
        // Crear nuevo usuario
        Usuario usuario = new Usuario(
            request.getNombreCompleto(),
            request.getEmail(),
            request.getUsuario(),
            passwordEncoder.encode(request.getContrasena())
        );
        
        Usuario savedUsuario = usuarioRepository.save(usuario);
        
        String token = jwtService.generateToken(savedUsuario);
        
        AuthResponse.UserInfo userInfo = new AuthResponse.UserInfo(
            savedUsuario.getUsuario(),
            savedUsuario.getNombreCompleto(),
            savedUsuario.getEmail()
        );
        
        return new AuthResponse("success", token, userInfo);
    }
    
    public AuthResponse login(LoginRequest request) {
        // Autenticar usuario
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsuarioCorreo(), request.getContrasena())
        );
        
        // Buscar usuario por email o nombre de usuario
        Usuario usuario = usuarioRepository.findByEmailOrUsuario(request.getUsuarioCorreo(), request.getUsuarioCorreo())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        String token = jwtService.generateToken(usuario);
        
        AuthResponse.UserInfo userInfo = new AuthResponse.UserInfo(
            usuario.getUsuario(),
            usuario.getNombreCompleto(),
            usuario.getEmail()
        );
        
        return new AuthResponse("success", token, userInfo);
    }
} 