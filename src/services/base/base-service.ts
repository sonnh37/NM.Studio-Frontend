import axiosInstance from "@/lib/interceptors/axios-instance";
import { cleanQueryParams } from "@/lib/utils";
import {
  CreateCommand,
  DeleteCommand,
  UpdateCommand
} from "@/types/cqrs/commands/base/base-command";
import { GetQueryableQuery } from "@/types/cqrs/queries/base/base-query";
import { BusinessResult } from "@/types/models/business-result";
import { QueryResult } from "@/types/models/query-result";

export class BaseService<TEntity> {
  public endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(
    query?: GetQueryableQuery
  ): Promise<BusinessResult<QueryResult<TEntity>>> {
    const cleanedQuery = cleanQueryParams(query);
    const res = await axiosInstance.get<BusinessResult<QueryResult<TEntity>>>(
      `${this.endpoint}?${cleanedQuery}`
    );
    return res.data;
  }

  async getById(
    id: string,
    includeProperties?: string[]
  ): Promise<BusinessResult<TEntity>> {
    const cleanedQuery = cleanQueryParams({ id, includeProperties });

    const res = await axiosInstance.get<BusinessResult<TEntity>>(
      `${this.endpoint}/id?${cleanedQuery}`
    );
    return res.data;
  }

  async create(command: CreateCommand): Promise<BusinessResult<TEntity>> {
    const res = await axiosInstance.post<BusinessResult<TEntity>>(
      this.endpoint,
      command
    );
    return res.data;
  }

  async update(command: UpdateCommand): Promise<BusinessResult<TEntity>> {
    const res = await axiosInstance.put<BusinessResult<TEntity>>(
      this.endpoint,
      command
    );
    return res.data;
  }

  async delete(command: DeleteCommand): Promise<BusinessResult<null>> {
    const cleanedQuery = cleanQueryParams(command);
    const res = await axiosInstance.delete<BusinessResult<null>>(
      `${this.endpoint}?${cleanedQuery}`
    );
    return res.data;
  }
}
