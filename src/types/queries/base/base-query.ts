export interface BaseQuery {
    createdBy?: string | null | undefined;
    lastUpdatedBy?: string | null | undefined;
    isDeleted?: boolean | null | undefined;
    fromDate?: string | null | undefined;
    toDate?: string | null | undefined;
}

export interface PaginationParameters {
    pageNumber?: number | null | undefined;
    pageSize?: number | null | undefined;
    isPagingEnabled: boolean;
}

export interface SortingParameters {
    sortField: string;
    sortDirection: SortDirection;
}

export enum SortDirection {
    Ascending = 1,
    Descending = -1
}

export interface GetQueryableQuery extends BaseQuery {
    pagination: PaginationParameters;
    sorting?: SortingParameters | null | undefined;
    includeProperties?: string[] | null | undefined;
}

export interface GetByIdQuery extends BaseQuery {
    id: string;
    includeProperties?: string[] | null | undefined;
}

export interface GetAllQuery extends GetQueryableQuery {}
