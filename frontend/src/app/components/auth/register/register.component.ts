import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

interface RegisterData {
  nombre_completo: string;
  usuario: string;
  email: string;
  contrasena: string;
  confirmar_contrasena: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="register-container">
        <div class="register-card">
            <img src="assets/img/horizontal-logo.png" alt="Logo">
            <h2>¡Registrate en Diseños A.García!</h2>
            <form (ngSubmit)="onRegister()" #registerForm="ngForm">
                <div class="mb-3">
                    <input 
                        type="text" 
                        class="form-control" 
                        [(ngModel)]="registerData.nombre_completo"
                        name="nombre_completo" 
                        placeholder="Nombre Completo*" 
                        required>
                </div>
                <div class="mb-3">
                    <input 
                        type="text" 
                        class="form-control" 
                        [(ngModel)]="registerData.usuario"
                        name="usuario" 
                        placeholder="Nombre de usuario*" 
                        required>
                </div>
                <div class="mb-3">
                    <input 
                        type="email" 
                        class="form-control" 
                        [(ngModel)]="registerData.email"
                        name="email" 
                        placeholder="Correo Electrónico*" 
                        required>
                </div>
                <div class="mb-3 position-relative">
                    <input 
                        [type]="showPassword ? 'text' : 'password'" 
                        class="form-control" 
                        [(ngModel)]="registerData.contrasena"
                        name="contrasena" 
                        placeholder="Contraseña*" 
                        required>
                    <i 
                        [class]="'fa fa-' + (showPassword ? 'eye-slash' : 'eye') + ' position-absolute end-0 top-50 translate-middle-y me-3'" 
                        style="cursor: pointer;" 
                        (click)="togglePassword()"></i>
                </div>
                <div class="mb-3 position-relative">
                    <input 
                        [type]="showConfirmPassword ? 'text' : 'password'" 
                        class="form-control" 
                        [(ngModel)]="registerData.confirmar_contrasena"
                        name="confirmar_contrasena" 
                        placeholder="Confirmar Contraseña*" 
                        required>
                    <i 
                        [class]="'fa fa-' + (showConfirmPassword ? 'eye-slash' : 'eye') + ' position-absolute end-0 top-50 translate-middle-y me-3'" 
                        style="cursor: pointer;" 
                        (click)="toggleConfirmPassword()"></i>
                </div>
                
                <div *ngIf="errorMessage" class="alert alert-danger">{{errorMessage}}</div>
                <div *ngIf="successMessage" class="alert alert-success">{{successMessage}}</div>
                
                <button 
                    type="submit" 
                    class="btn btn-success w-100"
                    [disabled]="isLoading">
                    <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                    {{isLoading ? 'Registrando...' : 'Registrarse'}}
                </button>
                <div class="mt-3">
                    <p>¿Ya tienes una cuenta? <a routerLink="/login" class="login-link">Iniciar sesión</a></p>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal de Error Correo Repetido -->
    <div class="modal fade" id="errorEmailModal" tabindex="-1" [class.show]="showEmailErrorModal" [style.display]="showEmailErrorModal ? 'block' : 'none'">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Error al crear la cuenta</h5>
                    <button type="button" class="btn-close" (click)="closeModal()" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <p>El correo utilizado ya está registrado</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" (click)="closeModal()">Reintentar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de Error Usuario Repetido -->
    <div class="modal fade" id="errorUserModal" tabindex="-1" [class.show]="showUserErrorModal" [style.display]="showUserErrorModal ? 'block' : 'none'">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Error al crear la cuenta</h5>
                    <button type="button" class="btn-close" (click)="closeModal()" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <p>El nombre de usuario ya está en uso</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" (click)="closeModal()">Reintentar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de Éxito -->
    <div class="modal fade" id="successModal" tabindex="-1" [class.show]="showSuccessModal" [style.display]="showSuccessModal ? 'block' : 'none'">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Registro correcto</h5>
                    <button type="button" class="btn-close" (click)="closeModal()" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <p>Su registro ha sido realizado con éxito</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" (click)="goToLogin()">Iniciar sesión</button>
                </div>
            </div>
        </div>
    </div>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData: RegisterData = {
    nombre_completo: '',
    usuario: '',
    email: '',
    contrasena: '',
    confirmar_contrasena: ''
  };

  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  
  showEmailErrorModal = false;
  showUserErrorModal = false;
  showSuccessModal = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onRegister(): void {
    // Validaciones
    if (!this.registerData.nombre_completo.trim() || 
        !this.registerData.usuario.trim() || 
        !this.registerData.email.trim() || 
        !this.registerData.contrasena.trim() || 
        !this.registerData.confirmar_contrasena.trim()) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    if (this.registerData.contrasena !== this.registerData.confirmar_contrasena) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Mapear a la interfaz del backend
    const registerRequest = {
      nombreCompleto: this.registerData.nombre_completo,
      email: this.registerData.email,
      usuario: this.registerData.usuario,
      contrasena: this.registerData.contrasena,
      confirmarContrasena: this.registerData.confirmar_contrasena
    };

    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.status === 'success') {
          this.showSuccessModal = true;
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error de registro:', error);
        
        if (error.error && error.error.message) {
          if (error.error.message.includes('correo') || error.error.message.includes('email')) {
            this.showEmailErrorModal = true;
          } else if (error.error.message.includes('usuario')) {
            this.showUserErrorModal = true;
          } else {
            this.errorMessage = error.error.message;
          }
        } else {
          this.errorMessage = 'Ha ocurrido un error inesperado, por favor inténtelo de nuevo.';
        }
      }
    });
  }

  closeModal(): void {
    this.showEmailErrorModal = false;
    this.showUserErrorModal = false;
    this.showSuccessModal = false;
    // Limpiar formulario solo en caso de éxito
    if (this.showSuccessModal) {
      this.registerData = {
        nombre_completo: '',
        usuario: '',
        email: '',
        contrasena: '',
        confirmar_contrasena: ''
      };
    }
  }

  goToLogin(): void {
    this.closeModal();
    this.router.navigate(['/login']);
  }
} 