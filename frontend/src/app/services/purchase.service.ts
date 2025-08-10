import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Purchase, PurchaseResponse, PurchaseVerificationResponse } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPurchases(): Observable<PurchaseResponse> {
    return this.http.get<PurchaseResponse>(`${this.apiUrl}/compras`);
  }

  makePurchase(productId: number): Observable<{ status: string; compra: Purchase }> {
    return this.http.post<{ status: string; compra: Purchase }>(`${this.apiUrl}/compras/realizar`, { id_producto: productId });
  }

  verifyPurchase(productId: number): Observable<PurchaseVerificationResponse> {
    return this.http.get<PurchaseVerificationResponse>(`${this.apiUrl}/compras/verificar/${productId}`);
  }

  downloadFile(productId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/descargas/${productId}`, { responseType: 'blob' });
  }
} 