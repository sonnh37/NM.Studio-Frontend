import { GetQueryableQuery, SortDirection } from "@/types/cqrs/queries/base/base-query";
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
      if (
        Array.isArray(value) &&
        value.every((v) => typeof v === "boolean")
      ) {
        filterParams[key] = value;
      } else if (typeof value === "object" && value !== null) {
        filterParams[key] = JSON.stringify(value);
      } else {
        filterParams[key] = value;
      }
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
