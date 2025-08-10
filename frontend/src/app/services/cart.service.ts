import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

interface CarritoItemDTO {
  id: number;
  idProducto: number;
  idProductoFormateado?: string;
  nombre: string;
  precio: number;
  foto: string;
  categoria?: string;
  subcategoria?: string;
}

interface CarritoResponseDTO {
  status: string;
  carrito?: CarritoItemDTO[];
  count?: number;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = environment.apiUrl;
  private cartCountSubject = new BehaviorSubject<number>(0);
  public cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {
    // No cargar automáticamente el contador del carrito
    // Se cargará cuando el usuario se autentique
  }

  private mapDtoToCartItem(dto: CarritoItemDTO): CartItem {
    const product: Product = {
      id: dto.idProducto,
      name: dto.nombre,
      price: dto.precio,
      image: dto.foto,
      corelFile: '',
      category: dto.categoria || '',
      subcategory: dto.subcategoria || '',
      soldQuantity: 0
    };
    return { id: dto.id, product, quantity: 1 };
  }

  getCart(): Observable<CarritoResponseDTO> {
    return this.http.get<CarritoResponseDTO>(`${this.apiUrl}/carrito`);
  }

  addToCart(productId: number): Observable<CarritoResponseDTO> {
    return this.http.post<CarritoResponseDTO>(`${this.apiUrl}/carrito/toggle`, { id_producto: productId })
      .pipe(map(res => { if (res.status === 'success') this.loadCartCount(); return res; }));
  }

  removeFromCart(productId: number): Observable<CarritoResponseDTO> {
    return this.http.post<CarritoResponseDTO>(`${this.apiUrl}/carrito/toggle`, { id_producto: productId })
      .pipe(map(res => { if (res.status === 'success') this.loadCartCount(); return res; }));
  }

  getCartCount(): number { return this.cartCountSubject.value; }

  loadCartCount(): void {
    this.http.get<CarritoResponseDTO>(`${this.apiUrl}/carrito/count`).subscribe({
      next: (res) => { if (res.status === 'success' && res.count !== undefined) this.cartCountSubject.next(res.count); },
      error: () => this.cartCountSubject.next(0)
    });
  }
} 