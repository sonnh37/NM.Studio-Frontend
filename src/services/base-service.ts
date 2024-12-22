import axiosInstance from "@/lib/axios-instance";
import { cleanQueryParams } from "@/lib/clean-query-param";
import { CreateCommand, UpdateCommand } from "@/types/commands/base-command";
import { BaseQueryableQuery } from "@/types/queries/base-query";
import { BusinessResult } from "@/types/response/business-result";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../firebase";
export class BaseService<T> {
  public endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async uploadImage(
    file: File | null,
    folder: string = "Other"
  ): Promise<string | null> {
    if (file == null) return null;

    return new Promise<string>((resolve, reject) => {
      const storageRef = ref(storage, `${folder}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  }

  async deleteImage(link: string): Promise<boolean> {
    if (!link) return false;
  
    try {
      const fileRef = ref(storage, link);
      await deleteObject(fileRef);
      return true;
    } catch (error: any) {
      console.warn("Failed to delete file. Proceeding anyway:", error); // Chỉ cảnh báo lỗi, không throw
      return false; // Vẫn trả về false để báo hiệu việc xóa không thành công
    }
  }
  // Lấy tất cả các mục với query params
  public fetchAll = (
    query?: BaseQueryableQuery
  ): Promise<BusinessResult<PagedResponse<T>>> => {
    if (query == null) {
      query = {
        isPagination: false,
      };
    }
    console.log("check_query", query);
    const cleanedQuery = cleanQueryParams(query!);
    console.log("check_url", `${this.endpoint}?${cleanedQuery}`);
    return axiosInstance
      .get<BusinessResult<PagedResponse<T>>>(`${this.endpoint}?${cleanedQuery}`)
      .then((response) => {
        console.log("check_result", response.data);
        return response.data; // Đảm bảo rằng nó trả về dữ liệu
      })
      .catch((error) => {
        return this.handleError(error); // Xử lý lỗi
      });
  };

  public fetchById = (id: string): Promise<BusinessResult<T>> => {
    return axiosInstance
      .get<BusinessResult<T>>(`${this.endpoint}/${id}`)
      .then((response) => response.data)
      .catch((error) => this.handleError(error)); // Xử lý lỗi
  };

  public create = (command: CreateCommand): Promise<BusinessResult<T>> => {
    return axiosInstance
      .post<BusinessResult<T>>(this.endpoint, command)
      .then((response) => response.data)
      .catch((error) => this.handleError(error)); // Xử lý lỗi
  };

  public update = (command: UpdateCommand): Promise<BusinessResult<T>> => {
    return axiosInstance
      .put<BusinessResult<T>>(this.endpoint, command)
      .then((response) => response.data)
      .catch((error) => this.handleError(error)); // Xử lý lỗi
  };

  public restore = (command: UpdateCommand): Promise<BusinessResult<T>> => {
    return axiosInstance
      .put<BusinessResult<T>>(`${this.endpoint}/restore`, command)
      .then((response) => response.data)
      .catch((error) => this.handleError(error));
  };

  public delete = (id: string): Promise<BusinessResult<null>> => {
    return axiosInstance
      .delete<BusinessResult<null>>(`${this.endpoint}?id=${id}`)
      .then((response) => response.data)
      .catch((error) => this.handleError(error)); // Xử lý lỗi
  };

  public deletePermanent = (id: string): Promise<BusinessResult<null>> => {
    return axiosInstance
      .delete<BusinessResult<null>>(
        `${this.endpoint}?id=${id}&isPermanent=true`
      )
      .then((response) => response.data)
      .catch((error) => this.handleError(error)); // Xử lý lỗi
  };

  protected handleError(error: any) {
    console.error(`${this.endpoint} API Error:`, error);
    return Promise.reject(error);
  }
}
