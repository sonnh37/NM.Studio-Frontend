import axiosInstance from "@/lib/interceptors/axios-instance";
import { cleanQueryParams } from "@/lib/utils";
import { MediaBase } from "@/types/entities/media-base";
import { BusinessResult } from "@/types/models/business-result";
import { UploadResult } from "@/types/models/upload-result";

class MediaUploadService {
  public endpoint: string;

  constructor() {
    this.endpoint = `mediauploads`;
  }

  async uploadFile(
    file?: File | null,
    folder: string = "Other"
  ): Promise<BusinessResult<MediaBase>> {
    const formData = new FormData();
    if (file) {
      formData.append("File", file);
    }
    formData.append("FolderName", folder);

    const res = await axiosInstance.post<BusinessResult<MediaBase>>(
      this.endpoint,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  }

  async updateFile(
    file?: File | null,
    folder: string = "Other",
    mediaId?: string
  ): Promise<BusinessResult<MediaBase>> {
    const formData = new FormData();
    if (file) {
      formData.append("File", file);
    }
    formData.append("FolderName", folder);
    formData.append("MediaId", mediaId || "");

    const res = await axiosInstance.put<BusinessResult<MediaBase>>(
      this.endpoint,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data ?? null;
  }

  async deleteFile(link: string): Promise<BusinessResult<void>> {
    const cleanedQuery = cleanQueryParams({ link });
    const res = await axiosInstance.delete<BusinessResult<void>>(
      `${this.endpoint}?${cleanedQuery}`
    );
    return res.data;
  }
}

export const mediaUploadService = new MediaUploadService();
