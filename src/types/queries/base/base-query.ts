export interface BaseQuery {
    createdBy?: string;
    lastUpdatedBy?: string;
    isDeleted?: boolean;
    fromDate?: string;
    toDate?: string;
}

export interface PaginationParameters {
    pageNumber?: number;
    pageSize?: number;
    isPagingEnabled: boolean;
}

export interface SortingParameters {
    sortField: string;
    sortDirection: SortDirection;
}

export enum SortDirection {
    Ascending,
    Descending
}

export interface GetQueryableQuery extends BaseQuery {
    pagination: PaginationParameters;
    sorting?: SortingParameters;
    includeProperties?: string[];
}

export interface GetByIdQuery extends BaseQuery {
    id: string;
    includeProperties?: string[];
}

export interface GetAllQuery extends GetQueryableQuery {}
