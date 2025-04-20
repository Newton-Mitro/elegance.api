export interface CreateProductCategoryDto {
  name: string;
}

export interface UpdateProductCategoryDto {
  name?: string;
}

export interface ProductCategoryResponseDto {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
