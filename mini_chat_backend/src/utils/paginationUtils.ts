export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
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

export function paginate<T>(items: T[], page: number = 1, limit: number = 10): PaginatedResult<T> {
  // Ensure valid parameters
  const validPage = Math.max(1, page);
  const validLimit = Math.max(1, limit);
  
  const total = items.length;
  const totalPages = Math.ceil(total / validLimit);
  const startIndex = (validPage - 1) * validLimit;
  const endIndex = Math.min(startIndex + validLimit, total);
  
  return {
    data: items.slice(startIndex, endIndex),
    pagination: {
      total,
      currentPage: validPage,
      totalPages,
      limit: validLimit,
      hasNextPage: validPage < totalPages,
      hasPrevPage: validPage > 1
    }
  };
}
