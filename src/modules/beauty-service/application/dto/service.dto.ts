export interface CreateServiceDto {
  name: string;
  nameBn?: string;
  description?: string;
  categoryId: string;
  price: number; // Send as number
  durationMin: number;
}

export interface UpdateServiceDto {
  name?: string;
  nameBn?: string;
  description?: string;
  categoryId?: string;
  price?: number;
  durationMin?: number;
}

export interface ServiceResponseDto {
  id: string;
  name: string;
  nameBn?: string;
  description?: string;
  categoryId: string;
  price: number;
  durationMin: number;
  createdAt: string;
  updatedAt: string;
}
