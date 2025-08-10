import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';
import { ImageService } from '../../services/image.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <!-- Start Content -->
    <div class="container py-5">
        <div class="row">
            <!-- Sidebar de categorías -->
            <div class="col-lg-3">
                <h1 class="h2 pb-4">Categorías</h1>
                <ul class="list-unstyled templatemo-accordion">
                    <li class="pb-3">
                        <a class="collapsed d-flex justify-content-between h3 text-decoration-none" 
                           href="#" 
                           (click)="toggleCategory('cruces', $event)"
                           [attr.data-bs-target]="'#collapseCruces'"
                           data-bs-toggle="collapse">
                            Cruces
                            <i class="fa fa-fw fa-chevron-circle-down mt-1"></i>
                        </a>
                        <ul id="collapseCruces" class="collapse list-unstyled pl-3">
                            <li><a class="text-decoration-none" (click)="filterBySubcategory('cruces', 'simples')">Cruces simples</a></li>
                            <li><a class="text-decoration-none" (click)="filterBySubcategory('cruces', 'dobles')">Cruces dobles</a></li>
                            <li><a class="text-decoration-none" (click)="filterByCategory('cruces')">Todas las cruces</a></li>
                        </ul>
                    </li>
                    
                    <li class="pb-3">
                        <a class="collapsed d-flex justify-content-between h3 text-decoration-none" 
                           href="#" 
                           (click)="toggleCategory('santos', $event)"
                           [attr.data-bs-target]="'#collapseSantos'"
                           data-bs-toggle="collapse">
                            Santos
                            <i class="fa fa-fw fa-chevron-circle-down mt-1"></i>
                        </a>
                        <ul id="collapseSantos" class="collapse list-unstyled pl-3">
                            <li><a class="text-decoration-none" (click)="filterBySubcategory('santos', 'virgenes')">Vírgenes</a></li>
                            <li><a class="text-decoration-none" (click)="filterByCategory('santos')">Todos los santos</a></li>
                        </ul>
                    </li>
                    
                    <li class="pb-3">
                        <a class="collapsed d-flex justify-content-between h3 text-decoration-none" 
                           href="#" 
                           (click)="toggleCategory('figuras', $event)"
                           [attr.data-bs-target]="'#collapseFiguras'"
                           data-bs-toggle="collapse">
                            Figuras
                            <i class="fa fa-fw fa-chevron-circle-down mt-1"></i>
                        </a>
                        <ul id="collapseFiguras" class="collapse list-unstyled pl-3">
                            <li><a class="text-decoration-none" (click)="filterBySubcategory('figuras', 'arboles')">Árboles</a></li>
                            <li><a class="text-decoration-none" (click)="filterBySubcategory('figuras', 'Castillo')">Castillos</a></li>
                            <li><a class="text-decoration-none" (click)="filterBySubcategory('figuras', 'Profesiones')">Profesiones</a></li>
                            <li><a class="text-decoration-none" (click)="filterByCategory('figuras')">Todas las figuras</a></li>
                        </ul>
                    </li>
                
                    <li class="pb-3">
                        <a class="collapsed d-flex justify-content-between h3 text-decoration-none" 
                           href="#" 
                           (click)="toggleCategory('animales', $event)"
                           [attr.data-bs-target]="'#collapseAnimales'"
                           data-bs-toggle="collapse">
                            Animales
                            <i class="fa fa-fw fa-chevron-circle-down mt-1"></i>
                        </a>
                        <ul id="collapseAnimales" class="collapse list-unstyled pl-3">
                            <li><a class="text-decoration-none" (click)="filterBySubcategory('animales', 'palomas')">Palomas</a></li>
                            <li><a class="text-decoration-none" (click)="filterByCategory('animales')">Todos los animales</a></li>
                        </ul>
                    </li>
                    
                    <li class="pb-3">
                        <a class="collapsed d-flex justify-content-between h3 text-decoration-none" 
                           href="#" 
                           (click)="toggleCategory('escudos', $event)"
                           [attr.data-bs-target]="'#collapseEscudos'"
                           data-bs-toggle="collapse">
                            Escudos
                            <i class="fa fa-fw fa-chevron-circle-down mt-1"></i>
                        </a>
                        <ul id="collapseEscudos" class="collapse list-unstyled pl-3">
                            <li><a class="text-decoration-none" (click)="filterBySubcategory('escudos', 'futbol')">Escudos de fútbol</a></li>
                            <li><a class="text-decoration-none" (click)="filterByCategory('escudos')">Todos los escudos</a></li>
                        </ul>
                    </li>
                
                    <li class="pb-3">
                        <a class="collapsed d-flex justify-content-between h3 text-decoration-none" 
                           href="#" 
                           (click)="toggleCategory('vehiculos', $event)"
                           [attr.data-bs-target]="'#collapseVehiculos'"
                           data-bs-toggle="collapse">
                            Vehículos
                            <i class="fa fa-fw fa-chevron-circle-down mt-1"></i>
                        </a>
                        <ul id="collapseVehiculos" class="collapse list-unstyled pl-3">
                            <li><a class="text-decoration-none" (click)="filterByCategory('vehiculos')">Todos los vehículos</a></li>
                        </ul>
                    </li>

                    <li class="pb-3">
                        <a class="collapsed d-flex justify-content-between h3 text-decoration-none" 
                           href="#" 
                           (click)="toggleCategory('adornos', $event)"
                           [attr.data-bs-target]="'#collapseAdornos'"
                           data-bs-toggle="collapse">
                            Adornos
                            <i class="fa fa-fw fa-chevron-circle-down mt-1"></i>
                        </a>
                        <ul id="collapseAdornos" class="collapse list-unstyled pl-3">
                            <li><a class="text-decoration-none" (click)="filterByCategory('adornos')">Todos los adornos</a></li>
                        </ul>
                    </li>

                    <li class="pb-3">
                        <a class="collapsed d-flex justify-content-between h3 text-decoration-none" 
                           href="#" 
                           (click)="toggleCategory('motivos', $event)"
                           [attr.data-bs-target]="'#collapseMotivos'"
                           data-bs-toggle="collapse">
                            Motivos
                            <i class="fa fa-fw fa-chevron-circle-down mt-1"></i>
                        </a>
                        <ul id="collapseMotivos" class="collapse list-unstyled pl-3">
                            <li><a class="text-decoration-none" (click)="filterBySubcategory('motivos', 'Caliz')">Cáliz</a></li>
                            <li><a class="text-decoration-none" (click)="filterBySubcategory('motivos', 'Manos')">Manos</a></li>
                            <li><a class="text-decoration-none" (click)="filterBySubcategory('motivos', 'vidrieras')">Vidrieras</a></li>
                            <li><a class="text-decoration-none" (click)="filterByCategory('motivos')">Todos los motivos</a></li>
                        </ul>
                    </li>
                    
                    <li class="pb-3">
                        <a class="collapsed d-flex justify-content-between h3 text-decoration-none" 
                           href="#" 
                           (click)="toggleCategory('flores', $event)"
                           [attr.data-bs-target]="'#collapseFlores'"
                           data-bs-toggle="collapse">
                            Flores
                            <i class="fa fa-fw fa-chevron-circle-down mt-1"></i>
                        </a>
                        <ul id="collapseFlores" class="collapse list-unstyled pl-3">
                            <li><a class="text-decoration-none" (click)="filterByCategory('flores')">Todas las flores</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            
            <!-- Área principal de productos -->
            <div class="col-lg-9">
                <div class="row">
                    <div class="col-md-6"></div>
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
                
                <!-- Grid de productos -->
                <div class="row">
                    <div id="product-container" class="row">
                        <div class="col-md-4 mb-4" *ngFor="let product of paginatedProducts">
                            <div class="card h-100 product-wap">
                                <div class="card rounded-0 product-card">
                                    <img class="card-img-top rounded-0 border" 
                                         [src]="getProductImagePath(product)" 
                                         [alt]="product.name"
                                         (click)="goToProduct(product.id)">
                                    <div class="card-body">
                                        <p class="text-center mb-0">{{product.price}}€</p>
                                        <p class="h4 text-center">{{product.name}}</p>
                                        <div class="text-center mt-2">
                                            <button class="btn btn-success btn-sm me-2" 
                                                    (click)="goToProduct(product.id)">
                                                Comprar
                                            </button>
                                            <button class="btn btn-outline-danger btn-sm me-2" 
                                                    [class.btn-danger]="favoriteStatus[product.id]"
                                                    [class.btn-outline-danger]="!favoriteStatus[product.id]"
                                                    (click)="addToFavorites(product)"
                                                    [disabled]="!isAuthenticated">
                                                <i class="fa fa-heart"></i>
                                            </button>
                                            <button class="btn btn-outline-primary btn-sm" 
                                                    [class.btn-primary]="cartStatus[product.id]"
                                                    [class.btn-outline-primary]="!cartStatus[product.id]"
                                                    (click)="addToCart(product)"
                                                    [disabled]="!isAuthenticated">
                                                <i class="fa fa-shopping-cart"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Mensaje si no hay productos -->
                        <div *ngIf="filteredProducts.length === 0 && !loading" class="col-12 text-center">
                            <p class="h4">No se encontraron productos en esta categoría.</p>
                        </div>
                        
                        <!-- Mensaje de carga -->
                        <div *ngIf="loading" class="col-12 text-center">
                            <p class="h4">Cargando productos...</p>
                        </div>
                    </div>
                </div>
    
                <!-- Paginación -->
                <div class="row" *ngIf="totalPages > 1">
                    <ul class="pagination pagination-lg justify-content-end">
                        <li class="page-item" [class.disabled]="currentPage === 1">
                            <a class="page-link" href="#" (click)="changePage(currentPage - 1, $event)">Anterior</a>
                        </li>
                        <li class="page-item" 
                            *ngFor="let page of getPageNumbers()" 
                            [class.active]="page === currentPage">
                            <a class="page-link" href="#" (click)="changePage(page, $event)">{{page}}</a>
                        </li>
                        <li class="page-item" [class.disabled]="currentPage === totalPages">
                            <a class="page-link" href="#" (click)="changePage(currentPage + 1, $event)">Siguiente</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- End Content -->
    
    <!-- Modales de alerta para usuarios no autenticados -->
    <div class="modal fade" id="favoritosAlerta" tabindex="-1" aria-labelledby="favoritosAlertaLabel" aria-hidden="true" 
         [style.display]="showFavoritesModal ? 'block' : 'none'"
         [class.show]="showFavoritesModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="favoritosAlertaLabel">Inicia sesión</h5>
                    <button type="button" class="btn-close" (click)="closeFavoritesModal()" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    Debes iniciar sesión para añadir productos a favoritos.
                </div>
                <div class="modal-footer">
                    <a routerLink="/login" class="btn btn-primary">Iniciar sesión</a>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="carritoAlerta" tabindex="-1" aria-labelledby="carritoAlertaLabel" aria-hidden="true"
         [style.display]="showCartModal ? 'block' : 'none'"
         [class.show]="showCartModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="carritoAlertaLabel">Inicia sesión</h5>
                    <button type="button" class="btn-close" (click)="closeCartModal()" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    Debes iniciar sesión para añadir productos al carrito.
                </div>
                <div class="modal-footer">
                    <a routerLink="/login" class="btn btn-primary">Iniciar sesión</a>
                </div>
            </div>
        </div>
    </div>
  `,
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  
  selectedCategory: string = '';
  selectedSubcategory: string = '';
  selectedOrder: string = '';
  
  currentPage: number = 1;
  productsPerPage: number = 27;
  totalPages: number = 1;
  
  loading: boolean = true;
  showFavoritesModal: boolean = false;
  showCartModal: boolean = false;
  
  // Propiedades para verificar estado de favoritos y carrito
  favoriteStatus: { [key: number]: boolean } = {};
  cartStatus: { [key: number]: boolean } = {};

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private favoriteService: FavoriteService,
    private imageService: ImageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.checkUrlParams();
    this.loadProducts();
    if (this.isAuthenticated) {
      this.loadFavoriteAndCartStatus();
    }
  }

  checkUrlParams(): void {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.filterByCategory(params['category']);
      }
      if (params['subcategory']) {
        this.filterBySubcategory(params['category'], params['subcategory']);
      }
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.applyFilters();
        this.loading = false;
        if (this.isAuthenticated) {
          this.loadFavoriteAndCartStatus();
        }
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  loadFavoriteAndCartStatus(): void {
    // Cargar estado de favoritos
    this.favoriteService.getFavorites().subscribe({
      next: (response: any) => {
        if (response.status === 'success' && response.favoritos) {
          this.favoriteStatus = {};
          response.favoritos.forEach((fav: any) => {
            this.favoriteStatus[fav.idProducto] = true;
          });
        }
      },
      error: (error) => {
        console.error('Error loading favorites status:', error);
      }
    });

    // Cargar estado del carrito
    this.cartService.getCart().subscribe({
      next: (response: any) => {
        if (response.status === 'success' && response.carrito) {
          this.cartStatus = {};
          response.carrito.forEach((item: any) => {
            this.cartStatus[item.idProducto] = true;
          });
        }
      },
      error: (error) => {
        console.error('Error loading cart status:', error);
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.selectedSubcategory = '';
    this.currentPage = 1;
    this.applyFilters();
  }

  filterBySubcategory(category: string, subcategory: string): void {
    this.selectedCategory = category;
    this.selectedSubcategory = subcategory;
    this.currentPage = 1;
    this.applyFilters();
  }

  onOrderChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.products];

    // Filtrar por categoría y subcategoría
    if (this.selectedCategory) {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
      
      if (this.selectedSubcategory) {
        filtered = filtered.filter(product => product.subcategory === this.selectedSubcategory);
      }
    }

    // Ordenar
    switch (this.selectedOrder) {
      case 'nombre':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'precioMenor':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'precioMayor':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'cantidad_vendidos':
        filtered.sort((a, b) => (b.soldQuantity || 0) - (a.soldQuantity || 0));
        break;
    }

    this.filteredProducts = filtered;
    this.calculatePagination();
    this.updatePaginatedProducts();
  }

  private calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
  }

  private updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  changePage(page: number, event: Event): void {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedProducts();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  toggleCategory(category: string, event: Event): void {
    event.preventDefault();
    // Bootstrap collapse handling will be managed by Bootstrap JS
  }

  addToCart(product: Product): void {
    if (!this.isAuthenticated) {
      this.showCartModal = true;
      return;
    }

    this.cartService.addToCart(product.id).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          // Actualizar estado local
          this.cartStatus[product.id] = !this.cartStatus[product.id];
          // Recargar contador en el layout
          this.cartService.loadCartCount();
        }
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
      }
    });
  }

  addToFavorites(product: Product): void {
    if (!this.isAuthenticated) {
      this.showFavoritesModal = true;
      return;
    }

    this.favoriteService.toggleFavorite(product.id).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          // Actualizar estado local
          this.favoriteStatus[product.id] = !this.favoriteStatus[product.id];
          // Recargar contador en el layout
          this.favoriteService.loadFavoritesCount();
        }
      },
      error: (error) => {
        console.error('Error adding to favorites:', error);
      }
    });
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

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  closeFavoritesModal(): void {
    this.showFavoritesModal = false;
  }

  closeCartModal(): void {
    this.showCartModal = false;
  }
} 