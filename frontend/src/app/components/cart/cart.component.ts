import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';
import { AuthService } from '../../services/auth.service';
import { ImageService } from '../../services/image.service';

interface CartProduct {
  id: number;
  idProducto: number;
  nombre: string;
  precio: number;
  foto: string;
  categoria: string;
  subcategoria?: string;
}

interface FavoriteProduct {
  id: number;
  idProducto: number;
  nombre: string;
  precio: number;
  foto: string;
  categoria: string;
  subcategoria?: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container-carrito">
        <!-- Carrito -->
        <div class="carrito-section">
            <h2>Tu Cesta</h2>
            <div id="carrito-container">
                <div *ngIf="loading" class="text-center">
                    <p class="h4">Cargando carrito...</p>
                </div>
                
                <div *ngIf="!loading && cartProducts.length === 0" class="text-center">
                    <p>No tienes productos en tu carrito.</p>
                    <button class="btn btn-primary" (click)="goToShop()">Ir a comprar</button>
                </div>

                <div *ngFor="let producto of cartProducts" class="producto-card card mb-3 product-wap rounded-0">
                    <div class="card-body d-flex align-items-center">
                        <img 
                            class="rounded img-fluid" 
                            [src]="getProductImagePath(producto)" 
                            [alt]="producto.nombre" 
                            style="width: 80px; height: 80px; object-fit: cover; cursor: pointer;"
                            (click)="goToProduct(producto.idProducto)">
                        <div class="ms-3">
                            <h6>{{producto.nombre}}</h6>
                            <p class="precio">{{producto.precio}} €</p>
                        </div>
                        <button 
                            type="button" 
                            class="btn btn-danger ms-auto"
                            (click)="removeFromCart(producto.idProducto)"
                            [disabled]="loadingRemove">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Resumen -->
        <div class="resumen-section">
            <div>
                <h2>Resumen</h2>
            </div>
            <p>Subtotal: <span id="subtotal">{{subtotal.toFixed(2)}} €</span></p>
            <p><strong>Total: <span id="total">{{total.toFixed(2)}} €</span></strong></p>
            <button 
                class="btn btn-primary w-100"
                [disabled]="cartProducts.length === 0"
                (click)="proceedToPayment()">
                Pagar
            </button>
        </div>
    </div>

    <!-- Sección de Favoritos -->
    <div class="container favoritos-section mt-5" *ngIf="favoriteProducts.length > 0">
        <div>
            <h2>Tus Favoritos</h2>
            <div id="related-products-carousel" class="carousel slide" data-bs-ride="carousel">
                <!-- Indicadores -->
                <ol class="carousel-indicators" *ngIf="getFavoriteChunks().length > 1">
                    <li 
                        *ngFor="let chunk of getFavoriteChunks(); let i = index"
                        [attr.data-bs-target]="'#related-products-carousel'"
                        [attr.data-bs-slide-to]="i"
                        [class.active]="i === 0">
                    </li>
                </ol>

                <!-- Carrusel -->
                <div class="carousel-inner">
                    <div 
                        *ngFor="let chunk of getFavoriteChunks(); let i = index"
                        class="carousel-item"
                        [class.active]="i === 0">
                        <div class="row">
                            <div 
                                *ngFor="let producto of chunk"
                                class="col-md-4 mb-4">
                                <div class="card h-100 product-wap rounded-0">
                                    <div class="card rounded-0">
                                        <img 
                                            [src]="getProductImagePath(producto)"
                                            class="card-img-top rounded-0 img-fluid"
                                            [alt]="producto.nombre"
                                            (click)="goToProduct(producto.idProducto)"
                                            style="cursor: pointer;">
                                        <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                            <ul class="list-unstyled">
                                                <li>
                                                    <button 
                                                        class="btn btn-success btn-square text-white"
                                                        (click)="addToCartFromFavorites(producto.idProducto)"
                                                        [disabled]="loadingCart">
                                                        <i class="far fa-heart"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <h5 class="h6 card-title" (click)="goToProduct(producto.idProducto)" style="cursor: pointer;">
                                            {{producto.nombre}}
                                        </h5>
                                        <p class="text-center mb-0 precio">{{producto.precio}} €</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Controles de navegación -->
                <a class="carousel-control-prev text-decoration-none w-auto ps-3" 
                   href="#related-products-carousel" 
                   role="button" 
                   data-bs-slide="prev"
                   *ngIf="getFavoriteChunks().length > 1">
                    <i class="fas fa-chevron-left"></i>
                </a>
                <a class="carousel-control-next text-decoration-none w-auto pe-3" 
                   href="#related-products-carousel" 
                   role="button" 
                   data-bs-slide="next"
                   *ngIf="getFavoriteChunks().length > 1">
                    <i class="fas fa-chevron-right"></i>
                </a>
            </div>
        </div>
    </div>

