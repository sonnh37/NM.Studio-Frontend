export interface BaseQueryableQuery {
    isPagination: boolean;
    pageNumber?: number | null | undefined;
    pageSize?: number | null | undefined;
    sortField?: string | null | undefined;
    sortOrder?: SortOrder | null | undefined;
    fromDate?: string | null | undefined;
    toDate?: string | null | undefined;
    id?: string | null | undefined;
    createdBy?: string | null | undefined;
    lastUpdatedBy?: string | null | undefined;
    isDeleted?: boolean | null | undefined;
}

export enum SortOrder {
    ascending = 1,
    descending = -1
}