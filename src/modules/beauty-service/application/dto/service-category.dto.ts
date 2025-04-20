export interface CreateServiceCategoryDto {
  name: string;
  nameBn?: string;
}

export interface UpdateServiceCategoryDto {
  name?: string;
  nameBn?: string;
}

export interface ServiceCategoryResponseDto {
  id: string;
  name: string;
  nameBn?: string;
  createdAt: string;
  updatedAt: string;
}