    <!-- Modal de Login -->
    <div 
        class="modal fade" 
        [class.show]="showLoginModalFlag" 
        [style.display]="showLoginModalFlag ? 'block' : 'none'"
        tabindex="-1" 
        aria-labelledby="loginAlertModalLabel" 
        [attr.aria-hidden]="!showLoginModalFlag">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginAlertModalLabel">Iniciar Sesión Requerido</h5>
                    <button type="button" class="btn-close" (click)="closeLoginModal()" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Debes iniciar sesión para acceder a tu carrito.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" (click)="closeLoginModal()">Cerrar</button>
                    <button type="button" class="btn btn-success" (click)="goToLogin()">Iniciar Sesión</button>
                </div>
            </div>
        </div>
    </div>
  `,
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  favoriteProducts: FavoriteProduct[] = [];
  loading = true;
  loadingRemove = false;
  loadingCart = false;
  subtotal = 0;
  total = 0;
  showLoginModalFlag = false;

  constructor(
    private cartService: CartService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private imageService: ImageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthAndLoadCart();
  }

  checkAuthAndLoadCart(): void {
    if (!this.authService.isAuthenticated()) {
      this.showLoginModal();
      return;
    }
    
    this.loadCart();
    this.loadFavorites();
  }

  loadCart(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response.status === 'success') {
          // Mapear los datos del carrito al formato esperado
          this.cartProducts = (response.carrito || []).map((item: any) => ({
            id: item.id,
            idProducto: item.idProducto,
            nombre: item.nombre,
            precio: item.precio,
            foto: item.foto,
            categoria: item.categoria || '',
            subcategoria: item.subcategoria || ''
          }));
          this.calculateTotals();
        } else {
          this.cartProducts = [];
          this.calculateTotals();
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al cargar carrito:', error);
        if (error.status === 401) {
          this.showLoginModal();
        }
      }
    });
  }

  loadFavorites(): void {
    this.favoriteService.getFavorites().subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.favoriteProducts = response.favoritos || [];
        }
      },
      error: (error) => {
        console.error('Error al cargar favoritos:', error);
      }
    });
  }

  removeFromCart(productId: number): void {
    this.loadingRemove = true;
    this.cartService.removeFromCart(productId).subscribe({
      next: (response: any) => {
        this.loadingRemove = false;
        if (response.status === 'success') {
          this.loadCart(); // Recargar carrito
        }
      },
      error: (error) => {
        this.loadingRemove = false;
        console.error('Error al eliminar del carrito:', error);
      }
    });
  }

  addToCartFromFavorites(productId: number): void {
    this.loadingCart = true;
    this.cartService.addToCart(productId).subscribe({
      next: (response: any) => {
        this.loadingCart = false;
        if (response.status === 'success') {
          this.loadCart();
          // Eliminar de favoritos visualmente
          this.favoriteProducts = this.favoriteProducts.filter(
            product => product.idProducto !== productId
          );
        }
      },
      error: (error) => {
        this.loadingCart = false;
        console.error('Error al añadir al carrito:', error);
      }
    });
  }

  calculateTotals(): void {
    this.subtotal = this.cartProducts.reduce((sum, product) => sum + product.precio, 0);
    this.total = this.subtotal; // Sin impuestos por ahora
  }

  getFavoriteChunks(): FavoriteProduct[][] {
    const chunkSize = 3;
    const chunks: FavoriteProduct[][] = [];
    for (let i = 0; i < this.favoriteProducts.length; i += chunkSize) {
      chunks.push(this.favoriteProducts.slice(i, i + chunkSize));
    }
    return chunks;
  }

  getProductImagePath(product: CartProduct | FavoriteProduct): string {
    return this.imageService.getProductImagePath({
      category: product.categoria,
      subcategory: product.subcategoria,
      image: product.foto
    });
  }

  goToProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  goToShop(): void {
    this.router.navigate(['/shop']);
  }

  proceedToPayment(): void {
    // Implementar lógica de pago
    alert('Funcionalidad de pago en desarrollo');
  }

  private showLoginModal(): void {
    this.showLoginModalFlag = true;
  }
  
  closeLoginModal(): void {
    this.showLoginModalFlag = false;
  }
  
  goToLogin(): void {
    this.closeLoginModal();
    this.router.navigate(['/login']);
  }
} 