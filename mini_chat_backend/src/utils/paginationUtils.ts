import { IPaginatedResult } from '@/types/dtosInterfaces/paginationDtos';
import { PAGINATION_CONSTANTS } from '@/constants/messages';

interface PaginateOptions<T> {
  items: T[];
  page?: number;
  limit?: number;
}

export function paginate<T>({ 
  items, 
  page = PAGINATION_CONSTANTS.DEFAULT_PAGE, 
  limit = PAGINATION_CONSTANTS.DEFAULT_LIMIT 
}: PaginateOptions<T>): IPaginatedResult<T> {
  const validPage = Math.max(PAGINATION_CONSTANTS.MIN_VALUE, page);
  const validLimit = Math.max(PAGINATION_CONSTANTS.MIN_VALUE, limit);

  const total = items.length;
  const totalPages = Math.ceil(total / validLimit);
  const startIndex = (validPage - 1) * validLimit;
  const endIndex = Math.min(startIndex + validLimit, total);

  return {
    data: items.slice(startIndex, endIndex),    pagination: {
      total,
      currentPage: validPage,
      totalPages,
      limit: validLimit,
      hasNextPage: validPage < totalPages,
      hasPrevPage: validPage > PAGINATION_CONSTANTS.MIN_VALUE,
    },
  };
}
