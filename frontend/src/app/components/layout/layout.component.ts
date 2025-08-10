import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';
import { ProductService } from '../../services/product.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, FormsModule],
  template: `
    <!-- Header -->
    <nav class="navbar navbar-expand-lg navbar-light shadow">
        <div class="container d-flex justify-content-between align-items-center">

            <a class="navbar-brand logo h1 align-self-center" routerLink="/">
                <img src="./assets/img/vertical-logo.png" width="150px" height="150px"/>
            </a>

            <button class="navbar-toggler border-0" type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#templatemo_main_nav" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
                <div class="flex-fill">
                    <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/" routerLinkActive="nav-active" [routerLinkActiveOptions]="{exact: true}">Inicio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/about" routerLinkActive="nav-active">Sobre Nosotros</a> 
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" routerLink="/shop" routerLinkActive="nav-active">Tienda</a>
                        </li>
                    </ul>
                </div>
                <div class="navbar align-self-center d-flex">
                    <div class="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                        <div class="input-group">
                            <input type="text" class="form-control" 
                                   [(ngModel)]="mobileSearchQuery"
                                   (keyup.enter)="searchProducts()"
                                   placeholder="Search ...">
                            <div class="input-group-text" (click)="searchProducts()">
                                <i class="fa fa-fw fa-search"></i>
                            </div>
                        </div>
                    </div>
                    <!-- Icono de búsqueda -->
                    <a class="nav-icon d-none d-lg-inline" href="#" (click)="openSearchModal($event)">
                        <i class="fa fa-fw fa-search text-dark mr-2"></i>
                    </a>

                    <a class="nav-icon position-relative text-decoration-none" routerLink="/favorites">
                        <i class="fas fa-fw fa-heart text-dark mr-1"></i>
                        <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                          {{favoritesCount}}
                        </span>
                    </a>
                    
                    <a class="nav-icon position-relative text-decoration-none" routerLink="/cart">
                        <i class="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                        <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                          {{cartCount}}
                        </span>
                    </a>
                    
                    <!-- Dropdown para el icono de usuario -->
                    <div class="dropdown nav-item-izq">
                        <a class="nav-icon position-relative text-decoration-none dropdown-toggle" 
                           href="#" 
                           id="userDropdown" 
                           role="button" 
                           data-bs-toggle="dropdown" 
                           aria-expanded="false">
                            <i class="fa fa-fw fa-user text-dark"></i>
                            <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark" 
                                  *ngIf="userGreeting">
                              {{userGreeting}}
                            </span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                            <li *ngIf="isAuthenticated"><a class="dropdown-item" routerLink="/profile">Mi perfil</a></li>
                            <li *ngIf="!isAuthenticated"><a class="dropdown-item" routerLink="/login">Iniciar sesión</a></li>
                            <li *ngIf="isAuthenticated"><a class="dropdown-item" href="#" (click)="logout($event)">Cerrar sesión</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Modal personalizado de Búsqueda -->
    <div id="customModal" class="custom-modal" [class.open]="showSearchModal">
        <div class="custom-modal-content">
            <div class="custom-modal-header">
                <button class="close-btn" (click)="closeSearchModal()">×</button>
                <form (submit)="searchProducts($event)">
                    <div class="search-bar">
                        <input type="text" 
                               [(ngModel)]="searchQuery"
                               name="searchQuery"
                               placeholder="Buscar diseños..." 
                               required>
                        <button type="submit">
                            <i class="fa fa-search"></i> Buscar
                        </button>
                    </div>
                </form>
                <h5>Buscar Productos</h5>
            </div>
            <div class="custom-modal-body">
                <div class="search-results" *ngIf="searchResults.length > 0">
                    <div class="search-item" 
                         *ngFor="let product of searchResults" 
                         (click)="goToProduct(product.id)">
                        <img [src]="getProductImagePath(product)" [alt]="product.name">
                        <div>
                            <span>{{product.name}}</span>
                            <p>{{product.price}}€</p>
                        </div>
                    </div>
                </div>
                <div *ngIf="searchResults.length === 0 && searchQuery && !searchLoading" class="text-muted">
                    No se encontraron resultados.
                </div>
                <div *ngIf="searchLoading" class="text-muted">
                    Buscando...
                </div>
            </div>
        </div>
    </div>

    <!-- Contenido principal -->
    <main>
        <router-outlet></router-outlet>
    </main>

    <!-- Start Footer -->
    <footer class="bg-footer" id="tempaltemo_footer">
        <div class="container">
            <div class="row">

                <div class="col-md-4 pt-5">
                    <h2 class="h2 border-bottom pb-3-footer border-light logo" style="color: #b38449;">Diseños A.García</h2>
                    <ul class="list-unstyled text-light footer-link-list">
                        <li>
                            <i class="fa fa-phone fa-fw"></i>
                            <a class="text-decoration-none" href="tel:+34693465202">693465202</a>
                        </li>
                        <li>
                            <i class="fa fa-envelope fa-fw"></i>
                            <a class="text-decoration-none" href="mailto:clientes&#64;diseñosagarcia.com">clientes&#64;diseñosagarcia.com</a>
                        </li>
                    </ul>
                </div>

                <div class="col-md-4 pt-5">
                    <h2 class="h2 text-light border-bottom pb-3 border-light">Productos</h2>
                    <ul class="list-unstyled text-light footer-link-list">
                        <li><a class="text-decoration-none" (click)="goToCategory('cruces')">Cruces</a></li>
                        <li><a class="text-decoration-none" (click)="goToCategory('santos')">Santos</a></li>
                        <li><a class="text-decoration-none" (click)="goToCategory('figuras')">Figuras</a></li>
                        <li><a class="text-decoration-none" (click)="goToCategory('animales')">Animales</a></li>
                        <li><a class="text-decoration-none" (click)="goToCategory('escudos')">Escudos</a></li>
                        <li><a class="text-decoration-none" (click)="goToCategory('vehiculos')">Vehículos</a></li>
                    </ul>
                </div>

                <div class="col-md-4 pt-5">
                    <h2 class="h2 text-light border-bottom pb-3 border-light">Más información</h2>
                    <ul class="list-unstyled text-light footer-link-list">
                        <li><a class="text-decoration-none" routerLink="/">Inicio</a></li>
                        <li><a class="text-decoration-none" routerLink="/about">Sobre Nosotros</a></li>
                    </ul>
                </div>

            </div>

            <div class="row text-light mb-4">
                <div class="col-12 mb-3">
                    <div class="w-100 my-3 border-top border-light"></div>
                </div>
                <div class="col-auto me-auto">
                    <ul class="list-inline text-left footer-icons">
                        <li class="list-inline-item border border-light rounded-circle text-center">
                            <a class="text-light text-decoration-none" target="_blank" href="http://facebook.com/">
                              <i class="fab fa-facebook-f fa-lg fa-fw"></i>
                            </a>
                        </li>
                        <li class="list-inline-item border border-light rounded-circle text-center">
                            <a class="text-light text-decoration-none" target="_blank" href="https://www.instagram.com/">
                              <i class="fab fa-instagram fa-lg fa-fw"></i>
                            </a>
                        </li>
                        <li class="list-inline-item border border-light rounded-circle text-center">
                            <a class="text-light text-decoration-none" target="_blank" href="https://twitter.com/">
                              <i class="fab fa-twitter fa-lg fa-fw"></i>
                            </a>
                        </li>
                        <li class="list-inline-item border border-light rounded-circle text-center">
                            <a class="text-light text-decoration-none" target="_blank" href="https://www.linkedin.com/">
                              <i class="fab fa-linkedin fa-lg fa-fw"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col-auto">
                    
                </div>
            </div>
        </div>

        <div class="w-100 bg-footer py-3">
           
        </div>

    </footer>
    <!-- End Footer -->
  `,
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isAuthenticated = false;
  userGreeting = '';
  favoritesCount = 0;
  cartCount = 0;
  
  showSearchModal = false;
  searchQuery = '';
  mobileSearchQuery = '';
  searchResults: any[] = [];
  searchLoading = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private favoriteService: FavoriteService,
    private productService: ProductService,
    private imageService: ImageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Esperar un tick para asegurar que el servicio de autenticación esté listo
    setTimeout(() => {
      this.checkAuthStatus();
      
      // Solo cargar contadores si está autenticado
      if (this.isAuthenticated) {
        this.loadCounts();
      }
    }, 0);
    
    // Suscribirse a cambios en autenticación
    this.authService.currentUser.subscribe(() => {
      this.checkAuthStatus();
      // Solo cargar contadores si está autenticado
      if (this.isAuthenticated) {
        this.loadCounts();
      }
    });
  }

  checkAuthStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    console.log('Auth status check - isAuthenticated:', this.isAuthenticated);
    
    if (this.isAuthenticated) {
      const user = this.authService.currentUserValue;
      this.userGreeting = user ? `Hola, ${user.fullName}` : '';
      console.log('User authenticated:', user);
    } else {
      this.userGreeting = '';
      this.favoritesCount = 0;
      this.cartCount = 0;
      console.log('User not authenticated, resetting counts');
    }
  }

  loadCounts(): void {
    console.log('loadCounts called - isAuthenticated:', this.isAuthenticated);
    
    if (this.isAuthenticated) {
      console.log('Loading favorites and cart counts...');
      // Cargar contadores de favoritos y carrito usando endpoints específicos
      this.favoriteService.getFavoritesCount().subscribe({
        next: (response: any) => {
          this.favoritesCount = response.count || 0;
          console.log('Favorites count loaded:', this.favoritesCount);
        },
        error: (error) => {
          console.log('Error loading favorites count:', error);
          this.favoritesCount = 0;
        }
      });

      this.cartService.getCart().subscribe({
        next: (response: any) => {
          this.cartCount = response.carrito ? response.carrito.length : 0;
          console.log('Cart count loaded:', this.cartCount);
        },
        error: (error) => {
          console.log('Error loading cart count:', error);
          this.cartCount = 0;
        }
      });
    } else {
      // Si no está autenticado, resetear contadores
      console.log('User not authenticated, skipping count loading');
      this.favoritesCount = 0;
      this.cartCount = 0;
    }
  }

  openSearchModal(event: Event): void {
    event.preventDefault();
    this.showSearchModal = true;
  }

  closeSearchModal(): void {
    this.showSearchModal = false;
    this.searchQuery = '';
    this.searchResults = [];
  }

  searchProducts(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    
    const query = this.searchQuery || this.mobileSearchQuery;
    if (!query.trim()) return;
    
    this.searchLoading = true;
    this.productService.searchProducts(query).subscribe({
      next: (products) => {
        this.searchResults = products;
        this.searchLoading = false;
      },
      error: (error) => {
        console.error('Error en búsqueda:', error);
        this.searchResults = [];
        this.searchLoading = false;
      }
    });
  }

  goToProduct(productId: number): void {
    this.closeSearchModal();
    this.router.navigate(['/product', productId]);
  }

  goToCategory(category: string): void {
    this.router.navigate(['/shop'], { queryParams: { category } });
  }

  getProductImagePath(product: any): string {
    return this.imageService.getProductImagePath({
      category: product.category,
      subcategory: product.subcategory,
      image: product.image
    });
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/']);
  }
} 