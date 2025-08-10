package com.disenosagarcia.application.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {
    
    @NotBlank(message = "El usuario o correo es obligatorio")
    private String usuarioCorreo;
    
    @NotBlank(message = "La contraseña es obligatoria")
    private String contrasena;
    
    // Constructores
    public LoginRequest() {}
    
    public LoginRequest(String usuarioCorreo, String contrasena) {
        this.usuarioCorreo = usuarioCorreo;
        this.contrasena = contrasena;
    }
    
    // Getters y Setters
    public String getUsuarioCorreo() {
        return usuarioCorreo;
    }
    
    public void setUsuarioCorreo(String usuarioCorreo) {
        this.usuarioCorreo = usuarioCorreo;
    }
    
    public String getContrasena() {
        return contrasena;
    }
    
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
} 