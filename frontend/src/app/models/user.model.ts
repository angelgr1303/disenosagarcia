export interface User {
  idUsuario: number;
  nombreCompleto: string;
  email: string;
  usuario: string;
}

export interface LoginRequest {
  usuarioCorreo: string;
  contrasena: string;
}

export interface RegisterRequest {
  nombreCompleto: string;
  email: string;
  usuario: string;
  contrasena: string;
  confirmarContrasena: string;
}

export interface AuthResponse {
  token: string;
  usuario: string;
  nombreCompleto: string;
}

export interface UpdateUserRequest {
  nombreCompleto: string;
  email: string;
  usuario: string;
  contrasena?: string;
}

export interface UserResponse {
  status: string;
  usuario: User;
}

export interface CountResponse {
  status: string;
  count: number;
} 