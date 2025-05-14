export interface IPaginationParams {
  page: number;
  limit: number;
}

export interface IPaginatedResult<T> {
  data: T[];
  pagination: {
    total: number;
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
