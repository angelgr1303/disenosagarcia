import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';
import { AuthService } from '../../services/auth.service';
import { ImageService } from '../../services/image.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Start Banner Hero -->
    <div id="template-mo-zay-hero-carousel" class="carousel slide" data-bs-ride="carousel">
        <ol class="carousel-indicators">
            <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="0" class="active"></li>
            <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="1"></li>
            <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <div class="container">
                  <div class="row p-5">
                    <!-- Collage interactivo reemplazando la imagen -->
                    <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                      <div class="collage-container">
                        <div class="col-4 collage-item" (click)="goToProduct('015')">
                          <img src="assets/img/diseños con marca de agua/cruces/dobles/015.jpg" alt="Diseño 1" class="img-fluid">
                        </div>
                        <div class="col-4 collage-item" (click)="goToProduct('201')">
                          <img src="assets/img/diseños con marca de agua/santos/virgenes/201.jpg" alt="Diseño 2" class="img-fluid">
                        </div>
                        <div class="col-4 collage-item" (click)="goToProduct('601')">
                          <img src="assets/img/diseños con marca de agua/escudos/601.jpg" alt="Diseño 3" class="img-fluid">
                        </div>
                      </div>
                    </div>
              
                    <!-- Contenido de texto y el botón -->
                    <div class="col-lg-6 mb-0 d-flex align-items-center">
                      <div class="text-align-right align-self-center">
                        <h1 class="h1 letra"><b>Un Universo de Diseños</b></h1>
                        <h3 class="h2">Descubre nuestra galería de diseños que transformarán tus trabajos</h3>
                        <p>Explora una colección única de diseños pensados para cada estilo y necesidad. Cada pieza es una obra de arte lista para cobrar vida.<br>
                        <br>
                          <button class="custom-button" (click)="goToShop()">¡Visita nuestra tienda!</button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              
            <div class="carousel-item">
                <div class="container">
                    <div class="row p-5">
                        <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img class="img-fluid align-right" src="./assets/img/discobolo.png" alt="">
                        </div>
                        <div class="col-lg-6 mb-0 d-flex align-items-center">
                            <div class="text-align-right align-self-center">
                                <h1 class="h1 letra"><b>Donde la Tradición se Encuentra con la Innovación</b></h1>
                                <h3 class="h2">Casi 100 años creando diseños únicos para marmolistas</h3>
                                <p>
                                    Cada diseño que ofrecemos refleja nuestra pasión por el oficio, combinando técnicas tradicionales con las últimas herramientas digitales para asegurar calidad y estilo.<br>
                                    Conoce más <a class="letra" routerLink="/about">Sobre Nosotros</a> 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="container">
                    <div class="row p-5">
                        <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                            <img class="img-fluid align-center" src="./assets/img/picapiedra.png" alt="">
                        </div>
                        <div class="col-lg-6 mb-0 d-flex align-items-center">
                            <div class="text-align-right align-self-center">
                                <h1 class="h1 letra"><b>¿Cómo Funciona?</b></h1>
                                <h3 class="h2">Diseños a Tu Alcance en 3 simples pasos</h3>
                                <div>
                                    <ol>1. Elige tus diseños favoritos</ol>
                                    <ol>2. Efectúa el pago</ol>
                                    <ol>3. Disfruta de la descarga inmediata</ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a class="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="prev">
            <i class="fas fa-chevron-left"></i>
        </a>
        <a class="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="next">
            <i class="fas fa-chevron-right"></i>
        </a>
    </div>
    <!-- End Banner Hero -->

    <!-- Start Categorias -->
    <section class="container py-5">
        <div class="row text-center pt-3">
            <div class="col-lg-6 m-auto">
                <h1 class="h1">Algunas de nuestras categorías</h1>
                <p>
                    ¡Puedes ver el resto de categorías y diseños en nuestra <a routerLink="/shop" class="link">tienda</a>!
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-4 p-5 mt-3">
                <a (click)="goToCategoryPage('cruces')">
                  <img src="./assets/img/diseños con marca de agua/cruces/dobles/037.jpg" class="rounded-circle img-fluid border img-hover">
                </a>
                <h5 class="text-center mt-3 mb-3">Cruces</h5>
                <p class="text-center">
                  <a class="btn btn-success" (click)="goToCategoryPage('cruces')">Comprar</a>
                </p>
            </div>
            <div class="col-12 col-md-4 p-5 mt-3">
                <a (click)="goToCategoryPage('vehiculos')">
                  <img src="./assets/img/diseños con marca de agua/vehiculos/716.jpg" class="rounded-circle img-fluid border img-hover">
                </a>
                <h2 class="h5 text-center mt-3 mb-3">Vehículos</h2>
                <p class="text-center">
                  <a class="btn btn-success" (click)="goToCategoryPage('vehiculos')">Comprar</a>
                </p>
            </div>
            <div class="col-12 col-md-4 p-5 mt-3">
                <a (click)="goToSubcategoryPage('figuras', 'Profesiones')">
                  <img src="./assets/img/diseños con marca de agua/figuras/Profesiones/323.jpg" class="rounded-circle img-fluid border img-hover">
                </a>
                <h2 class="h5 text-center mt-3 mb-3">Profesiones</h2>
                <p class="text-center">
                  <a class="btn btn-success" (click)="goToSubcategoryPage('figuras', 'Profesiones')">Comprar</a>
                </p>
            </div>
        </div>
    </section>
    <!-- End Categories of The Month -->

    <!-- Start Featured Product -->
    <section class="bg-light">
        <div class="container py-5">
            <div class="row text-center py-3">
                <div class="col-lg-6 m-auto">
                    <h1 class="h1">Diseños más vendidos</h1>
                    <p>
                        ¡Estos son nuestros diseños más vendidos en el último mes!
                    </p>
                </div>
            </div>
            <div class="row" id="featuredProductsContainer">
                <div class="col-12 col-md-4 mb-4" *ngFor="let product of featuredProducts">
                    <div class="card h-100">
                        <a (click)="goToProduct(product.id.toString())">
                            <img [src]="getProductImagePath(product)" class="card-img-top border img-hover" [alt]="product.name">
                        </a>
                        <div class="card-body">
                            <p class="text-center">{{product.price}}€</p>
                            <p class="h2 text-center">{{product.name}}</p>
                            <p></p>
                            <p class="text-center">
                              <a class="btn btn-success" (click)="goToProduct(product.id.toString())">Comprar</a>
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Mensaje de carga o error -->
                <div *ngIf="featuredProducts.length === 0" class="col-12 text-center">
                    <p>{{ loadingMessage || 'No hay productos disponibles en esta categoría.' }}</p>
                </div>
            </div>
        </div>
    </section>
    <!-- End Featured Product -->
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  loadingMessage = 'Cargando productos más vendidos...';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private imageService: ImageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    this.productService.getMostSold().subscribe({
      next: (products: Product[]) => {
        this.featuredProducts = products;
        this.loadingMessage = '';
      },
      error: (error: any) => {
        console.error('Error al cargar productos más vendidos:', error);
        this.loadingMessage = 'Hubo un error al cargar los productos más vendidos.';
      }
    });
  }

  goToProduct(productId: string): void {
    window.location.href = `/product/${productId}`;
  }

  goToShop(): void {
    window.location.href = '/shop';
  }

  goToCategoryPage(category: string): void {
    window.location.href = `/shop?category=${category}`;
  }

  goToSubcategoryPage(category: string, subcategory: string): void {
    window.location.href = `/shop?category=${category}&subcategory=${subcategory}`;
  }

  getProductImagePath(product: Product): string {
    return this.imageService.getProductImagePath({
      category: product.category,
      subcategory: product.subcategory,
      image: product.image
    });
  }
} 