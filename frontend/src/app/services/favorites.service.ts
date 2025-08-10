import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

export interface FavoriteItem {
  id: number;
  product: Product;
}

export interface FavoritesResponse {
  status: string;
  message?: string;
  favorites?: FavoriteItem[];
  count?: number;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = 'http://localhost:8080/api';
  private favoritesCountSubject = new BehaviorSubject<number>(0);
  public favoritesCount$ = this.favoritesCountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadFavoritesCount();
  }

  getFavorites(): Observable<FavoriteItem[]> {
    return this.http.get<FavoritesResponse>(`${this.apiUrl}/favorites`)
      .pipe(
        map(response => {
          if (response.status === 'success' && response.favorites) {
            return response.favorites;
          }
          return [];
        })
      );
  }

  addToFavorites(productId: number): Observable<FavoritesResponse> {
    return this.http.post<FavoritesResponse>(`${this.apiUrl}/favorites/add`, { productId })
      .pipe(
        map(response => {
          if (response.status === 'success') {
            this.loadFavoritesCount();
          }
          return response;
        })
      );
  }

  removeFromFavorites(productId: number): Observable<FavoritesResponse> {
    return this.http.delete<FavoritesResponse>(`${this.apiUrl}/favorites/remove/${productId}`)
      .pipe(
        map(response => {
          if (response.status === 'success') {
            this.loadFavoritesCount();
          }
          return response;
        })
      );
  }

  clearFavorites(): Observable<FavoritesResponse> {
    return this.http.delete<FavoritesResponse>(`${this.apiUrl}/favorites/clear`)
      .pipe(
        map(response => {
          if (response.status === 'success') {
            this.favoritesCountSubject.next(0);
          }
          return response;
        })
      );
  }

  getFavoritesCount(): number {
    return this.favoritesCountSubject.value;
  }

  private loadFavoritesCount(): void {
    this.http.get<FavoritesResponse>(`${this.apiUrl}/favorites/count`)
      .subscribe({
        next: (response) => {
          if (response.status === 'success' && response.count !== undefined) {
            this.favoritesCountSubject.next(response.count);
          }
        },
        error: () => {
          this.favoritesCountSubject.next(0);
        }
      });
  }
} 