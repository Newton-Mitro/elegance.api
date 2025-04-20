export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  vatRate?: number; // optional, defaults to 0
}

export interface UpdateProductDto {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
  vatRate?: number;
}

export interface ProductDto {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: string;
  vatRate: number;
  createdAt: Date;
  updatedAt: Date;
}
