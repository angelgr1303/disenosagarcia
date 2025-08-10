package com.disenosagarcia.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
    
    @NotBlank(message = "El nombre completo es obligatorio")
    private String nombreCompleto;
    
    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El formato del email no es válido")
    private String email;
    
    @NotBlank(message = "El usuario es obligatorio")
    @Size(min = 3, message = "El usuario debe tener al menos 3 caracteres")
    private String usuario;
    
    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String contrasena;
    
    @NotBlank(message = "La confirmación de contraseña es obligatoria")
    private String confirmarContrasena;
    
    // Constructores
    public RegisterRequest() {}
    
    public RegisterRequest(String nombreCompleto, String email, String usuario, String contrasena, String confirmarContrasena) {
        this.nombreCompleto = nombreCompleto;
        this.email = email;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.confirmarContrasena = confirmarContrasena;
    }
    
    // Getters y Setters
    public String getNombreCompleto() {
        return nombreCompleto;
    }
    
    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getUsuario() {
        return usuario;
    }
    
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    
    public String getContrasena() {
        return contrasena;
    }
    
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
    
    public String getConfirmarContrasena() {
        return confirmarContrasena;
    }
    
    public void setConfirmarContrasena(String confirmarContrasena) {
        this.confirmarContrasena = confirmarContrasena;
    }
} 