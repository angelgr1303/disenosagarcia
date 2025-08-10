export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  corelFile: string;
  category: string;
  subcategory: string;
  soldQuantity?: number;
  description?: string;
}

export interface Category {
  id: number;
  name: string;
  subcategory: string;
}

export interface ProductResponse {
  status: string;
  products: Product[];
}

export interface CategoryResponse {
  status: string;
  categories: Category[];
} 