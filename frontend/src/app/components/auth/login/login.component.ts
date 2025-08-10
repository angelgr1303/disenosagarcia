import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-container">
        <div class="login-card">
            <img src="assets/img/horizontal-logo.png" alt="Logo">
            <h2>Iniciar Sesión</h2>
            <form (ngSubmit)="onLogin()" #loginForm="ngForm">
                <div class="mb-3">
                    <input 
                        type="text" 
                        class="form-control" 
                        [(ngModel)]="loginData.usuarioCorreo"
                        name="usuario_correo" 
                        placeholder="Correo Electrónico o Nombre de usuario" 
                        required>
                </div>
                <div class="mb-3 position-relative">
                    <input 
                        [type]="showPassword ? 'text' : 'password'" 
                        class="form-control" 
                        [(ngModel)]="loginData.contrasena"
                        name="contrasena" 
                        placeholder="Contraseña" 
                        required>
                    <i [class]="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'" 
                       class="position-absolute top-50 end-0 translate-middle-y pe-3" 
                       (click)="togglePassword()" 
                       style="cursor: pointer;"></i>
                </div>
                <button 
                    type="submit" 
                    class="btn btn-success w-100"
                    [disabled]="isLoading">
                    <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                    {{isLoading ? 'Iniciando...' : 'Iniciar Sesión'}}
                </button>
                <div class="text-center mt-3">
                    <a routerLink="/forgot-password" class="register-link">¿Olvidaste tu contraseña?</a>
                </div>
                <div class="mt-3">
                    <p>¿No tienes una cuenta? <a routerLink="/register" class="register-link">Regístrate</a></p>
                </div>
            </form>

            <!-- Alert para errores -->
            <div *ngIf="errorMessage" class="alert alert-danger mt-3" role="alert">
                {{errorMessage}}
            </div>

            <!-- Alert para mensajes informativos -->
            <div *ngIf="infoMessage" class="alert alert-info mt-3" role="alert">
                {{infoMessage}}
            </div>
        </div>
    </div>

    <!-- Modal para contraseña incorrecta -->
    <div class="modal fade" id="contraMal" tabindex="-1" aria-labelledby="contraMalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="contraMalLabel">Error de autenticación</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Las credenciales proporcionadas son incorrectas. Por favor, verifica tu usuario y contraseña.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal para usuario no registrado -->
    <div class="modal fade" id="noRegistrado" tabindex="-1" aria-labelledby="noRegistradoLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="noRegistradoLabel">Usuario no registrado</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    El usuario no está registrado en el sistema. ¿Deseas crear una cuenta nueva?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-success" (click)="goToRegister()">Registrarse</button>
                </div>
            </div>
        </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    usuarioCorreo: '',
    contrasena: ''
  };
  
  showPassword = false;
  isLoading = false;
  errorMessage = '';
  infoMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificar si ya está autenticado
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }

    // Manejar parámetros de URL para mostrar mensajes
    this.handleUrlParameters();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    if (!this.loginData.usuarioCorreo.trim() || !this.loginData.contrasena.trim()) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.infoMessage = '';

    this.authService.login({
      usuarioCorreo: this.loginData.usuarioCorreo,
      contrasena: this.loginData.contrasena
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.status === 'success') {
          this.infoMessage = 'Inicio de sesión exitoso. Redirigiendo...';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        } else {
          this.errorMessage = response.message || 'Error al iniciar sesión';
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error en login:', error);
        
        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Verifica tu usuario y contraseña.';
        } else if (error.status === 404) {
          this.errorMessage = 'Usuario no registrado. ¿Deseas crear una cuenta?';
        } else {
          this.errorMessage = 'Error al conectar con el servidor. Inténtalo de nuevo.';
        }
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  private handleUrlParameters(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');

    if (message === 'CI') {
      this.errorMessage = 'Las credenciales proporcionadas son incorrectas.';
    } else if (message === 'NR') {
      this.errorMessage = 'El usuario no está registrado en el sistema.';
    } else if (message === 'logout') {
      this.infoMessage = 'Has cerrado sesión correctamente.';
    } else if (message === 'registered') {
      this.infoMessage = 'Registro exitoso. Ya puedes iniciar sesión.';
    }
  }
} 