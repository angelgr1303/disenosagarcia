import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

interface FavoritoDTO {
  id: number;
  idProducto: number;
  idProductoFormateado?: string;
  nombre: string;
  precio: number;
  foto: string;
  categoria?: string;
  subcategoria?: string;
}

interface FavoritosResponseDTO {
  status: string;
  favoritos?: FavoritoDTO[];
  count?: number;
}

interface ToggleFavoritoResponseDTO {
  status: 'added' | 'removed' | 'error';
  message?: string;
  id_producto?: number;
}

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getFavorites(order?: string): Observable<FavoritosResponseDTO> {
    const params = order ? new HttpParams().set('orden', order) : undefined;
    return this.http.get<FavoritosResponseDTO>(`${this.apiUrl}/favoritos`, { params });
  }

  toggleFavorite(productId: number): Observable<ToggleFavoritoResponseDTO> {
    return this.http.post<ToggleFavoritoResponseDTO>(`${this.apiUrl}/favoritos/toggle`, { id_producto: productId });
  }

  getFavoritesCount(): Observable<{ status: string; count: number }> {
    return this.http.get<{ status: string; count: number }>(`${this.apiUrl}/favoritos/count`);
  }

  loadFavoritesCount(): void {
    this.getFavoritesCount().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          // Aquí podrías emitir un evento o actualizar un BehaviorSubject si es necesario
          console.log('Favorites count updated:', response.count);
        }
      },
      error: (error) => {
        console.error('Error loading favorites count:', error);
      }
    });
  }
} 