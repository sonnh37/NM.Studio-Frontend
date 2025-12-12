import {
  GetQueryableQuery,
  SortDirection,
} from "@/types/cqrs/queries/base/base-query";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

// hooks/useQueryParams.ts
export function useQueryParams(
  formValues: any,
  columnFilters: ColumnFiltersState,
  pagination: PaginationState,
  sorting: SortingState
): GetQueryableQuery {
  const filterParams: Record<string, any> = {};
  columnFilters.forEach((filter) => {
    filterParams[filter.id] = filter.value;
  });

  Object.entries(formValues).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      filterParams[key] = value;
    }
  });
  return {
    pagination: {
      pageNumber: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      isPagingEnabled: true,
    },
    sorting: {
      sortField: sorting[0]?.id || "CreatedDate",
      sortDirection: sorting[0]?.desc
        ? SortDirection.Descending
        : SortDirection.Ascending,
    },
    fromDate: formValues?.date?.from?.toISOString(),
    toDate: formValues?.date?.to?.toISOString(),
    ...filterParams,
  };
}
