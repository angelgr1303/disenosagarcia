import { Injectable } from '@angular/core';

export interface ImageProduct {
  category: string;
  subcategory?: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  /**
   * Genera la ruta correcta para las imágenes de productos
   * Maneja correctamente los caracteres especiales como ñ
   */
  getProductImagePath(product: ImageProduct): string {
    let categoria = product.subcategory ? 
      `${product.category}/${product.subcategory}` : 
      product.category;
    
    // Usar forward slash para evitar problemas de codificación
    const basePath = 'assets/img';
    const watermarkPath = 'diseños con marca de agua';
    
    // NO codificar la URL ya que Angular se encarga automáticamente
    const fullPath = `${basePath}/${watermarkPath}/${categoria}/${product.image}`;
    console.log('Generated image path:', fullPath);
    return fullPath;
  }

  /**
   * Genera rutas alternativas si la imagen principal no carga
   */
  getAlternativeImagePath(product: ImageProduct): string {
    // Si hay problemas con la ruta original, intentar sin subcategoría
    const basePath = 'assets/img';
    const watermarkPath = 'diseños con marca de agua';
    
    return `${basePath}/${watermarkPath}/${product.category}/${product.image}`;
  }

  /**
   * Verifica si existe una imagen y devuelve una ruta válida
   */
  getValidImagePath(product: ImageProduct): string {
    const primaryPath = this.getProductImagePath(product);
    
    // En un entorno real, podrías hacer una verificación HTTP aquí
    // Por ahora, devolvemos la ruta principal
    return primaryPath;
  }

  /**
   * Ruta de imagen por defecto para productos sin imagen
   */
  getDefaultImagePath(): string {
    return 'assets/img/diseñoAlapida.jpg';
  }

  /**
   * Obtiene la ruta de logo
   */
  getLogoPath(): string {
    return 'assets/img/vertical-logo.png';
  }
} 