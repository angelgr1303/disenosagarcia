export interface Favorite {
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

export interface FavoriteResponse {
  status: string;
  favoritos: Favorite[];
}

export interface ToggleFavoriteResponse {
  status: string;
  message: string;
  idProducto: number;
} 