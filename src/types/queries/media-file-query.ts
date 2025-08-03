import {GetQueryableQuery} from "@/types/queries/base/base-query";

export interface MediaFileGetAllQuery extends GetQueryableQuery {
    isFeatured: boolean;
}
