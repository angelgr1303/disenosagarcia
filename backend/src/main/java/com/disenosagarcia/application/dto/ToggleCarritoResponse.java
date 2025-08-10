package com.disenosagarcia.application.dto;

public class ToggleCarritoResponse {
    
    private String status;
    private String message;
    private Long idProducto;
    
    // Constructores
    public ToggleCarritoResponse() {}
    
    public ToggleCarritoResponse(String status, String message, Long idProducto) {
        this.status = status;
        this.message = message;
        this.idProducto = idProducto;
    }
    
    // Getters y Setters
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public Long getIdProducto() {
        return idProducto;
    }
    
    public void setIdProducto(Long idProducto) {
        this.idProducto = idProducto;
    }
} 