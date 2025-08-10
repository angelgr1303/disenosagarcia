export interface CartItem {
  id: number;
  idProducto: number;
  idProductoFormateado: string;
  nombre: string;
  precio: number;
  foto: string;
  categoria: string;
  subcategoria: string;
  fechaAgregado: string;
}

export interface CartResponse {
  status: string;
  carrito: CartItem[];
}

export interface ToggleCartResponse {
  status: string;
  message: string;
  idProducto: number;
} 