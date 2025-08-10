import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

interface ProductosResponseDTO {
  status: string;
  productos?: any[];
  producto?: any;
}

interface CategoriasResponseDTO {
  status: string;
  categorias?: { nombre: string; subcategoria: string | null }[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  private mapDtoToProduct(dto: any): Product {
    return {
      id: dto.idProducto ?? dto.id ?? 0,
      name: dto.nombre ?? '',
      price: dto.precio ?? 0,
      image: dto.foto ?? '',
      corelFile: dto.ficheroCorel ?? '',
      category: dto.categoria ?? '',
      subcategory: dto.subcategoria ?? '',
      soldQuantity: dto.cantidadVendidos ?? 0,
      description: dto.descripcion ?? ''
    };
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<ProductosResponseDTO>(`${this.apiUrl}/productos`).pipe(
      map(response => {
        if (response.status === 'success' && response.productos) {
          return response.productos.map(dto => this.mapDtoToProduct(dto));
        }
        return [];
      })
    );
  }

  getProductById(id: number): Observable<Product | null> {
    return this.http.get<ProductosResponseDTO>(`${this.apiUrl}/productos/${id}`).pipe(
      map(response => {
        if (response.status === 'success' && response.producto) {
          return this.mapDtoToProduct(response.producto);
        }
        return null;
      })
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<ProductosResponseDTO>(`${this.apiUrl}/buscar`, { params }).pipe(
      map(response => {
        if (response.status === 'success' && response.productos) {
          return response.productos.map(dto => this.mapDtoToProduct(dto));
        }
        return [];
      })
    );
  }

  getMostSold(): Observable<Product[]> {
    return this.http.get<ProductosResponseDTO>(`${this.apiUrl}/productos/mas-vendidos`).pipe(
      map(response => {
        if (response.status === 'success' && response.productos) {
          return response.productos.map(dto => this.mapDtoToProduct(dto));
        }
        return [];
      })
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const params = new HttpParams().set('categoria', category);
    return this.http.get<ProductosResponseDTO>(`${this.apiUrl}/productos`, { params }).pipe(
      map(response => {
        if (response.status === 'success' && response.productos) {
          return response.productos.map(dto => this.mapDtoToProduct(dto));
        }
        return [];
      })
    );
  }

  getProductsBySubcategory(category: string, subcategory: string): Observable<Product[]> {
    const params = new HttpParams()
      .set('categoria', category)
      .set('subcategoria', subcategory);
    return this.http.get<ProductosResponseDTO>(`${this.apiUrl}/productos`, { params }).pipe(
      map(response => {
        if (response.status === 'success' && response.productos) {
          return response.productos.map(dto => this.mapDtoToProduct(dto));
        }
        return [];
      })
    );
  }

  getCategories(): Observable<{ nombre: string; subcategoria: string | null }[]> {
    return this.http.get<CategoriasResponseDTO>(`${this.apiUrl}/categorias`).pipe(
      map(response => {
        if (response.status === 'success' && response.categorias) {
          return response.categorias;
        }
        return [];
      })
    );
  }

  getSubcategoriesByCategory(category: string): Observable<{ nombre: string; subcategoria: string | null }[]> {
    return this.getCategories().pipe(
      map(categories => categories.filter(cat => cat.nombre === category))
    );
  }

  // Métodos para verificar estado de favoritos y carrito
  checkFavoriteStatus(productId: number): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/favoritos`).pipe(
      map(response => {
        if (response.status === 'success' && response.favoritos) {
          return response.favoritos.some((fav: any) => fav.idProducto === productId);
        }
        return false;
      })
    );
  }

  checkCartStatus(productId: number): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/carrito`).pipe(
      map(response => {
        if (response.status === 'success' && response.carrito) {
          return response.carrito.some((item: any) => item.idProducto === productId);
        }
        return false;
      })
    );
  }
} 