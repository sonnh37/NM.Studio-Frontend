import axiosInstance from "@/lib/interceptors/axios-instance";
import {cleanQueryParams} from "@/lib/utils";
import {CreateCommand, CreateOrUpdateCommand, DeleteCommand, UpdateCommand} from "@/types/commands/base/base-command";
import {BusinessResult} from "@/types/response/business-result";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable,} from "firebase/storage";
import {storage} from "../../../firebase";
import {GetQueryableQuery} from "@/types/queries/base/base-query";
import {QueryResult} from "@/types/response/query-result";


export class BaseService<
    TEntity,
> {
    public endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    async getAll(
        query?: GetQueryableQuery
    ): Promise<BusinessResult<QueryResult<TEntity>>> {
        const cleanedQuery = cleanQueryParams(query);
        const res = await axiosInstance.get<BusinessResult<QueryResult<TEntity>>>(`${this.endpoint}?${cleanedQuery}`);
        return res.data;
    };

    async getById(id: string, includeProperties?: string[]): Promise<BusinessResult<TEntity>> {
        const cleanedQuery = cleanQueryParams({id, includeProperties});

        const res = await axiosInstance.get<BusinessResult<TEntity>>(`${this.endpoint}/id?${cleanedQuery}`);
        return res.data;
    };

    async create(command: CreateCommand): Promise<BusinessResult<TEntity>> {
        const res = await axiosInstance.post<BusinessResult<TEntity>>(this.endpoint, command);
        return res.data;
    }

    async update(command: UpdateCommand): Promise<BusinessResult<TEntity>> {
        const res = await axiosInstance.put<BusinessResult<TEntity>>(this.endpoint, command);
        return res.data;
    };

    async delete(command: DeleteCommand): Promise<BusinessResult<null>> {
        const cleanedQuery = cleanQueryParams(command);

        const res = await axiosInstance.delete<BusinessResult<null>>(
            `${this.endpoint}?${cleanedQuery}`
        );
        return res.data;
    };

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
            }
        )
            ;
    }

    async deleteImage(link: string): Promise<boolean> {
        if (!link) return false;
        const fileRef = ref(storage, link);
        await deleteObject(fileRef);

        return true;
    }
}
