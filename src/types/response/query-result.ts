export enum SortDirection {
    Ascending = 'Ascending',
    Descending = 'Descending'
}

export interface QueryResult<T> {
    results?: T[];
    includeProperties?: string[];
    totalPages?: number;
    totalCount?: number;
    pageNumber?: number;
    pageSize?: number;
    isPagination: boolean;
    sortField?: string;
    sortDirection?: SortDirection;
}