export interface Purchase {
  id: number;
  idProducto: number;
  idProductoFormateado: string;
  nombre: string;
  precioCompra: number;
  foto: string;
  ficheroCorel: string;
  categoria: string;
  subcategoria: string;
  fechaCompra: string;
}

export interface PurchaseResponse {
  status: string;
  compras: Purchase[];
}

export interface PurchaseVerificationResponse {
  status: string;
  hasComprado: boolean;
} 