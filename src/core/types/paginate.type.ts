export interface Paginate<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
