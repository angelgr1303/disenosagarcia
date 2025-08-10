import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';
import { ImageService } from '../../services/image.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Open Content -->
    <div class="container mt-5" *ngIf="product">
        <div class="row">
            <!-- Imagen del Producto -->
            <div class="col-md-6">
                <div class="product-image-container text-center mb-4">
                    <img [src]="getProductImagePath(product)" 
                         [alt]="product.name" 
                         class="img-fluid rounded shadow-lg">
                </div>
            </div>
            
            <!-- Información del Producto -->
            <div class="col-md-6">
                <div>
                    <h1 class="product-title mb-3">{{product.name}}</h1>
                    <h3>Categoría del diseño: <p class="product-category">{{getCategoryDisplayName()}}</p></h3>
                    <h3 class="product-price precio">{{product.price}}€</h3>
                    <p class="product-description mb-4" *ngIf="product.description">{{product.description}}</p>
                    
                    <div class="d-flex align-items-center CambiarBotones">
                        <!-- Si no está autenticado -->
                        <div *ngIf="!isAuthenticated">
                            <a routerLink="/login" class="btn btn-primary btn-lg me-3">
                                Iniciar sesión para comprar
                            </a>
                        </div>
                        
                        <!-- Si está autenticado -->
                        <div *ngIf="isAuthenticated" class="d-flex gap-3">
                            <button class="btn btn-success btn-lg" 
                                    (click)="toggleFavorite()"
                                    [disabled]="loadingFavorite">
                                <i [class]="getFavoriteIconClass()"></i> 
                                {{getFavoriteButtonText()}}
                            </button>
                            
                            <button class="btn btn-success btn-lg" 
                                    (click)="toggleCart()"
                                    [disabled]="loadingCart">
                                <i [class]="getCartIconClass()"></i> 
                                {{getCartButtonText()}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Detalles adicionales del producto -->
        <div class="row mt-5" *ngIf="product.description">
            <div class="col">
                <ul class="list-unstyled">
                    <li><strong>ID del producto:</strong> {{product.id}}</li>
                    <li><strong>Categoría:</strong> {{product.category}}</li>
                    <li *ngIf="product.subcategory"><strong>Subcategoría:</strong> {{product.subcategory}}</li>
                    <li *ngIf="product.corelFile"><strong>Archivo CorelDraw:</strong> {{product.corelFile}}</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- Productos Relacionados -->
    <div class="container mt-5" *ngIf="relatedProducts.length > 0">
        <h4 class="text-secondary">Productos Relacionados</h4>
        
        <div id="related-products-carousel" class="carousel slide" data-bs-ride="carousel">
            <!-- Contenedor de elementos del carrusel -->
            <div class="carousel-inner">
                <div class="carousel-item" 
                     *ngFor="let chunk of getProductChunks(); let first = first" 
                     [class.active]="first">
                    <div class="row">
                        <div class="col-md-4" *ngFor="let relatedProduct of chunk">
                            <div class="card h-100 product-wap">
                                <div class="card rounded-0">
                                    <img class="card-img-top rounded-0 border" 
                                         [src]="getProductImagePath(relatedProduct)" 
                                         [alt]="relatedProduct.name"
                                         (click)="goToProduct(relatedProduct.id)">
                                    <div class="card-body">
                                        <p class="text-center mb-0">{{relatedProduct.price}}€</p>
                                        <p class="h5 text-center">{{relatedProduct.name}}</p>
                                        <div class="text-center mt-2">
                                            <button class="btn btn-success btn-sm" 
                                                    (click)="goToProduct(relatedProduct.id)">
                                                Ver producto
                                            </button>
                                        </div>
                                    </div>
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
               *ngIf="getProductChunks().length > 1">
                <i class="fas fa-chevron-left"></i>
            </a>
            <a class="carousel-control-next text-decoration-none w-auto pe-3" 
               href="#related-products-carousel" 
               role="button" 
               data-bs-slide="next"
               *ngIf="getProductChunks().length > 1">
                <i class="fas fa-chevron-right"></i>
            </a>
        </div>
    </div>

    <!-- Mensaje de error o carga -->
    <div class="container mt-5" *ngIf="!product && !loading">
        <div class="alert alert-warning text-center">
            <h4>Producto no encontrado</h4>
            <p>El producto que buscas no existe o ha sido eliminado.</p>
            <a routerLink="/shop" class="btn btn-primary">Volver a la tienda</a>
        </div>
    </div>

    <div class="container mt-5" *ngIf="loading">
        <div class="text-center">
            <h4>Cargando producto...</h4>
        </div>
    </div>
  `,
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  loading: boolean = true;
  loadingFavorite: boolean = false;
  loadingCart: boolean = false;
  
  isFavorite: boolean = false;
  isInCart: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private favoriteService: FavoriteService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.loadProduct(+productId);
      }
    });
  }

  loadProduct(productId: number): void {
    this.loading = true;
    this.productService.getProductById(productId).subscribe({
      next: (product: Product | null) => {
        if (product) {
          this.product = product;
          this.loadRelatedProducts();
          this.checkFavoriteAndCartStatus();
        }
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar producto:', error);
        this.loading = false;
      }
    });
  }

  loadRelatedProducts(): void {
    if (this.product) {
      this.productService.getProductsByCategory(this.product.category).subscribe({
        next: (products: Product[]) => {
          // Filtrar el producto actual y tomar máximo 6 productos relacionados
          this.relatedProducts = products
            .filter(p => p.id !== this.product!.id)
            .slice(0, 6);
        },
        error: (error: any) => {
          console.error('Error al cargar productos relacionados:', error);
        }
      });
    }
  }

  checkFavoriteAndCartStatus(): void {
    if (this.isAuthenticated && this.product) {
      // Verificar si está en favoritos
      this.favoriteService.getFavorites().subscribe({
        next: (response: any) => {
          if (response.status === 'success' && response.favoritos) {
            this.isFavorite = response.favoritos.some((fav: any) => fav.idProducto === this.product!.id);
          }
        },
        error: (error: any) => console.error('Error verificando favoritos:', error)
      });

      // Verificar si está en carrito
      this.cartService.getCart().subscribe({
        next: (response: any) => {
          if (response.status === 'success' && response.carrito) {
            this.isInCart = response.carrito.some((item: any) => item.idProducto === this.product!.id);
          }
        },
        error: (error: any) => console.error('Error verificando carrito:', error)
      });
    }
  }

  toggleFavorite(): void {
    if (!this.product || this.loadingFavorite) return;
    
    this.loadingFavorite = true;
    this.favoriteService.toggleFavorite(this.product.id).subscribe({
      next: (response: any) => {
        this.isFavorite = response.status === 'added';
        this.loadingFavorite = false;
        // Actualizar contador en el layout
        this.favoriteService.loadFavoritesCount();
      },
      error: (error: any) => {
        console.error('Error al modificar favoritos:', error);
        this.loadingFavorite = false;
      }
    });
  }

  toggleCart(): void {
    if (!this.product || this.loadingCart) return;
    
    this.loadingCart = true;
    
    if (this.isInCart) {
      this.cartService.removeFromCart(this.product.id).subscribe({
        next: (response: any) => {
          this.isInCart = false;
          this.loadingCart = false;
          // Actualizar contador en el layout
          this.cartService.loadCartCount();
        },
        error: (error: any) => {
          console.error('Error al eliminar del carrito:', error);
          this.loadingCart = false;
        }
      });
    } else {
      this.cartService.addToCart(this.product.id).subscribe({
        next: (response: any) => {
          this.isInCart = true;
          this.loadingCart = false;
          // Actualizar contador en el layout
          this.cartService.loadCartCount();
        },
        error: (error: any) => {
          console.error('Error al añadir al carrito:', error);
          this.loadingCart = false;
        }
      });
    }
  }

  goToProduct(productId: number): void {
    window.location.href = `/product/${productId}`;
  }

  getProductImagePath(product: Product): string {
    return this.imageService.getProductImagePath({
      category: product.category,
      subcategory: product.subcategory,
      image: product.image
    });
  }

  getCategoryDisplayName(): string {
    if (!this.product) return '';
    
    let categoria = this.product.subcategory 
      ? `${this.product.category}/${this.product.subcategory}` 
      : this.product.category;
    
    return categoria.charAt(0).toUpperCase() + categoria.slice(1);
  }

  getFavoriteIconClass(): string {
    return this.isFavorite ? 'fas fa-heart' : 'far fa-heart';
  }

  getFavoriteButtonText(): string {
    return this.isFavorite ? 'Eliminar de favoritos' : 'Añadir a favoritos';
  }

  getCartIconClass(): string {
    return this.isInCart ? 'fas fa-trash' : 'fas fa-cart-plus';
  }

  getCartButtonText(): string {
    return this.isInCart ? 'Eliminar del carrito' : 'Añadir al carrito';
  }

  getProductChunks(): Product[][] {
    const chunks: Product[][] = [];
    for (let i = 0; i < this.relatedProducts.length; i += 3) {
      chunks.push(this.relatedProducts.slice(i, i + 3));
    }
    return chunks;
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
} 