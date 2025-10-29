export interface BaseQuery {
  createdBy?: string | null;
  lastUpdatedBy?: string | null;
  isDeleted?: boolean | null;
  fromDate?: string | null;
  toDate?: string | null;
}

export interface PaginationParameters {
  pageNumber?: number | null;
  pageSize?: number | null;
  isPagingEnabled: boolean;
}

export interface SortingParameters {
  sortField: string;
  sortDirection: SortDirection;
}

export enum SortDirection {
  Ascending = 1,
  Descending = -1,
}

export interface GetQueryableQuery extends BaseQuery {
  pagination: PaginationParameters;
  sorting?: SortingParameters | null;
  includeProperties?: string[] | null;
}

export interface GetByIdQuery extends BaseQuery {
  id: string;
  includeProperties?: string[] | null;
}

export interface GetAllQuery extends GetQueryableQuery {}
