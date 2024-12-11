import { Booking } from "@/types/booking";
import { BaseService } from "./base-service";
import { Const } from "@/lib/const";
import { BusinessResult } from "@/types/response/business-result";
import axiosInstance from "@/lib/axios-instance";

class BookingService extends BaseService<Booking> {
  constructor() {
    super(`${Const.BOOKING}`);
  }

  public cancel = (id: string): Promise<BusinessResult<null>> => {
    return axiosInstance
      .put<BusinessResult<null>>(`${this.endpoint}/cancel`, { id: id })
      .then((response) => response.data)
      .catch((error) => this.handleError(error)); // Xử lý lỗi
  };
}

export const bookingService = new BookingService();
