import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
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
  status: string;
  message?: string;
  token?: string;
  user?: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    console.log('AuthService constructor - storedUser:', storedUser);
    
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(storedUser || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    
    console.log('AuthService constructor - initial user:', this.currentUserSubject.value);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(map(response => {
        if (response.status === 'success' && response.token && response.user) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response.user);
        }
        return response;
      }));
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const hasUser = !!this.currentUserValue;
    const hasToken = !!localStorage.getItem('token');
    console.log('AuthService.isAuthenticated - hasUser:', hasUser, 'hasToken:', hasToken);
    return hasUser && hasToken;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/refresh`, {});
  }

  forgotPassword(email: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/forgot-password`, { email });
  }

  resetPassword(token: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/reset-password`, { token, password });
  }
} 