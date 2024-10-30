import axiosInstance from "@/lib/axios-instance";
import { BaseQueryableQuery } from "@/types/queries/base-query";
import { BusinessResult } from "@/types/response/business-result";

export class BaseService<T> {
    constructor(private readonly baseUrl: string) {}

    // Lấy tất cả các mục với query params
    getAll(query: BaseQueryableQuery): Promise<BusinessResult<PagedResponse<T>>> {
        const params = new URLSearchParams(query as any).toString();
        return axiosInstance.get(`${this.baseUrl}?${params}`)
            .then(response => response.data as BusinessResult<PagedResponse<T>>)
            .catch(error => {
                console.error(`Failed to fetch ${this.baseUrl}:`, error);
                throw error;
            });
    }
    // Lấy một mục theo ID
    getById(id: string): Promise<BusinessResult<T>> {
        return axiosInstance.get(`${this.baseUrl}/${id}`)
            .then(response => response.data as BusinessResult<T>)
            .catch(error => {
                console.error(`Failed to fetch ${this.baseUrl} with id ${id}:`, error);
                throw error;
            });
    }

    // Tạo mới một mục
    create(data: T): Promise<BusinessResult<T>> {
        return axiosInstance.post(`${this.baseUrl}`, data)
            .then(response => response.data as BusinessResult<T>)
            .catch(error => {
                console.error(`Failed to create new item in ${this.baseUrl}:`, error);
                throw error;
            });
    }

    // Cập nhật một mục theo ID
    update(data: T): Promise<BusinessResult<T>> {
        return axiosInstance.put(`${this.baseUrl}`, data)
            .then(response => response.data as BusinessResult<T>)
            .catch(error => {
                console.error(`Failed to update item with id in ${this.baseUrl}:`, error);
                throw error;
            });
    }

    // Xóa một mục theo ID
    delete(id: string): Promise<BusinessResult<null>> {
        return axiosInstance.delete<BusinessResult<null>>(`${this.baseUrl}/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Failed to delete item with id ${id} in ${this.baseUrl}:`, error);
                throw error;
            });
    }
}
