import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FavoriteService } from '../../services/favorite.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ImageService } from '../../services/image.service';
import { Product } from '../../models/product.model';

interface FavoriteProduct {
  id: number;
  idProducto: number;
  idProductoFormateado?: string;
  nombre: string;
  precio: number;
  foto: string;
  categoria?: string;
  subcategoria?: string;
}

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <!-- Start Content -->
    <div class="container py-5 favoritos">
        <div class="row">
            <div class="col-lg-9 mx-auto">
                <div class="row">
                    <div class="col-md-6">
                        <h1 class="h2 pb-4">Mis Favoritos</h1>
                    </div>
                    <div class="col-md-6 pb-4">
                        <div class="d-flex">
                            <select [(ngModel)]="selectedOrder" (change)="onOrderChange()" class="form-control">
                                <option value="">Ordenar por...</option>
                                <option value="cantidad_vendidos">Más Vendidos</option>
                                <option value="nombre">Nombre</option>
                                <option value="precioMenor">Precio: De MENOR A MAYOR</option>
                                <option value="precioMayor">Precio: De MAYOR A MENOR</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <!-- Grid de productos favoritos -->
                <div class="row">
                    <div id="product-container" class="row">
                        <div class="col-md-4" *ngFor="let product of paginatedFavorites">
                            <div class="card mb-4 product-wap rounded-0">
                                <div class="card rounded-0">
                                    <a (click)="goToProduct(product.idProducto)">
                                        <img class="card-img rounded-0 img-fluid" 
                                             [src]="getProductImagePath(product)" 
                                             [alt]="product.nombre">
                                    </a>
                                </div>
                                <div class="card-body d-flex flex-column align-items-center">
                                    <h5 class="product-name text-center">{{product.nombre}}</h5>
                                    <div class="d-flex align-items-center justify-content-center">
                                        <button class="btn btn-success btn-lg" 
                                                (click)="toggleFavorite(product)"
                                                [disabled]="loadingFavorites">
                                            <i class="fas fa-heart"></i>
                                        </button>
                                        <span class="text-center mx-2">{{product.precio}}€</span>
                                        <button class="btn btn-success btn-lg" 
                                                (click)="toggleCart(product)"
                                                [disabled]="loadingCart">
                                            <i [class]="getCartIconClass(product.idProducto)"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Mensaje si no hay favoritos -->
                        <div *ngIf="favorites.length === 0 && !loading" class="col-12 text-center">
                            <div class="alert alert-info">
                                <h4>No tienes productos favoritos</h4>
                                <p>Explora nuestra tienda y añade productos a tus favoritos.</p>
                                <a routerLink="/shop" class="btn btn-success">Ir a la tienda</a>
                            </div>
                        </div>
                        
                        <!-- Mensaje de carga -->
                        <div *ngIf="loading" class="col-12 text-center">
                            <h4>Cargando favoritos...</h4>
                        </div>
                    </div>
                </div>
    
                <!-- Paginación -->
                <div class="row" *ngIf="totalPages > 1">
                    <ul class="pagination pagination-lg justify-content-end">
                        <li class="page-item" [class.disabled]="currentPage === 1">
                            <a class="page-link rounded-0 shadow-sm text-dark border-pagination" 
                               href="#" 
                               (click)="changePage(currentPage - 1, $event)">Anterior</a>
                        </li>
                        <li class="page-item" 
                            *ngFor="let page of getPageNumbers()" 
                            [class.active]="page === currentPage">
                            <a class="page-link rounded-0 shadow-sm text-dark border-pagination" 
                               href="#" 
                               (click)="changePage(page, $event)">{{page}}</a>
                        </li>
                        <li class="page-item" [class.disabled]="currentPage === totalPages">
                            <a class="page-link rounded-0 shadow-sm text-dark border-pagination" 
                               href="#" 
                               (click)="changePage(currentPage + 1, $event)">Siguiente</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- End Content -->

    <!-- Modal de alerta para usuarios no autenticados -->
    <div class="modal fade" id="loginAlertModal" tabindex="-1" aria-labelledby="loginAlertModalLabel" aria-hidden="true"
         [style.display]="showLoginModal ? 'block' : 'none'"
         [class.show]="showLoginModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginAlertModalLabel">Acceso requerido</h5>
                    <button type="button" class="btn-close" (click)="closeLoginModal()" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    Debes iniciar sesión para ver tus favoritos.
                </div>
                <div class="modal-footer">
                    <a routerLink="/login" class="btn btn-primary">Iniciar sesión</a>
                    <button type="button" class="btn btn-secondary" (click)="goToShop()">Ir a la tienda</button>
                </div>
            </div>
        </div>
    </div>
  `,
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteProduct[] = [];
  filteredFavorites: FavoriteProduct[] = [];
  paginatedFavorites: FavoriteProduct[] = [];
  cartItems: any[] = [];
  
  selectedOrder: string = '';
  
  currentPage: number = 1;
  productsPerPage: number = 27;
  totalPages: number = 1;
  
  loading: boolean = true;
  loadingFavorites: boolean = false;
  loadingCart: boolean = false;
  showLoginModal: boolean = false;

  constructor(
    private favoriteService: FavoriteService,
    private cartService: CartService,
    private authService: AuthService,
    private imageService: ImageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthAndLoadFavorites();
  }

  checkAuthAndLoadFavorites(): void {
    if (!this.authService.isAuthenticated()) {
      this.showLoginModal = true;
      this.loading = false;
      return;
    }
    
    this.loadFavorites();
    this.loadCartItems();
  }

  loadFavorites(): void {
    this.loading = true;
    this.favoriteService.getFavorites().subscribe({
      next: (response: any) => {
        this.favorites = response.favoritos || response;
        this.applyFilters();
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar favoritos:', error);
        this.loading = false;
      }
    });
  }

  loadCartItems(): void {
    this.cartService.getCart().subscribe({
      next: (response: any) => {
        if (response.status === 'success' && response.carrito) {
          this.cartItems = response.carrito;
        } else {
          this.cartItems = [];
        }
      },
      error: (error: any) => {
        console.error('Error al cargar carrito:', error);
        this.cartItems = [];
      }
    });
  }

  onOrderChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.favorites];

    // Ordenar
    switch (this.selectedOrder) {
      case 'nombre':
        filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'precioMenor':
        filtered.sort((a, b) => a.precio - b.precio);
        break;
      case 'precioMayor':
        filtered.sort((a, b) => b.precio - a.precio);
        break;
      case 'cantidad_vendidos':
        // Ordenar por más vendidos (si está disponible en el DTO)
        filtered.sort((a, b) => {
          const aVendidos = (a as any).cantidad_vendidos || 0;
          const bVendidos = (b as any).cantidad_vendidos || 0;
          return bVendidos - aVendidos;
        });
        break;
    }

    this.filteredFavorites = filtered;
    this.calculatePagination();
    this.updatePaginatedFavorites();
  }

  private calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredFavorites.length / this.productsPerPage);
  }

  private updatePaginatedFavorites(): void {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    this.paginatedFavorites = this.filteredFavorites.slice(startIndex, endIndex);
  }

  changePage(page: number, event: Event): void {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedFavorites();
      // Scroll suave al inicio
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 3;
    let startPage = Math.max(1, this.currentPage - 1);
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  toggleFavorite(product: FavoriteProduct): void {
    if (this.loadingFavorites) return;
    
    this.loadingFavorites = true;
    this.favoriteService.toggleFavorite(product.idProducto).subscribe({
      next: (response: any) => {
        if (response.status === 'removed') {
          // Remover de la lista local
          this.favorites = this.favorites.filter(fav => fav.idProducto !== product.idProducto);
          this.applyFilters();
        }
        this.loadingFavorites = false;
      },
      error: (error: any) => {
        console.error('Error al modificar favoritos:', error);
        this.loadingFavorites = false;
      }
    });
  }

  toggleCart(product: FavoriteProduct): void {
    if (this.loadingCart) return;
    
    this.loadingCart = true;
    const isInCart = this.isProductInCart(product.idProducto);
    
    if (isInCart) {
      this.cartService.removeFromCart(product.idProducto).subscribe({
        next: (response: any) => {
          this.loadCartItems();
          this.loadingCart = false;
        },
        error: (error: any) => {
          console.error('Error al eliminar del carrito:', error);
          this.loadingCart = false;
        }
      });
    } else {
      this.cartService.addToCart(product.idProducto).subscribe({
        next: (response: any) => {
          this.loadCartItems();
          this.loadingCart = false;
        },
        error: (error: any) => {
          console.error('Error al añadir al carrito:', error);
          this.loadingCart = false;
        }
      });
    }
  }

  goToProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  goToShop(): void {
    this.router.navigate(['/shop']);
  }

  getProductImagePath(product: FavoriteProduct): string {
    return this.imageService.getProductImagePath({
      category: product.categoria || '',
      subcategory: product.subcategoria,
      image: product.foto
    });
  }

  getCartIconClass(productId: number): string {
    return this.isProductInCart(productId) ? 'fas fa-trash' : 'fas fa-cart-plus';
  }

  isProductInCart(productId: number): boolean {
    return this.cartItems.some(item => item.idProducto === productId);
  }

  closeLoginModal(): void {
    this.showLoginModal = false;
    this.router.navigate(['/shop']);
  }
} 