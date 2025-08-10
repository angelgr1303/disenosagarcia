package com.disenosagarcia.application.dto;

public class AuthResponse {
    
    private String status;
    private String token;
    private UserInfo user;
    
    // Constructores
    public AuthResponse() {}
    
    public AuthResponse(String status, String token, UserInfo user) {
        this.status = status;
        this.token = token;
        this.user = user;
    }
    
    // Clase interna para información del usuario
    public static class UserInfo {
        private String username;
        private String fullName;
        private String email;
        
        public UserInfo() {}
        
        public UserInfo(String username, String fullName, String email) {
            this.username = username;
            this.fullName = fullName;
            this.email = email;
        }
        
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }
    
    // Getters y Setters
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public UserInfo getUser() {
        return user;
    }
    
    public void setUser(UserInfo user) {
        this.user = user;
    }
} 