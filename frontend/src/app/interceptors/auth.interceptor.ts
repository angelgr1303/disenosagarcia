import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const token = authService.getToken();
  console.log('AuthInterceptor - Request URL:', request.url);
  console.log('AuthInterceptor - Token exists:', !!token);
  console.log('AuthInterceptor - Token value:', token);
  console.log('AuthInterceptor - AuthService.isAuthenticated():', authService.isAuthenticated());
  
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('AuthInterceptor - Added Authorization header');
    console.log('AuthInterceptor - Final request headers:', request.headers);
  } else {
    console.log('AuthInterceptor - No token found, request will be sent without auth');
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('AuthInterceptor - Error:', error.status, error.url);
      console.log('AuthInterceptor - Error response:', error);
      if (error.status === 401) {
        console.log('AuthInterceptor - 401 error, logging out user');
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
}; 