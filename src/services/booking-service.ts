import { Booking } from "@/types/booking";
import {BaseService} from "./base-service";
import {Const} from "@/lib/const";

class BookingService extends BaseService<Booking> {
    constructor() {
        super(`${Const.BOOKING}`);
    }
}

export const bookingService = new BookingService();
