import { BaseEntity } from "./base/base";
import { ServiceBooking } from "@/types/entities/service-booking";
import { MediaBase } from "./media-base";

export interface Service extends BaseEntity {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  isFeatured: boolean;
  homeSortOrder?: number;
  sortOrder: number;
  backgroundCoverId?: string;
  thumbnailId?: string;
  termsAndConditions?: string;
  thumbnail?: MediaBase;
  backgroundCover?: MediaBase;
  bookings: ServiceBooking[];
}
